---
title: XGBoost vs LightGBM vs CatBoost — Which Model Should You Choose?
excerpt: How gradient boosting works, what XGBoost, LightGBM, and CatBoost each innovated — histograms, monotonic constraints, GPUs, and a decision tree to narrow the choice.
date: "2026-06-17"
locale: en
slug: xgboost-vs-lightgbm-vs-catboost
tags:
  - Machine Learning
  - AI
  - Gradient Boosting
---

If you work with structured, tabular data — patient records, click logs, sensor readings, spreadsheets with columns and rows — you have probably reached for gradient boosting at some point. For a long stretch of Kaggle history and applied machine learning practice, the question was not whether to boost, but which library to use: [XGBoost](https://xgboost.readthedocs.io/en/stable/index.html), [LightGBM](https://lightgbm.readthedocs.io/en/stable/), or [CatBoost](https://catboost.ai/).

All three implement the same broad family of algorithms. They grow ensembles of decision trees, one after another, each tree trained to fix the mistakes of everything that came before. What separates them is engineering: how they grow each tree, how they search for splits, and how they cope with the messy details of real datasets — missing values, rare categories, millions of rows, GPUs on your desk, and regulators who insist that risk scores behave sensibly.

## Decision trees as the atomic unit

A decision tree is the simplest readable model in machine learning. It asks a sequence of questions about the features — is age above 40, is region equal to "North", is glucose above 140 — and routes each example down a path until it lands in a leaf that holds a prediction. The structure is easy to visualize and, in isolation, easy to overinterpret.

![Decision tree example diagram showing root node, internal nodes, and leaf nodes](/decision_tree_example.png)

A single deep tree memorizes noise. That is why boosting never relies on one large tree. Instead it uses many **shallow** trees as **weak learners**: models that are only slightly better than guessing, but cheap to fit and easy to combine. Gradient boosting stitches hundreds or thousands of these small trees into a strong predictor. The art is not in any one tree; it is in the sequence.

## What gradient boosting is doing under the hood

The name sounds intimidating, but the logic is iterative correction. You begin with a crude prediction — the mean of the target for regression, or the log-odds of the positive class for classification. That first guess is wrong in structured ways: it overshoots for some patients, undershoots for others. Gradient boosting measures that error.

For squared error, the error is simply the residual: actual minus predicted. More generally, for any differentiable loss function, boosting looks at the **negative gradient** of the loss with respect to the current prediction. That gradient tells you which direction each training example wants the model to move. The next tree is fit to predict those pseudo-residuals. When you add that tree to the ensemble — scaled by a small **learning rate** so each step is cautious — the combined model moves in the direction that reduces loss.

![Gradient boosting algorithm flowchart](/gradient_boosting_algorithm.png)

Then you repeat. The ensemble after two trees still has error; tree three targets what trees one and two missed. After a hundred trees, the corrections have carved out a flexible surface that can capture nonlinear relationships and feature interactions without you having to specify them by hand.

Two stabilizers appear in almost every production implementation. **Shrinkage** (the learning rate) trades speed of convergence for generalization: a smaller rate means you need more trees, but each tree does less damage if it overfits locally. **Stochastic boosting** — building each tree on a random subset of rows and/or columns — injects randomness the way bagging does for random forests, and it often improves both speed and robustness.

That pipeline is the shared engine. XGBoost, LightGBM, and CatBoost differ in how they approximate split search, grow tree topology, encode categories, exploit GPUs, and enforce domain logic — not in the high-level idea of gradient descent in function space. The sections below follow each library in turn and unpack where those engineering bets landed.

## XGBoost: regularization, constraints, and the production default

When XGBoost appeared in 2016, gradient boosting already existed. What XGBoost contributed was an implementation tuned for competitions and production: fast enough to train on serious hardware, opinionated about regularization, and careful about edge cases like missing data.

The central design choice is a **regularized objective**. Instead of only minimizing prediction error, XGBoost penalizes complex leaf weights with L1 and L2 terms baked into the objective itself. Complexity is part of what the optimizer sees at every split, not only what you fix after the fact with pruning. XGBoost uses a **second-order Taylor approximation** when scoring splits — gradient plus **Hessian** — so each tree step is a sharper local move than first-order boosting alone.

**Histogram-based split finding** is where XGBoost's take on gradient quantization lives. Rather than scanning every unique value of every feature, XGBoost bins continuous columns into a fixed number of histogram buckets (`max_bin`, default 256) and searches split points on bin boundaries. For each bin it accumulates the sum of gradients and Hessians of the examples that fall inside; candidate splits are scored by combining left and right histogram totals. Split search drops from sorting-heavy work on millions of unique values to lightweight scans over a few hundred bins — better cache locality, less memory traffic, and a path to parallel and distributed training via column blocking. Too few bins smooth away fine structure; too many bins creep back toward the cost of exact search.

Missing values are handled with learned default directions per split, so you do not need a separate imputation step for tree building.

**Monotonic constraints** are an XGBoost strength when the model must make sense to humans, not just minimize loss. In medicine, credit, or insurance, stakeholders often ask whether a score can go *down* when severity goes *up*. You declare which features must be non-decreasing or non-increasing with respect to the prediction; the split-finding routine discards candidates that would violate the constraint along a branch. The composed ensemble still respects those global shape restrictions — important when models are audited or explained to clinicians. **Interaction constraints** go further: you can limit which features may split together, encoding structural domain knowledge that naive trees would ignore. Monotonicity is not free — constrained models may sacrifice a bit of fit on noisy real data — but deployability often matters more than a marginal AUC point.

**GPU training** arrived as a natural extension of the histogram engine. The `gpu_hist` tree method (and its successors in recent versions) builds histograms on device and evaluates splits in parallel across features. For many workloads it is a drop-in swap from CPU `hist` with the same API. GPU training pays off when row and feature counts are large enough to amortize host-device transfer; on tiny tables the CPU path may still win.

XGBoost became the safe default for many teams: extensive documentation, a long production track record, and a community that has already answered your obscure Stack Overflow question.

## LightGBM: leaf-wise growth, GOSS, and speed at scale

LightGBM, released by Microsoft Research in 2017, asks whether trees can be grown more efficiently while keeping accuracy — and whether gradient statistics can be computed on less data without losing much signal.

**Leaf-wise** (best-first) growth is LightGBM's signature topology bet. Instead of expanding all leaves at a depth level before going deeper, it always splits the leaf that reduces loss the most. That produces deep, asymmetric trees that often reach good accuracy with fewer nodes than level-wise growth — at the cost of overfitting risk on small datasets if depth is unchecked. Keeping `max_depth` in a sensible range (often 3–5) is how you curb leaf-wise enthusiasm.

**Gradient-based One-Side Sampling (GOSS)** is LightGBM's distinctive twist on gradient quantization. Histogram split finding still bins features (`max_bin`, default 255) and accumulates per-bin gradient statistics — the same quantization idea as XGBoost. GOSS layers on top by keeping all examples with large gradients (hard cases the model is still getting wrong) while randomly subsampling easy, low-gradient rows before histograms are built. Computation concentrates where the loss surface is steepest. **Exclusive Feature Bundling (EFB)** bundles sparse mutually exclusive features to shrink effective dimensionality. Together, these tricks routinely make LightGBM the fastest option on million-row numeric workloads.

**Monotonic constraints** are supported natively in LightGBM as well: you pass a vector of increasing, decreasing, or unconstrained features and invalid splits are pruned during search. The ergonomics differ slightly from XGBoost, but the use case is the same — models that must not invert sensible relationships for regulatory or clinical reasons.

**GPU acceleration** comes via CUDA or OpenCL backends depending on build. The same leaf-wise growth and GOSS logic run on device; the win is raw throughput when CPU training is "fast enough to be annoying" and a GPU is sitting idle. LightGBM is often my first recommendation for numerical-heavy tabular work at scale.

## CatBoost: ordered categories, symmetric trees, and GPU-native design

CatBoost from Yandex optimizes for **categorical features** without the usual encoding footguns — and builds a training stack where GPU execution is part of the core design, not a bolt-on.

**Ordered target statistics** encode categories using only prior rows in a random permutation, reducing target leakage compared to naive mean encoding applied to the full training set. **Ordered boosting** addresses prediction shift between training and inference — a subtle bias that can inflate offline metrics when target statistics leak information. These are CatBoost's answer to the question "how do I use high-cardinality columns without building a fragile preprocessing pipeline?"

**Symmetric (oblivious) trees** use the same split condition across an entire depth level. Every node at level *k* tests the same feature threshold; only the routing differs. That constraint simplifies inference, reduces the combinatorial explosion of split search, and pairs naturally with **GPU histogram kernels**: features are quantized into bins, gradient statistics are accumulated per bin on CUDA, and split evaluation runs in parallel across the symmetric structure. On categorical-heavy data, encoding and tree building stay integrated — the "set `task_type=GPU` and go home" workflow is polished. On purely numeric data, CatBoost is often slower than LightGBM; the GPU path still helps, but the library's sweet spot is messy business tables with IDs, regions, and product codes.

**Monotonic constraints** are not a first-class CatBoost feature in the way they are in XGBoost or LightGBM. If hard monotonicity is a deployment requirement — not a nice-to-have — CatBoost is usually not the first library to reach for. CatBoost trades that flexibility for categorical robustness and strong out-of-the-box defaults; tuning depth is often less painful than with leaf-wise competitors on the same messy data.

## At a glance

| | XGBoost | LightGBM | CatBoost |
| --- | --- | --- | --- |
| **Tree growth** | Level-wise | Leaf-wise (best-first) | Symmetric / oblivious |
| **Categorical features** | Native support; encoding still common | `categorical_feature` support | Ordered target encoding |
| **Monotonic constraints** | Yes | Yes | Limited |
| **GPU training** | CUDA histogram (`gpu_hist`) | CUDA / OpenCL | CUDA (integrated path) |
| **Large numeric data** | Good | Usually fastest | Slower |
| **Many categories** | Depends on encoding | Depends on encoding | Often fastest overall |
| **Best fit** | Constraints, production default | Scale, numeric-heavy workloads | High-cardinality categoricals |
| **Main caveat** | Slower than LightGBM at scale | Overfits small data if depth unchecked | Weak monotonicity support |

These rows summarize where each library invested complexity — the sections above go into the how and why.

## Which one should you pick?

If you have millions of rows, mostly numeric features, and training time dominates your iteration loop, LightGBM's sampling and leaf-wise growth are hard to beat — especially on GPU. If your columns are full of categories and you are tired of building fragile encoding pipelines, CatBoost's ordered statistics are the point of the library. If you need monotonic constraints, interaction control, or a conservative production default with the largest community war chest, XGBoost remains the rational anchor.

In practice I still try more than one. Hyperparameter tuning narrows accuracy gaps, but preprocessing burden, constraint support, and wall-clock training time do not lie.

## Still not sure? Use the decision tree.

The interactive flow below walks through dataset size, feature types, and constraint requirements to suggest a starting library. Treat it as a shortcut to the comparison table — then validate on your own data.

::BoostingModelPicker
::

Gradient boosting works because it decomposes a hard prediction problem into a sequence of small, interpretable corrections. XGBoost made that sequence regularized and deployable, LightGBM made it fast at scale, and CatBoost made categoricals native. The right library matches the shape of your data, your hardware, and your compliance checklist — not the one that topped a single public leaderboard.

## What's your go-to model?

::BlogSurveyMlModel
::

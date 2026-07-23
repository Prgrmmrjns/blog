---
title: Spielfeld — a Bundesliga tipper that has to explain itself
excerpt: TabPFN produces the probabilities. An 11v11 board lets me test what lineups, form, and individual matchups do to the prediction.
date: "2026-07-23"
locale: en
slug: spielfeld-bundesliga-tips-with-tabpfn
topics:
  - machine-learning
  - ai
  - research
  - personal
tags:
  - Machine Learning
  - AI
  - Research
  - Personal
---

**Freiburg against Bremen: 53% home win, 26% draw, 21% away win.**

A football tipper could stop there. For me, that is where the useful questions begin. Where did the 53% come from? Which starting XI did the model assume? What happens if an important midfielder is unavailable?

[Spielfeld](https://spielfeld.vercel.app) is my attempt to answer those questions next to the prediction. It forecasts the next Bundesliga matchday with [TabPFN](https://priorlabs.ai/). Every fixture opens into an 11v11 board where I can inspect the assumed lineup, swap players, and see which factors pushed the result up or down.

![Matchday overview with mini-pitch XIs and home/draw/away probabilities](/spielfeld-matchday.webp)

The overview already shows more than a tip sheet. Each card carries the assumed formations on a mini-pitch, the tip with its lean probability, and the full H / D / A bars. Opening a match is where the interesting part starts.

## It started with the World Cup

The first prototype was an entry for a Prior Labs World Cup knockout competition. Complete lineups were often unavailable, so my pipeline had to fall back to squad values and team-level data whenever player information was missing. It finished 7th.

After the competition, I wanted to know whether the notebook could become something I would actually open on a Bundesliga Friday. Not another list of supposedly safe bets, but a small lab where every assumption is visible and editable.

I had also broken my hand around that time. Much of the interface was built with Cursor and a fair amount of voice control. That unusual development process probably helped: instead of polishing isolated components for days, I focused on the loop — choose a match, inspect the lineup, swap a player, read the explanation.

## From one fixture to three probabilities

To TabPFN, Freiburg against Bremen begins as a single row in a table. Spielfeld builds that row in four steps.

### 1. Previous matches

Results come from [OpenLigaDB](https://www.openligadb.de/). The current dataset contains completed Bundesliga matches back to 2019/20. From those games, Spielfeld derives:

- ELO ratings with a home advantage
- form over the last five and ten matches
- recent goals scored and conceded
- head-to-head results and rest days
- approximate squad values

None of this is exotic data. That is part of the appeal: it is a useful test of what a modern tabular model can extract from a modest match history.

### 2. The expected starting XI

The lineup is not decoration on the pitch board. It becomes part of the same feature row. Spielfeld first looks for confirmed API-Football lineups. Before those are published, it uses the club’s last starting XI or estimates one from current squad lists.

The eleven players are summarized into goalkeeper, defence, midfield, and attack units. The model also receives matchups such as home attack against away defence and the gap between each side’s strongest players.

In the example, Freiburg has a large ELO advantage (`+214.5`) and better recent form (`+0.6` points per game). Bremen’s estimated XI is slightly stronger (`+0.49`). The model has to combine those conflicting signals.

### 3. TabPFN

TabPFN is a foundation model for tabular data. A conventional gradient-boosting workflow would search over tree depths, learning rates, and many model variants. TabPFN was pretrained on a large collection of synthetic tabular problems, giving it a strong prior for the kinds of relationships that appear in small and medium datasets.

Spielfeld gives it the historical fixtures and their labels — home, draw, or away — together with the feature row for the new match. It returns three probabilities that add up to 100%.

> A 53% home-win probability does not mean “Freiburg will win.” It means the home win is the most likely of three outcomes under the model’s assumptions — while something else would still happen almost half the time.

### 4. FastAPI serves the result

`predict.py` generates predictions and explanation plots ahead of time. The FastAPI app on Vercel does not need to load a large model for every page view. It serves a small JSON payload and refreshes the lineups through a daily job.

![From Bundesliga data through features and TabPFN to the interactive Spielfeld lab](/spielfeld-model-pipeline.svg)

## The lineup lab

The match detail places the prediction beside the pitch. I can replace a starter with two taps or use **Best XI** to select the strongest available squad. The probability bars update immediately, and a short log shows which players moved and by how much the XI strength changed.

![Bayern vs Stuttgart lineup board after Best XI: Olise, Gnabry and Díaz come in, home tip moves to 77% (+0.3pp)](/spielfeld-lineup-lab.webp)

In the Bayern–Stuttgart example above, Best XI swapped Goretzka, Bischof and Laimer for Olise, Gnabry and Díaz. XI strength rose by about `+2.17`, and the home tip edged up by `+0.3` percentage points. The shift looks small — that is useful information, not a failure. Early in a season, and with a large favourite already, many lineup tweaks should not overturn the tip.

That feedback loop is the point of the project. A prediction does not become more credible because “AI” appears next to it. It becomes more useful when its assumptions are exposed and I can test which ones matter.

The lab deliberately does not run the full model again after every click. It uses a local sensitivity approximation. That makes the interaction fast, but it limits the interpretation: a large or unrealistic lineup overhaul should not be read as a newly trained prediction.

## What does ShapIQ explain?

A probability alone does not reveal how the model arrived there. The ShapIQ tab starts at the model’s average prediction and walks feature by feature to the tip for this match:

![ShapIQ lab for Bayern vs Stuttgart with match drivers, player contributions, line interactions, and the Spieltag what-if slider](/spielfeld-shapiq-lab.webp)

In this fixture the largest drivers are the squad-value gap and the ELO gap. Below that, the same budget is broken into players who start and line-versus-line matchups such as Bayern defence against Stuttgart attack. On the right, the Spieltag what-if slider lets me nudge home XI quality across the whole round and watch every tip react.

A cleaner single-match waterfall from Freiburg against Bremen shows the same idea without the surrounding UI:

![ShapIQ waterfall for Freiburg against Bremen, moving from the base rate to a 0.53 home-win probability](/spielfeld-shapiq-waterfall.png)

[ShapIQ](https://github.com/mmschlk/shapiq) can go beyond isolated feature attributions and examine interactions. That is useful in football because the value of an attacker is not independent of the defence they face. The lab groups the explanation into three views:

- **Match drivers:** form, ELO, squad value, head-to-head, and other team signals
- **Players:** how the XI-based contribution is distributed across the current lineup
- **Line versus line:** attack against defence, midfield against midfield, and the star-player edge

There is an important boundary. The player and line views are what-if attributions derived from the current XI and the explanation budget. They are not causal claims about how many percentage points a real transfer or injury would cost.

## From explanations to interventional audits

An explanation looks backward: *Why did the model output 53% for this input?* An interventional audit asks a different question: *How does the model respond when I deliberately change one factor while holding the surrounding context fixed?*

The simplest version chooses one quantity — the strength of the home midfield, for example — and sweeps it across a plausible range. The prediction is evaluated at every step. The resulting curve reveals model behaviour rather than a single what-if point:

- Does the home-win probability increase at all as the midfield improves?
- Is the response smooth, or are there surprising jumps?
- Does the effect eventually saturate?
- Does the model behave consistently across similar fixtures?

These checks are closer to software tests than to attractive explanation charts. They test an expected property through a sequence of targeted queries. The paper [*XAudit: A Theoretical Look at Auditing with Explanations*](https://arxiv.org/abs/2206.04740) formalizes this connection: local explanations, especially counterfactuals, can make feature-sensitivity audits substantially more efficient.

Spielfeld’s matchday what-if slider is already a simple version of such an audit. It varies the XI-quality advantage and shows how every fixture responds. I deliberately call this **interventional**, not **causal**. Changing one derived XI value while freezing everything else can create unrealistic combinations — a stronger midfield with unchanged player, attack, and squad values, for example.

A causal claim would require a structural model of how those variables depend on each other, with the intervention propagated through that structure. [*Causal Shapley Values*](https://proceedings.neurips.cc/paper/2020/file/32e54441e6382a7fbacbbbaf3c450059-Paper.pdf) shows how Pearl’s *do*-calculus can be incorporated into Shapley explanations. That is the more interesting long-term direction: not only explaining which features are associated with a tip, but systematically checking whether the model reacts plausibly under meaningful interventions.

## What Spielfeld does not know

Football remains a hostile prediction problem. The model does not know the mood in the dressing room, captures tactical changes only indirectly, and cannot be certain who will start when the lineup is estimated. Early-season fixtures are particularly difficult because current form and new squads have little observed history.

That is why Spielfeld shows probabilities rather than certainties — and why it displays the source of each lineup. The uncertainty does not disappear. It simply becomes harder to ignore.

## What comes next

I want to archive predictions over the season instead of showing only the next matchday. That would make it possible to measure calibration properly, compare lineup sources, and check whether the explanations still look sensible in hindsight.

Until then, Spielfeld is mainly the tool I wanted for myself: open a fixture on Friday night, argue with the 53%, and know exactly what I am arguing about.

- [Try Spielfeld](https://spielfeld.vercel.app)
- [Source code on GitHub](https://github.com/Prgrmmrjns/spielfeld)

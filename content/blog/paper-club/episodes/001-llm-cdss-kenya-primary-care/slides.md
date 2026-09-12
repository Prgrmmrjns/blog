---
marp: true
theme: paper-club
paginate: true
size: 16:9
html: true
title: "AI in Medicine Paper Club — Episode 1"
description: "Agweyu et al., Nature Medicine 2026: LLM clinical decision support in Kenyan primary care"
header: "AI in Medicine Paper Club  ·  Episode 1"
footer: "Agweyu et al. Nat Med 2026  ·  CC BY 4.0  ·  doi:10.1038/s41591-026-04503-6"
---

<!-- _class: title -->
<!-- _header: "" -->
<!-- _footer: "" -->
<!-- _paginate: false -->

<p class="kicker">Weekly journal club  ·  You record  ·  The paper does the talking</p>

![logo](../../theme/logo.svg)

# AI in Medicine<br>Paper Club

**Episode 1** — When the LLM reaches the clinic

Jonas Wolber  ·  RWTH Aachen  ·  Digital General Practice

---

<p class="kicker">This week's paper</p>

# A generative LLM in live primary care

**Agweyu, Mwaniki, Menon, Korom et al.**
*Nature Medicine* **32**, 3032–3039 (published 26 June 2026)

> GPT-4o, inside the EMR of 16 Kenyan clinics. ~10,000 patients. A hard clinical endpoint.

- Open access, **CC BY 4.0**
- Pan-African Clinical Trials Registry: 202502499779176
- Protocol: [zenodo.org/records/15788148](https://zenodo.org/records/15788148)

<div class="takeaway">

doi:10.1038/s41591-026-04503-6

</div>

---

<p class="kicker">Why this paper</p>

# Exams are not clinic

- LLMs look strong on vignettes and licensing-style tests
- **60%** of amenable deaths in LMICs occur after people already reached care
- Kenya: much of primary care is delivered by **clinical officers** (3-year diploma)
- Sub-Saharan Africa: ~**0.3 physicians / 1,000** people

<div class="takeaway">

If a copilot helps here, that is bigger than another AUC. If it does not, we should know.

</div>

---

<p class="kicker">The intervention</p>

# AI Consult 2.0 — GPT-4o in the EMR

<div class="columns">

<div>

**Both arms**
- Same cloud EMR
- Usual Kenyan guidelines
- No extra pay for adherence

**Intervention only**
- GPT-4o (May 2025), temperature 0.1
- Reads structured + free text
- Identifiers stripped
- Green / yellow / **red** overlay
- Accept, edit, or ignore

</div>

<div>

**What this is not**
- Not a chatbot the patient sees
- Not GPT versus doctors on a quiz
- Not enforced use

<div class="stat" style="margin-top:24px">
<b>US$0.04</b>
<span>mean model cost per patient</span>
</div>

</div>

</div>

---

<p class="kicker">Design</p>

# Pragmatic cluster RCT

<div class="stat-row">
<div class="stat"><b>16</b><span>Penda Health clinics</span></div>
<div class="stat"><b>103</b><span>clinical officers</span></div>
<div class="stat"><b>9,347</b><span>encounters analysed</span></div>
<div class="stat"><b>14 d</b><span>treatment-failure window</span></div>
</div>

<br>

- Randomized at **clinician** level (52 LLM / 51 control) — Nairobi & Kiambu, 22 Apr–16 Jul 2025
- Primary: expert-adjudicated **treatment failure** (return, escalation, missed dx, unsafe Rx, death)
- Kenyan family-physician panel, blinded to allocation
- Powered for a **50% relative drop** (2% → 1%)

---

<!-- _class: figure -->

## Fig. 1 — CONSORT: clusters, then patients

![h:520](figures/fig1-consort.png)

<p>Screened 17,626 → analysed 4,693 intervention vs 4,654 control. Most visits: adults 18–55, 56% women, ~60% febrile/infectious.</p>

---

<p class="kicker">Primary outcome</p>

# Treatment failure did not fall

<div class="stat-row">
<div class="stat"><b>2.2%</b><span>LLM arm  ·  102 / 4,693</span></div>
<div class="stat"><b>2.0%</b><span>control  ·  94 / 4,654</span></div>
<div class="stat"><b>0.77</b><span>aOR  ·  95% CI 0.55–1.08</span></div>
<div class="stat"><b>0.13</b><span>P value  ·  ITT = PP</span></div>
</div>

<br>

- Covariate-adjusted aOR **0.72** (0.50–1.03, *P* = 0.07) — still not significant
- Bayesian risk difference: **−5 failures / 1,000** (95% CrI −13 to +1)

<div class="takeaway">

They can reject a revolution. They cannot confirm a nudge. That is an honest null.

</div>

---

<!-- _class: figure -->

## Table 2 — ITT and per-protocol sit on the same number

![w:1180](figures/table2-primary-outcome.png)

<p>Failure counts 94 vs 102. Odds ratio below 1; confidence interval crosses 1.</p>

---

<!-- _class: figure -->

## Fig. 2a — Notes got better

![h:480](figures/fig2a-documentation.png)

<p>Appropriate diagnosis aOR 1.74 · comprehensive note 1.68 · appropriate plan 1.71 — all P &lt; 0.001.</p>

---

<!-- _class: figure -->

## Fig. 2b — Linger here: a mostly-safe model, a messy team

![h:430](figures/fig2b-sankey.png)

<p>1,000 red alerts: 91.8% definitely/mostly safe · 1.1% unsafe. Followed fully 19.5% / partly 57.3% / not at all 23.2%. Expert panel: follow-or-ignore <strong>not justified in 71.6%</strong>.</p>

---

<!-- _class: figure -->

## Fig. 3 — Prescribing and sentinel conditions, mostly null

![h:540](figures/fig3-sentinel-conditions.png)

<p>Antibiotics, antimalarials, HTN, malnutrition: no clear effect. Fewer “at risk of T2D” labels in the LLM arm (aOR 0.88, P = 0.023).</p>

---

<!-- _class: figure -->

## Extended Data Fig. 1 — No subgroup rescues the primary

![h:480](figures/fig-ed1-subgroups.png)

<p>Age, weekend, sentinel condition, night vs day. Interactions are noisy. Weekend and night samples are tiny.</p>

---

<!-- _class: figure -->

## Extended Data Fig. 2 — Same direction, too few events

![h:500](figures/fig-ed2-site-forest.png)

<p>14 / 16 sites point toward benefit. Pooled OR 0.76 (95% CrI 0.50–1.12). Heterogeneity low (τ = 0.22).</p>

---

<!-- _class: figure -->

## Extended Data Fig. 3 — Patients did not notice

![h:480](figures/fig-ed3-satisfaction.png)

<p>Median satisfaction 4/5 both arms. Median visit 11 minutes. 33 SAEs (27 hospitalizations, 6 deaths) judged unrelated. Not a powered non-inferiority safety claim.</p>

---

<p class="kicker">Interpretation</p>

# Why the primary can be null

1. **Powered for 50% relative reduction.** Observed effect, if any, is a nudge
2. **14-day failure is multi-cause.** Housing, follow-up, the next clinician
3. **Use was optional.** Effectiveness, not enforced efficacy
4. **Penda is already a high-baseline network.** Ceiling effects likely
5. **14 days is short.** Note quality might pay off later — or never

<div class="takeaway">

Hospitalization or death would need on the order of **>100,000** patients. What is the right endpoint for a general-purpose copilot in GP?

</div>

---

<p class="kicker">What I am taking into next week</p>

# Process moved. Outcomes did not — yet

- Better notes are not nothing. They are not fewer treatment failures
- Override **rate** is the easy metric. Override **quality** is the one in Fig. 2b
- Deskilling is named in the discussion and **not measured**
- One model version, one private urban network, one fortnight of follow-up
- Treat this as a **benchmark**, not a verdict on “AI in medicine”

---

<p class="kicker">Your turn</p>

# Paper club questions

1. Next RCT: **which primary endpoint**, and can you actually power it?
2. Documentation up, outcomes flat — success, stepping stone, or the wrong target?
3. How much override is healthy skepticism vs a tool that is too easy to ignore?
4. Public-sector and rural replications **before** anyone scales?

<div class="takeaway">

Answers in the comments. That is the club part.

</div>

---

<p class="kicker">Take-home</p>

# Three lines

<div class="stat-row">
<div class="stat"><b>Safe*</b><span>no related SAE signal at this scale</span></div>
<div class="stat"><b>Better notes</b><span>diagnosis, plan, completeness</span></div>
<div class="stat"><b>Null primary</b><span>14-day failure unchanged</span></div>
<div class="stat"><b>Modest?</b><span>large benefit unlikely</span></div>
</div>

<br>

\*Not a formal non-inferiority safety analysis.

<div class="takeaway">

More useful than “AI will transform medicine” or “AI does nothing.”

</div>

---

<!-- _class: title -->
<!-- _header: "" -->
<!-- _paginate: false -->

<p class="kicker">Episode 1  ·  not medical advice  ·  a careful reading</p>

# See you next week

**Paper:** Agweyu et al., *Nat Med* (2026)  ·  CC BY 4.0  
**Figures:** unchanged scientific content; ED figures cropped from the PDF  
**You:** record and speak. The agent only preps.

Jonas Wolber  ·  AI in Medicine Paper Club

Next episode: another new, high-impact study that had to survive contact with real patients.

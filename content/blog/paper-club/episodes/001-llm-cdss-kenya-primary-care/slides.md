---
marp: true
theme: paper-club
paginate: true
size: 16:9
html: true
title: "AI in Medicine Paper Club — Episode 1"
description: "Agweyu et al., Nature Medicine 2026: LLM clinical decision support in Kenyan primary care"
header: "AI in Medicine Paper Club  ·  Episode 1"
footer: "Agweyu et al. Nat Med 2026  ·  CC BY 4.0  ·  photos Unsplash  ·  icons Lucide ISC"
---

<!-- _class: title cover -->
<!-- _header: "" -->
<!-- _footer: "" -->
<!-- _paginate: false -->

![bg opacity:0.38](visuals/photos/doctor-laptop.jpg)

<p class="kicker">Weekly journal club  ·  You record  ·  The paper does the talking</p>

![logo](../../theme/logo.svg)

# AI in Medicine<br>Paper Club

**Episode 1** — When the LLM reaches the clinic

Jonas Wolber  ·  RWTH Aachen  ·  Digital General Practice

---

![bg right:42%](visuals/photos/consultation.jpg)

<p class="kicker">This week's paper</p>

# A generative LLM<br>in live primary care

**Agweyu et al.** · *Nature Medicine* · 26 June 2026

> GPT-4o inside 16 Kenyan clinics. ~10k patients. A hard endpoint.

![icon](visuals/icons/book-open.svg) Open access **CC BY 4.0**

doi:10.1038/s41591-026-04503-6

---

![bg left:38%](visuals/photos/exam.jpg)

<p class="kicker">Why this paper</p>

# Exams are not clinic

<div class="icon-grid">
<div class="icon-card">
<img src="visuals/icons/graduation-cap.svg" alt="icon" width="44" height="44">
<strong>Vignettes look easy</strong>
<span>LLMs crush tests. Clinic is messier.</span>
</div>
<div class="icon-card">
<img src="visuals/icons/heart-pulse.svg" alt="icon" width="44" height="44">
<strong>60% of amenable deaths</strong>
<span>In LMICs, after people already reached care.</span>
</div>
<div class="icon-card">
<img src="visuals/icons/stethoscope.svg" alt="icon" width="44" height="44">
<strong>Clinical officers</strong>
<span>3-year diploma. Often no senior next door.</span>
</div>
<div class="icon-card">
<img src="visuals/icons/users.svg" alt="icon" width="44" height="44">
<strong>0.3 physicians / 1,000</strong>
<span>Sub-Saharan Africa vs OECD 3.9.</span>
</div>
</div>

---

![bg right:36%](visuals/photos/medical-notes.jpg)

<p class="kicker">The intervention</p>

# AI Consult 2.0 in the EMR

![w:620](visuals/svg/emr-traffic-lights.png)

GPT-4o · May 2025 · **US$0.04** / patient · accept, edit, or ignore

---

<p class="kicker">Design</p>

# Pragmatic cluster RCT

![h:260](visuals/svg/cluster-rct.png)

<div class="icon-grid four">
<div class="icon-card">
<img src="visuals/icons/hospital.svg" alt="icon" width="40" height="40">
<strong>16 clinics</strong>
<span>Nairobi &amp; Kiambu</span>
</div>
<div class="icon-card">
<img src="visuals/icons/users.svg" alt="icon" width="40" height="40">
<strong>9,347</strong>
<span>encounters analysed</span>
</div>
<div class="icon-card">
<img src="visuals/icons/clock.svg" alt="icon" width="40" height="40">
<strong>14 days</strong>
<span>treatment-failure window</span>
</div>
<div class="icon-card">
<img src="visuals/icons/map-pin.svg" alt="icon" width="40" height="40">
<strong>Apr–Jul 2025</strong>
<span>powered for a 50% drop</span>
</div>
</div>

---

<!-- _class: figure -->

## Fig. 1 — CONSORT: clusters, then patients

![h:500](figures/fig1-consort.png)

<p>Screened 17,626 → analysed 4,693 vs 4,654. Adults 18–55, 56% women, ~60% febrile/infectious.</p>

---

![bg right:34%](visuals/photos/hospital-corridor.jpg)

<p class="kicker">Primary outcome</p>

# Treatment failure did not fall

![w:640](visuals/svg/null-bars.png)

They can reject a revolution. They cannot confirm a nudge.

---

<!-- _class: figure -->

## Table 2 — ITT and per-protocol sit on the same number

![w:1180](figures/table2-primary-outcome.png)

<p>Failure counts 94 vs 102. Odds ratio below 1; confidence interval crosses 1.</p>

---

<!-- _class: figure -->

## Fig. 2a — Notes got better

![h:470](figures/fig2a-documentation.png)

<p>Appropriate diagnosis aOR 1.74 · comprehensive note 1.68 · appropriate plan 1.71 — all P &lt; 0.001.</p>

---

<!-- _class: figure -->

## Fig. 2b — Linger here: a mostly-safe model, a messy team

![h:420](figures/fig2b-sankey.png)

<p>1,000 red alerts: 91.8% safe-ish · 1.1% unsafe. Followed fully 19.5%. Expert panel: follow-or-ignore <strong>not justified in 71.6%</strong>.</p>

---

<!-- _class: figure -->

## Fig. 3 — Prescribing and sentinel conditions, mostly null

![h:520](figures/fig3-sentinel-conditions.png)

<p>Antibiotics, antimalarials, HTN, malnutrition: no clear effect. Fewer “at risk of T2D” labels (aOR 0.88, P = 0.023).</p>

---

<!-- _class: figure -->

## Extended Data Fig. 1 — No subgroup rescues the primary

![h:470](figures/fig-ed1-subgroups.png)

<p>Age, weekend, sentinel condition, night vs day. Interactions are noisy.</p>

---

<!-- _class: figure -->

## Extended Data Fig. 2 — Same direction, too few events

![h:490](figures/fig-ed2-site-forest.png)

<p>14 / 16 sites point toward benefit. Pooled OR 0.76 (95% CrI 0.50–1.12).</p>

---

![bg right:32%](visuals/photos/waiting-room.jpg)

<!-- _class: figure -->

## Extended Data Fig. 3 — Patients did not notice

![h:420](figures/fig-ed3-satisfaction.png)

<p>Median 4/5 both arms. Visit 11 min. 33 SAEs judged unrelated.</p>

---

<p class="kicker">Interpretation</p>

# Why the primary can be null

<div class="icon-grid five">
<div class="icon-card">
<img src="visuals/icons/activity.svg" alt="icon" width="40" height="40">
<strong>Powered for 50%</strong>
<span>Observed effect, if any, is a nudge.</span>
</div>
<div class="icon-card">
<img src="visuals/icons/split.svg" alt="icon" width="40" height="40">
<strong>Multi-cause</strong>
<span>Housing, follow-up, the next clinician.</span>
</div>
<div class="icon-card">
<img src="visuals/icons/circle-alert.svg" alt="icon" width="40" height="40">
<strong>Optional use</strong>
<span>Effectiveness, not enforced efficacy.</span>
</div>
<div class="icon-card">
<img src="visuals/icons/shield-check.svg" alt="icon" width="40" height="40">
<strong>High baseline</strong>
<span>Penda already audits and digitizes.</span>
</div>
<div class="icon-card">
<img src="visuals/icons/clock.svg" alt="icon" width="40" height="40">
<strong>14 days</strong>
<span>Note quality might pay off later — or never.</span>
</div>
</div>

![h:170](visuals/svg/sixteen-clinics.png)

---

![bg left:36%](visuals/photos/medical-notes.jpg)

<p class="kicker">What I am taking into next week</p>

# Process moved.<br>Outcomes did not — yet

![w:640](visuals/svg/process-outcome.png)

Override **rate** is easy. Override **quality** is Fig. 2b. Deskilling is unnamed in the data.

---

<p class="kicker">Your turn</p>

# Paper club questions

<div class="icon-grid">
<div class="icon-card">
<img src="visuals/icons/circle-help.svg" alt="icon" width="44" height="44">
<strong>1. Next endpoint?</strong>
<span>Which primary, and can you actually power it?</span>
</div>
<div class="icon-card">
<img src="visuals/icons/notebook-pen.svg" alt="icon" width="44" height="44">
<strong>2. Better notes</strong>
<span>Success, stepping stone, or the wrong target?</span>
</div>
<div class="icon-card">
<img src="visuals/icons/scale.svg" alt="icon" width="44" height="44">
<strong>3. Override</strong>
<span>Healthy skepticism vs a tool too easy to ignore?</span>
</div>
<div class="icon-card">
<img src="visuals/icons/map-pin.svg" alt="icon" width="44" height="44">
<strong>4. Where next?</strong>
<span>Public-sector and rural replications before scale?</span>
</div>
</div>

---

![bg right:32%](visuals/photos/stethoscope.jpg)

<p class="kicker">Take-home</p>

# Three lines

<div class="icon-grid">
<div class="icon-card">
<img src="visuals/icons/shield-check.svg" alt="icon" width="44" height="44">
<strong>Safe*</strong>
<span>No related SAE signal at this scale.</span>
</div>
<div class="icon-card">
<img src="visuals/icons/file-text.svg" alt="icon" width="44" height="44">
<strong>Better notes</strong>
<span>Diagnosis, plan, completeness.</span>
</div>
<div class="icon-card">
<img src="visuals/icons/activity.svg" alt="icon" width="44" height="44">
<strong>Null primary</strong>
<span>14-day failure unchanged.</span>
</div>
<div class="icon-card">
<img src="visuals/icons/scale.svg" alt="icon" width="44" height="44">
<strong>Modest?</strong>
<span>Large benefit unlikely.</span>
</div>
</div>

\*Not a formal non-inferiority safety analysis.

---

<!-- _class: title cover -->
<!-- _header: "" -->
<!-- _paginate: false -->

![bg opacity:0.4](visuals/photos/kenya-landscape.jpg)

<p class="kicker">Episode 1  ·  not medical advice  ·  a careful reading</p>

# See you next week

**Paper** Agweyu et al., *Nat Med* 2026 · CC BY 4.0  
**Photos** Unsplash · **Icons** Lucide ISC  
**You** record and speak

Jonas Wolber  ·  AI in Medicine Paper Club

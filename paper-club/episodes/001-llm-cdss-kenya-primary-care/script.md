# Episode 1 — Video script

**Title:** When the LLM reaches the clinic: a 10,000-patient trial in Kenya  
**Series:** AI in Medicine Paper Club  
**Paper:** Agweyu et al., *Nature Medicine* (26 June 2026)  
**DOI:** https://doi.org/10.1038/s41591-026-04503-6  
**Length:** ~11–13 minutes (~1,700 words at ~150 wpm)  
**You record this.** Pause at the italic stage directions. Do not rush the numbers.

Pronunciation: *Ag-WAY-oo* (Ambrose Agweyu), *PEN-dah Health*, *kee-AHM-boo* (Kiambu), *CON-sort*.

---

## SLIDE 1 — Title

Welcome to AI in Medicine Paper Club. I'm Jonas Wolber. I research digital general practice and computational biomedicine at RWTH Aachen.

The idea of this series is simple. Once a week we take a new, preferably high-impact, peer-reviewed study on AI in medicine. I walk through what they did, what they found, and what is still hanging. You get a paper, not a product demo.

Today is episode one. And I wanted a trial that actually happened in clinic — not another leaderboard.

## SLIDE 2 — The paper

The paper is: *Generative AI-enabled clinical decision support system in primary care: a pragmatic, cluster-randomized trial.* Nature Medicine, June 2026. First author Ambrose Agweyu, corresponding author Bilal Mateen, with Penda Health, KEMRI-Wellcome, PATH, and the University of Birmingham.

Open access, CC BY 4.0 — which is why we can put their figures on screen.

One sentence version: they put GPT-4o inside the electronic medical record of sixteen primary care clinics in Kenya, randomized a hundred and three clinical officers, followed almost ten thousand patients, and asked whether fourteen-day treatment failure went down.

## SLIDE 3 — Why this one

*[pause]*

LLMs crush medical exams. They look great on vignettes. I still do not know, most weeks, whether that helps the person who sat down in clinic this morning.

This group tested that. Real visits. Real clinicians. Patients called on day three and day fourteen.

The setting is not Boston or Berlin. Sub-Saharan Africa has about 0.3 physicians per thousand people. In Kenya, a lot of primary care is delivered by clinical officers — three-year diploma, often no senior next door.

The authors remind us that sixty percent of deaths from conditions *amenable* to healthcare in low- and middle-income countries happen in people who already reached a facility. The door opened. Quality after that is the problem.

If a language model helps there, that is a bigger deal than another AUC.

## SLIDE 4 — The intervention

Both arms used the same cloud EMR.

Intervention arm: a feature called AI Consult 2.0. GPT-4o, May 2025 release, temperature 0.1. It reads what the clinician is already typing — no extra chatbot window required — identifiers stripped, and it overlays suggestions aligned with Kenyan guidelines.

Traffic lights: green, yellow, red. The clinician can take it, edit it, or ignore it. Nobody was paid extra to comply.

Control arm: same EMR, feature off.

That is a pragmatic effectiveness question. Not "is GPT-4 smarter than a doctor on a quiz," but "does a copilot change outcomes when you are allowed to ignore it?"

Cost of the model: four US cents per patient.

## SLIDE 5 — Design

Cluster randomized at the clinical-officer level. Fifty-two in the LLM arm, fifty-one in control. You cannot have the same clinician flipping the model on and off between patients without contaminating the comparison.

Sixteen Penda Health clinics, Nairobi and Kiambu. April 22 to July 16, 2025.

Primary outcome: expert-adjudicated treatment failure within fourteen days. That means coming back with unresolved symptoms, unplanned escalation, missed diagnosis, unsafe prescription, or death. A panel of Kenyan family physicians, blinded to arm.

They powered for a fifty percent relative reduction — two percent down to one percent. Hold that thought. It matters when we get to the result.

## SLIDE 6 — CONSORT figure

*[let the figure sit; point with cursor if you have one]*

This is Figure 1 from the paper.

Seventeen thousand six hundred and twenty-six patients screened. About sixty-seven hundred did not meet eligibility. A few hundred declined consent.

Then the split: forty-eight hundred and eighty-eight patients seen by intervention officers, forty-eight hundred and fourteen by control.

After withdrawals, loss to follow-up, and protocol issues — mixed-arm consultations, unconsented officers, failed EMR linkage — they analyze **four thousand six hundred ninety-three** versus **four thousand six hundred fifty-four**.

Most patients eighteen to fifty-five. Fifty-six percent female. Sixty percent febrile or infectious presentations. This is ordinary primary care, not a cancer trial.

## SLIDE 7 — Primary result

Here is the headline.

Treatment failure: **2.2 percent** with the LLM, **2.0 percent** without.

Adjusted odds ratio **0.77**. Confidence interval **0.55 to 1.08**. P value **0.13**.

Same number in the per-protocol analysis. If you throw in extra covariates — age, sex, time of day — it becomes 0.72, P equals 0.07. Still not significant.

*[pause]*

So: they did **not** show a reduction in fourteen-day treatment failure.

And: the interval still allows a modest benefit and pretty clearly rules out a large one. Their Bayesian model says about five fewer failures per thousand patients, with a credible interval from thirteen fewer to one extra.

The trial can reject a revolution. It cannot confirm a nudge. That is not a failed paper. That is an honest one.

## SLIDE 8 — Table 2

This is Table 2. Intention-to-treat and per-protocol sit on top of each other. Failure counts: ninety-four versus a hundred and two. The percentages are almost identical. The odds ratio is below one, the confidence interval crosses one.

If you only remember one slide of numbers, remember this one.

## SLIDE 9 — Documentation got better

Now the part that *did* move.

Two thousand notes, expert rated.

LLM-assisted officers were more likely to record an appropriate diagnosis — odds ratio 1.74. A comprehensive note — 1.68. An appropriate plan — 1.71. All highly significant.

Look at panel a. The green "agree" and "strongly agree" slices grow in the intervention bars. The orange disagreement shrinks. It is not a miracle. It is a consistent shift toward better documentation.

Process quality improved. That is real. It is also not the primary endpoint.

## SLIDE 10 — The Sankey

*[slow down]*

Panel b is the slide I would stay on in a journal club.

One thousand red alerts — the model thought something documented was wrong or harmful.

Ninety-two percent of those outputs were definitely or mostly safe. One percent unsafe and inappropriate. So the advice is not a dumpster fire.

Then: did the clinician listen? Fully, only twenty percent. Partially, fifty-seven. Not at all, twenty-three.

Then the expert panel asks: was that choice — to follow or to ignore — clinically justified? In seventy-two percent of these red-alert cases, **no**.

So we have a mostly-safe model, messy partial adherence, and a lot of decisions the panel would not defend. Human-AI teams are not automatically better than either part. This figure is that sentence, drawn.

## SLIDE 11 — Sentinel conditions

Figure 3 is the condition-by-condition board: antibiotics, antimalarials, malnutrition, type 2 diabetes, hypertension.

Almost everything is null. Correct antibiotic use, similar. Incorrect antimalarials, similar. New hypertension diagnoses, similar. Malnutrition diagnosis and nutritionist referral, similar.

One wrinkle: fewer people labelled "at risk of type 2 diabetes" in the LLM arm. Odds ratio 0.88, P 0.023. The authors suggest the model may have reclassified some patients as already diabetic instead of merely at risk. Plausible. Not proven.

Antibiotic spending was about fifteen cents lower per patient. In this sample, that saving is larger than the four-cent model bill — before you count software, training, and monitoring. A signal, not a health-economics paper.

## SLIDE 12 — Subgroups

Extended Data Figure 1. Age, weekend versus weekday, sentinel condition, night versus day.

No interaction survives a serious look. Weekend is noisy — tiny sample. Night is noisy. The diamond sits left of one a few times, always with intervals that cross.

If there is an effect, it is not hiding in one obvious subgroup in this dataset.

## SLIDE 13 — Sites

Extended Data Figure 2. Sixteen clinics.

Fourteen of sixteen point estimates sit on the side of benefit. Almost every interval is wide. Pooled odds ratio 0.76, credible interval 0.50 to 1.12. Heterogeneity is low.

That is what "probably modest, if anything" looks like on a forest plot. Not chaos across Nairobi. Just not enough events.

## SLIDE 14 — Patients did not notice

Extended Data Figure 3. Satisfaction.

Recommend the clinic, concerns addressed, thoroughness, next steps explained. Control and intervention bars are basically twins. Median four out of five in both arms.

Median consultation time: eleven minutes, both arms.

Patients never saw the interface. A parallel qualitative study in the same network found clinical officers treated this as a quiet aid, not a third person in the room. That tracks with a flat satisfaction score.

Thirty-three serious adverse events — twenty-seven hospitalizations, six deaths — judged unrelated to the tool. The trial is not powered to prove safety equivalence for rare harm. Absence of a signal is not a non-inferiority claim.

## SLIDE 15 — Why might the primary be null?

A few reasons, and they can all be true at once.

One: they powered for a fifty percent drop. They observed something closer to a nudge, if that. Underpowered for the effect they maybe had.

Two: fourteen-day treatment failure in ordinary primary care is a noisy, multi-cause endpoint. Housing, follow-up, drug shops, the next clinician — the model does not own those.

Three: nobody had to use the advice. Effectiveness, not enforced efficacy.

Four: Penda already runs audits and a serious EMR. Ceiling effect. The same tool in a less resourced public clinic might look different — better, or more fragile.

Five: fourteen days is short. Documentation gains might pay off later. Or they might never.

## SLIDE 16 — What this means for us

I am not going to tell you LLMs in clinic are useless. That is not what the paper says.

I *am* going to say: **better notes are not better outcomes until someone shows it.** This group was brave enough to put a hard endpoint on the table and publish a null.

If you work in digital primary care — I do — the questions I am taking into next week are:

What is the right primary outcome for a general-purpose copilot? Disease-specific metrics miss the point. Death needs a hundred thousand patients.

How do we measure override quality, not just override rate?

And how do we stop process metrics from becoming the product?

The deskilling worry is in the discussion. It is not measured. Someone will have to measure it.

## SLIDE 17 — Club questions

If you are reading along, four questions:

One. Next RCT: which primary endpoint, and can you actually power it?

Two. Documentation up, outcomes flat — success, stepping stone, or optimizing the wrong thing?

Three. How much clinician override is healthy, and how much is a tool that is too easy to ignore?

Four. Do we need public-sector and rural replications before anyone scales this?

Put answers in the comments if you like. That is the club part.

## SLIDE 18 — Take-home

Three lines.

GPT-4o, embedded in Kenyan primary care, was generally safe at this scale.

It improved documentation.

It did not reduce fourteen-day treatment failure, and any true benefit is probably modest.

That is a more useful sentence than "AI will transform medicine" or "AI does nothing."

## SLIDE 19 — End card

Paper in the description. Figures are CC BY 4.0 from Agweyu and colleagues. Script and slides are in my repo if you want to steal the format for your own journal club.

I am Jonas. This was AI in Medicine Paper Club, episode one. I will be back next week with another study — preferably new, preferably high-impact, preferably one that had to survive contact with real patients.

Thanks for watching.

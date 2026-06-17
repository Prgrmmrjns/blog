---
title: "Forecasting Blood Sugar: When AI Reads Your Lunch Plate"
excerpt: "In my latest paper, we combine language models, mechanistic metabolism models, and machine learning to predict glucose in type 1 diabetes — without painstaking food diaries."
date: "2026-06-15"
locale: en
slug: health-monitoring-and-ml-in-diabetes-research
tags:
  - Machine Learning
  - Diabetes
  - Health
  - Research
  - LLMs
---

In type 1 diabetes, blood glucose can swing sharply within minutes — and every body responds differently. Continuous glucose monitors and smart insulin pumps now deliver precise real-time data. What is often missing is the decisive piece of context: reliable information about *what* someone ate, and when.

That gap is what motivated our latest work. Together with Moein E. Samadi, Julia Sellin, and Andreas Schuppert, I published a [study](https://www.sciencedirect.com/science/article/pii/S1532046425001741) in the *Journal of Biomedical Informatics* that links three fields that rarely meet in practice: multimodal language models, mechanistic modeling of metabolism, and machine learning. Our aim is personalized glucose forecasting — including from meal photos that many people already have on their phones.

## Recognizing meals without weighing every bite

In my view, the central problem in diabetes management is not a lack of sensor data, but missing or inaccurate context. Patients are expected to log meals while living their everyday lives — a process that is often incomplete, delayed, or simply forgotten.

We therefore use a multimodal large language model (Pixtral Large) to estimate macronutrients from photographs of a meal: carbohydrates, simple and complex sugars, protein, fat, and fiber. That removes at least part of the manual documentation burden. The model produces estimates that feed into our forecasting system downstream.

We wanted to test whether images and glucose data together reveal something that pure time-series models cannot — whether a photo of lunch adds information that spreadsheets alone miss.

## When does a meal take effect — and for how long?

Not every nutrient reaches the bloodstream at the same speed. Simple sugars often act within minutes; complex carbohydrates later; protein later still. To capture these temporal patterns, we optimized patient-specific cubic Bézier curves. They describe how individual macronutrients influence blood glucose over hours — a mechanistic layer between the meal and the machine learning model.

On that basis we trained a LightGBM model and compared three variants:

- **Baseline:** glucose trajectory and insulin only
- **LastMeal:** plus information about the last meal
- **Bézier:** plus mechanistically modeled time profiles of macronutrients

We evaluated the approach on the **D1NAMO dataset** (six patients with meal images) and the **AZT1D dataset** (24 patients with structured carbohydrate and correction-insulin logs), the latter to validate the mechanistic component independently.

## What we found

The Bézier variant performed best in both datasets. On D1NAMO it achieved a root mean square error (RMSE) of **15.06 mg/dl** at a 30-minute horizon and **28.15 mg/dl** at 60 minutes. On AZT1D the values were **16.61** and **24.58 mg/dl** respectively. Compared with simpler models, predictions improved most when we modeled the temporal effect of nutrients explicitly.

Patient-specific curves also revealed clear metabolic differences. On average, simple sugars peaked after about **0.74 hours**, complex carbohydrates after **3.07 hours**, and protein after **4.36 hours**. What often disappears in population averages becomes visible here as an individual pattern — and that, to me, is one of the most interesting findings.

For longer forecast horizons, macronutrient features gained importance; in the short term, glucose change and insulin dominated. Meal information remains relevant well after eating — not only in the minutes immediately following a meal.

## Sharing data — for better recommendations?

Systems like ours depend on data: glucose streams, insulin, meals — and perhaps, in future, private photos of what is on the plate. Whether people are willing to share personal health data in exchange for AI-supported recommendations is an open question — one I think about a lot in my work, and one that affects how research like this can ever reach everyday care.

::HealthDataSurvey
::

## Where this could go

I believe combining language models with mechanistic modeling has real potential to personalize diabetes management — not as a substitute for clinical decisions, but as decision support. Our source code is available at [github.com/Prgrmmrjns/Glucovision](https://github.com/Prgrmmrjns/Glucovision).

Whether meal photos and algorithms will one day become reliable everyday tools depends not only on model accuracy, but also on trust, data protection, and the question of which data people are prepared to share — and for what purpose. I'd be curious to hear your thoughts in the comments.

---

*I work at RWTH Aachen's Institute of Digital General Practice, where my research focuses on health monitoring, metabolic disease, and machine learning.*

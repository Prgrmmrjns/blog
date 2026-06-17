---
title: "Blutzucker vorhersagen: Wenn KI Ihren Mittagsteller liest"
excerpt: "In meiner neuesten Arbeit kombinieren wir Sprachmodelle, mechanistische Stoffwechselmodelle und Machine Learning, um den Blutzucker bei Typ-1-Diabetes vorherzusagen — ohne mühsame Ernährungstagebücher."
date: "2026-06-15"
locale: de
slug: health-monitoring-and-ml-in-diabetes-research
topics:
  - machine-learning
  - diabetes
  - health
  - research
  - llms
tags:
  - Machine Learning
  - Diabetes
  - Health
  - Research
  - LLMs
---

Bei Typ-1-Diabetes kann der Blutzucker innerhalb von Minuten stark schwanken — und jeder Körper reagiert anders. Kontinuierliche Glukosemessgeräte und intelligente Insulinpumpen liefern heute präzise Echtzeitdaten. Was oft fehlt, ist der entscheidende Kontext: verlässliche Informationen darüber, *was* jemand gegessen hat und wann.

Diese Lücke hat unsere neueste Arbeit motiviert. Gemeinsam mit Moein E. Samadi, Julia Sellin und Andreas Schuppert habe ich eine [Studie](https://www.sciencedirect.com/science/article/pii/S1532046425001741) im *Journal of Biomedical Informatics* veröffentlicht, die drei Bereiche verbindet, die in der Praxis selten zusammenkommen: multimodale Sprachmodelle, mechanistische Modellierung des Stoffwechsels und Machine Learning. Unser Ziel ist personalisierte Glukosevorhersage — auch aus Mahlzeitenfotos, die viele Menschen bereits auf dem Smartphone haben.

## Mahlzeiten erkennen, ohne jeden Bissen abzuwiegen

Meiner Ansicht nach liegt das zentrale Problem im Diabetes-Management nicht in einem Mangel an Sensordaten, sondern in fehlendem oder ungenauem Kontext. Patientinnen und Patienten sollen Mahlzeiten protokollieren, während sie ihren Alltag leben — ein Prozess, der oft unvollständig, verspätet oder schlicht vergessen wird.

Deshalb nutzen wir ein multimodales Large Language Model (Pixtral Large), um aus Fotografien einer Mahlzeit Makronährstoffe abzuschätzen: Kohlenhydrate, einfache und komplexe Zucker, Protein, Fett und Ballaststoffe. Das nimmt zumindest einen Teil der manuellen Dokumentationslast. Das Modell liefert Schätzungen, die in unser Vorhersagesystem einfließen.

Wir wollten testen, ob Bilder und Glukosedaten zusammen etwas offenbaren, das reine Zeitreihenmodelle nicht können — ob ein Foto vom Mittagessen Informationen liefert, die Tabellen allein verpassen.

## Wann wirkt eine Mahlzeit — und wie lange?

Nicht jeder Nährstoff gelangt mit derselben Geschwindigkeit ins Blut. Einfache Zucker wirken oft innerhalb von Minuten; komplexe Kohlenhydrate später; Protein noch später. Um diese zeitlichen Muster zu erfassen, optimierten wir patientenspezifische kubische Bézier-Kurven. Sie beschreiben, wie einzelne Makronährstoffe über Stunden den Blutzucker beeinflussen — eine mechanistische Schicht zwischen Mahlzeit und Machine-Learning-Modell.

Darauf aufbauend trainierten wir ein LightGBM-Modell und verglichen drei Varianten:

- **Baseline:** nur Glukoseverlauf und Insulin
- **LastMeal:** plus Informationen zur letzten Mahlzeit
- **Bézier:** plus mechanistisch modellierte Zeitprofile der Makronährstoffe

Wir evaluierten den Ansatz am **D1NAMO-Datensatz** (sechs Patientinnen und Patienten mit Mahlzeitenbildern) und am **AZT1D-Datensatz** (24 Patientinnen und Patienten mit strukturierten Kohlenhydrat- und Korrekturinsulin-Protokollen), letzterer zur unabhängigen Validierung der mechanistischen Komponente.

## Was wir gefunden haben

Die Bézier-Variante schnitt in beiden Datensätzen am besten ab. Auf D1NAMO erreichte sie einen Root Mean Square Error (RMSE) von **15,06 mg/dl** bei einem 30-Minuten-Horizont und **28,15 mg/dl** bei 60 Minuten. Auf AZT1D lagen die Werte bei **16,61** bzw. **24,58 mg/dl**. Im Vergleich zu einfacheren Modellen verbesserten sich die Vorhersagen am stärksten, wenn wir den zeitlichen Effekt der Nährstoffe explizit modellierten.

Patientenspezifische Kurven zeigten auch deutliche metabolische Unterschiede. Im Durchschnitt erreichten einfache Zucker nach etwa **0,74 Stunden** ihren Peak, komplexe Kohlenhydrate nach **3,07 Stunden** und Protein nach **4,36 Stunden**. Was in Populationsmittelwerten oft verschwindet, wird hier als individuelles Muster sichtbar — und das ist für mich einer der spannendsten Befunde.

Bei längeren Vorhersagehorizonten gewannen Makronährstoff-Features an Bedeutung; kurzfristig dominierten Glukoseänderung und Insulin. Mahlzeiteninformationen bleiben lange nach dem Essen relevant — nicht nur in den Minuten unmittelbar nach einer Mahlzeit.

## Daten teilen — für bessere Empfehlungen?

Systeme wie unseres hängen von Daten ab: Glukoseströme, Insulin, Mahlzeiten — und vielleicht künftig private Fotos dessen, was auf dem Teller liegt. Ob Menschen bereit sind, persönliche Gesundheitsdaten im Austausch für KI-gestützte Empfehlungen zu teilen, ist eine offene Frage — eine, über die ich in meiner Arbeit viel nachdenke und die beeinflusst, ob Forschung wie diese jemals in die Versorgung im Alltag gelangen kann.

::HealthDataSurvey
::

## Wohin das führen könnte

Ich glaube, die Kombination von Sprachmodellen mit mechanistischer Modellierung hat echtes Potenzial, das Diabetes-Management zu personalisieren — nicht als Ersatz für klinische Entscheidungen, sondern als Entscheidungsunterstützung. Unser Quellcode ist verfügbar unter [github.com/Prgrmmrjns/Glucovision](https://github.com/Prgrmmrjns/Glucovision).

Ob Mahlzeitenfotos und Algorithmen eines Tages zuverlässige Alltagswerkzeuge werden, hängt nicht nur von der Modellgenauigkeit ab, sondern auch von Vertrauen, Datenschutz und der Frage, welche Daten Menschen bereit sind zu teilen — und zu welchem Zweck. Ich wäre neugierig auf Ihre Gedanken in den Kommentaren.

---

*Ich arbeite am Institut für Digitale Allgemeinmedizin der RWTH Aachen, wo meine Forschung sich auf Gesundheitsmonitoring, Stoffwechselerkrankungen und Machine Learning konzentriert.*

---
title: Spielfeld — Bundesliga-Tipps mit TabPFN und ShapIQ
excerpt: Wie aus einem 7. Platz bei einem WM-Wettbewerb eine Bundesliga-App wurde, mit der man diskutieren kann — Spielfeld, Spielertausch und ehrliche Erklärungen.
date: "2026-07-23"
locale: de
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

Die meisten Fußball-Prognoseseiten werfen dir eine Zahl hin und erwarten, dass du sie glaubst. Ich glaube sie nie. Als ich also selbst eine gebaut habe, wollte ich daran herumdrücken können: die Quoten sehen, die Aufstellung verschieben und herausfinden, welcher Spieler oder welche Statistik eigentlich hinter dem Tipp steckt.

Diese App ist [Spielfeld](https://spielfeld.vercel.app). Für jedes Bundesliga-Spiel gibt sie einen Tipp — Heimsieg, Remis oder Auswärtssieg — mit [TabPFN von Prior Labs](https://priorlabs.ai/), schätzt, wer voraussichtlich aufläuft, und zeigt dann mit ShapIQ, wie sie zu dem Tipp kommt. Der Code liegt auf [GitHub](https://github.com/Prgrmmrjns/spielfeld).

![Spielfeld Pitch-Mark](/spielfeld-icon.svg)

## Wie es angefangen hat

Prior Labs hat rund um die letzte WM einen Wettbewerb veranstaltet: die K.-o.-Runden mit ihrem TabPFN-Modell vorhersagen. Ich bin eingestiegen, habe eine Pipeline gebaut, die auf den Kaderwert zurückfällt, wenn keine vollständigen Aufstellungen da sind, und wurde 7. Für den ersten Versuch ganz okay.

Das Setup hat mir zu gut gefallen, um es mit dem Turnier sterben zu lassen. Also habe ich es auf die Bundesliga für die Saison 2026/27 gerichtet. Gleiches Modell im Kern, eine Liga, die ich wirklich schaue, und endlich Platz für das, was ich eigentlich wollte: ein Aufstellungs-Lab.

Ein kleines Geständnis zur Oberfläche: Ich habe mir damals die Hand gebrochen und konnte eine Weile nicht richtig tippen, deshalb ist ein großer Teil der UI in Cursor vibe-coded worden. Das CSS war ohnehin nie der Punkt. Mir ging es darum, die Tipps transparent genug zu machen, dass ich sie am Wochenende auch wirklich anschaue.

## Wie ein Spieltag aussieht

Du landest auf den Partien des nächsten Spieltags, jede mit einem Tipp und den drei Wahrscheinlichkeiten. Klick auf ein Spiel, und es öffnet sich:

- ein **11-gegen-11-Spielfeld** mit den erwarteten Startern, die du tauschen kannst
- ein **Best-XI**-Button, der jede Mannschaft aus ihren stärksten verfügbaren Spielern neu aufbaut
- ein **ShapIQ-Tab**, der den Tipp danach aufschlüsselt, was ihn nach oben oder unten gedrückt hat

Der Sinn des Reinklickens: Nichts ist in Stein gemeißelt. Ändere die Aufstellung, und die Wahrscheinlichkeiten wandern mit.

## Wie der Tipp entsteht

Die Pipeline ist ziemlich schlicht, wenn man sie ausbreitet:

1. Spielhistorie von [OpenLigaDB](https://www.openligadb.de/) ziehen — beendete Bundesliga-Spiele zurück bis 2019/20.
2. Jede Partie in Features umwandeln: eine ELO-Wertung mit Heimvorteil, aktuelle Form, geschossene und kassierte Tore, direkter Vergleich, Ruhetage, ein Kaderwert-Abstand und ein Satz Aufstellungs-Features (Gesamtstärke der XI, die Linien GK/DEF/MID/FWD, der Star-Vorsprung und Matchups wie Heimoffensive gegen Auswärtsabwehr).
3. TabPFN diese Features auf Heim-/Remis-/Auswärts-Wahrscheinlichkeiten abbilden lassen. Einen Gradient-Boosting-Fallback gibt es nicht mehr; alles läuft über TabPFN, deshalb braucht `predict.py` den Prior-Labs-Key.
4. Die Vorhersagen als JSON speichern und aus einer kleinen FastAPI-App auf Vercel ausliefern. Ein täglicher Cron aktualisiert die Aufstellungen, und ein volles Retraining kann ich per GitHub Actions anstoßen.

### Die Aufstellungen richtig hinbekommen

Die Startelf ist nicht bloß Deko auf dem Spielfeld — sie fließt in die Vorhersage. Die App versucht es deshalb der Reihe nach:

1. bestätigte Aufstellungen von API-Football, sobald sie veröffentlicht sind,
2. sonst die letzte Elf, die ein Klub tatsächlich gestellt hat,
3. und wenn die freien Daten veraltet sind, eine Kaderschätzung aus Wikipedia und footballsquads.

Wer voraussichtlich spielt, verändert die Quoten — nicht nur die Grafik.

## Erklärungen statt Schulterzucken

Das ist der Teil, der mir am wichtigsten ist. Viele „erklärbaren" Tools hören bei einem Balkendiagramm mit Feature-Wichtigkeiten auf. Spielfeld nutzt stattdessen [ShapIQ](https://github.com/mmschlk/shapiq), das auch zeigen kann, wie Features zusammenwirken — man bekommt also die Treiber auf Teamebene, wie sich die Qualität der Elf auf einzelne Spieler verteilt, und Linie-gegen-Linie-Duelle wie Angriff gegen Abwehr.

![ShapIQ-Waterfall für Freiburg gegen Bremen, endet bei 0,53 Heimsieg-Wahrscheinlichkeit](/spielfeld-shapiq-waterfall.png)

Der Waterfall oben stammt direkt aus der App: Er startet bei der durchschnittlichen Heimsieg-Rate und läuft Feature für Feature zur Zahl dieses Spiels. Dazu gibt es einen Spieltag-Regler, mit dem man die Heim-XI-Qualität über die ganze Runde schieben und jeden Tipp reagieren sehen kann.

Ich versuche, bei den Grenzen ehrlich zu sein. Die Lab-Tausche nutzen eine lokale Näherung, kein frisches Retraining pro Klick. Fußball ist laut, und Verletzungen, Taktik und Schiedsrichter tauchen nur teilweise in den Features auf. Und wenn noch niemand eine Aufstellung veröffentlicht hat, kann meine Kaderschätzung schlicht danebenliegen, wer samstags startet.

## Der Stack, kurz

```
OpenLigaDB + Aufstellungs-Quellen
        ↓
predict.py  (TabPFN + ShapIQ)
        ↓
predictions.json + Erklärungsgrafiken
        ↓
FastAPI auf Vercel
```

Alles steckt in einer Python-App: `predict.py` trainiert das Modell und schreibt die Grafiken, `app/main.py` liefert UI und API aus, und ein paar GitHub Actions kümmern sich um Deploys und den geplanten Refresh.

## Warum ich es behalte

Tabulare Foundation Models und Explainability sind ein großer Teil meiner Forschung, und Spielfeld ist die vergnügliche Variante derselben Fragen. Ein Tipp, den man nicht hinterfragen kann, ist nur ein weiterer Typ mit einer Meinung. Ein Tipp, den man auf dem Platz öffnen, einen Mittelfeldspieler einwechseln und dabei zusehen kann, wie sich die Begründung verschiebt — den ziehe ich mir Freitagabend wirklich rein.

→ Live: [spielfeld.vercel.app](https://spielfeld.vercel.app)  
→ Code: [github.com/Prgrmmrjns/spielfeld](https://github.com/Prgrmmrjns/spielfeld)

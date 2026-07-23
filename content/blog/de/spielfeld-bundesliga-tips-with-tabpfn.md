---
title: Spielfeld — ein Bundesliga-Tipper, der sich erklären muss
excerpt: TabPFN berechnet die Wahrscheinlichkeiten. Auf dem 11-gegen-11-Board kann ich prüfen, was Aufstellungen, Form und einzelne Matchups mit einem Tipp machen.
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

**Freiburg gegen Bremen: 53 Prozent Heimsieg, 26 Prozent Remis, 21 Prozent Auswärtssieg.**

Mit so einer Zeile könnte ein Fußball-Tipper fertig sein. Für mich fangen dort erst die Fragen an: Woher kommen die 53 Prozent? Welche Startelf nimmt das Modell an? Was passiert, wenn ein wichtiger Mittelfeldspieler ausfällt?

[Spielfeld](https://spielfeld.vercel.app) ist mein Versuch, diese Fragen direkt neben dem Tipp zu beantworten. Die App sagt den nächsten Bundesliga-Spieltag mit [TabPFN](https://priorlabs.ai/) voraus. Zu jeder Partie gibt es ein 11-gegen-11-Board, austauschbare Spieler und eine Erklärung der Faktoren, die das Ergebnis nach oben oder unten ziehen.

![Spieltagsübersicht mit Mini-Pitch-XIs und Heim-/Remis-/Auswärts-Wahrscheinlichkeiten](/spielfeld-matchday.webp)

Die Übersicht ist schon mehr als eine Tippliste. Jede Karte zeigt die angenommene Formation auf einem Mini-Pitch, den Tipp mit seiner Leaning-Wahrscheinlichkeit und die vollen H-/D-/A-Balken. Interessant wird es erst, wenn man eine Partie öffnet.

## Angefangen hat es mit der WM

Der erste Prototyp entstand für einen World-Cup-K.-o.-Wettbewerb von Prior Labs. Vollständige Aufstellungen waren damals oft nicht verfügbar. Meine Pipeline musste deshalb mit Kaderwerten und Mannschaftsdaten arbeiten, wenn Spielerinformationen fehlten. Am Ende landete sie auf Platz 7.

Nach dem Wettbewerb wollte ich wissen, ob aus dem Notebook ein Produkt werden kann, das ich selbst an einem Bundesliga-Freitag öffnen würde. Nicht noch eine Liste vermeintlich sicherer Tipps, sondern ein kleines Labor, in dem jede Annahme sichtbar und veränderbar ist.

In dieser Zeit hatte ich mir die Hand gebrochen. Viel von der Oberfläche entstand deshalb mit Cursor und ziemlich viel Sprachsteuerung. Der ungewöhnliche Entwicklungsprozess hat dem Projekt sogar geholfen: Statt lange an einzelnen Komponenten zu feilen, habe ich mich auf den Ablauf konzentriert — Spiel auswählen, Aufstellung ansehen, Spieler tauschen, Erklärung lesen.

## Von einer Partie zu drei Wahrscheinlichkeiten

Für TabPFN ist Freiburg gegen Bremen zunächst nur eine Tabellenzeile. Diese Zeile entsteht in vier Schritten.

### 1. Vergangene Spiele

Die Resultate kommen von [OpenLigaDB](https://www.openligadb.de/). Verwendet werden abgeschlossene Bundesliga-Partien seit 2019/20. Aus ihnen berechnet Spielfeld unter anderem:

- ELO-Werte mit Heimvorteil
- Form über die letzten fünf und zehn Spiele
- zuletzt erzielte und kassierte Tore
- direkte Duelle und Ruhetage
- geschätzte Kaderwerte

Das sind keine spektakulären Daten. Gerade deshalb eignen sie sich gut, um zu prüfen, was ein modernes Tabellenmodell aus einer überschaubaren Historie herausholen kann.

### 2. Die erwartete Startelf

Die Aufstellung ist nicht bloß eine Grafik. Sie wird Teil derselben Feature-Zeile. Spielfeld nutzt zuerst bestätigte Aufstellungen von API-Football. Sind die noch nicht veröffentlicht, nimmt die App die letzte eingesetzte Elf oder schätzt eine Mannschaft aus aktuellen Kaderlisten.

Aus den elf Spielern entstehen Werte für Torwart, Abwehr, Mittelfeld und Angriff. Hinzu kommen Matchups wie Heimangriff gegen Auswärtsabwehr sowie der Abstand zwischen den stärksten Spielern beider Teams.

Im Beispiel ist Freiburg beim ELO klar vorne (`+214,5`) und hat die bessere jüngste Form (`+0,6` Punkte pro Spiel). Bremens geschätzte Elf ist dagegen minimal stärker (`+0,49`). Das Modell muss diese widersprüchlichen Signale zusammenführen.

### 3. TabPFN

TabPFN ist ein Foundation Model für tabellarische Daten. Anders als ein klassischer Gradient-Boosting-Workflow braucht es hier keine lange Suche nach Baumtiefe, Lernrate und Hunderten weiteren Modellvarianten. Das Modell wurde vorab auf vielen künstlich erzeugten Tabellenproblemen trainiert und bringt dadurch bereits ein starkes Vorwissen darüber mit, wie kleine und mittlere Datensätze aussehen können.

Spielfeld übergibt die historischen Spiele samt Zielklasse — Heim, Remis oder Auswärts — und die Feature-Zeile der neuen Partie. Zurück kommen drei Wahrscheinlichkeiten, deren Summe 100 Prozent ergibt.

> 53 Prozent Heimsieg bedeutet nicht „Freiburg gewinnt“. Es bedeutet: Unter den Annahmen des Modells ist der Heimsieg das wahrscheinlichste von drei Ergebnissen — aber fast jedes zweite Mal würde etwas anderes passieren.

### 4. FastAPI serviert das Ergebnis

`predict.py` erzeugt die Vorhersagen und Erklärungen im Voraus. Die FastAPI-App muss auf Vercel deshalb kein großes Modell pro Seitenaufruf laden. Sie liefert eine kleine JSON-Datei aus und aktualisiert die Aufstellungen über einen täglichen Job.

![Vom Bundesliga-Spiel über Features und TabPFN bis zum interaktiven Spielfeld-Lab](/spielfeld-model-pipeline.svg)

## Das Aufstellungs-Lab

Im Match-Detail liegt die Vorhersage direkt neben dem Spielfeld. Ich kann einen Starter mit zwei Taps austauschen oder per **Best XI** die stärkste verfügbare Mannschaft setzen. Die Wahrscheinlichkeitsbalken aktualisieren sich sofort, und ein kurzes Log zeigt, welche Spieler gewechselt haben und wie stark sich die XI-Stärke verändert hat.

![Bayern gegen Stuttgart nach Best XI: Olise, Gnabry und Díaz kommen rein, Heimtipp auf 77% (+0,3pp)](/spielfeld-lineup-lab.webp)

Im Bayern–Stuttgart-Beispiel oben hat Best XI Goretzka, Bischof und Laimer gegen Olise, Gnabry und Díaz getauscht. Die XI-Stärke stieg um etwa `+2,17`, der Heimtipp um `+0,3` Prozentpunkte. Die Verschiebung wirkt klein — und genau das ist nützlich. In einer frühen Saison und bei einem klaren Favoriten sollten viele Aufstellungs-Tweaks den Tipp nicht umwerfen.

Genau diese Rückkopplung war das Ziel des Projekts. Ein Tipp wird nicht glaubwürdiger, weil daneben „AI“ steht. Er wird brauchbarer, wenn seine Annahmen offenliegen und ich ausprobieren kann, welche davon entscheidend sind.

Das Lab rechnet dabei bewusst nicht das gesamte Modell nach jedem Klick neu. Es verwendet eine lokale Sensitivitätsnäherung. Das macht die Interaktion schnell, begrenzt aber auch die Interpretation: Große oder unrealistische Umbauten sollte man nicht wie eine neue, vollständig trainierte Vorhersage lesen.

## Was erklärt ShapIQ?

Eine Wahrscheinlichkeit allein verrät nicht, wie das Modell zu ihr gekommen ist. Der ShapIQ-Tab startet bei der durchschnittlichen Modellvorhersage und läuft Feature für Feature bis zum Tipp dieser Partie:

![ShapIQ-Lab für Bayern gegen Stuttgart mit Match-Treibern, Spielerbeiträgen, Linien-Interaktionen und dem Spieltag-What-if-Regler](/spielfeld-shapiq-lab.webp)

In dieser Partie dominieren Kaderwert- und ELO-Abstand. Darunter wird dasselbe Budget auf Spieler und Linie-gegen-Linie-Matchups wie Bayern-Abwehr gegen Stuttgart-Angriff aufgeteilt. Rechts lässt der Spieltag-What-if-Regler die Heim-XI-Qualität über die ganze Runde schieben — und alle Tipps reagieren mit.

Ein sauberer Einzel-Waterfall von Freiburg gegen Bremen zeigt dieselbe Idee ohne die umgebende UI:

![ShapIQ-Waterfall für Freiburg gegen Bremen: von der Basisrate zur Heimsieg-Wahrscheinlichkeit von 0,53](/spielfeld-shapiq-waterfall.png)

[ShapIQ](https://github.com/mmschlk/shapiq) geht noch einen Schritt weiter als gewöhnliche Einzel-Attributionen: Es kann Interaktionen betrachten. Im Fußball ist das sinnvoll, weil die Stärke eines Angreifers nicht unabhängig von der gegnerischen Abwehr ist. Im Lab bündele ich diese Effekte in drei Ansichten:

- **Match-Treiber:** Form, ELO, Kaderwert, direkte Duelle und weitere Teamwerte
- **Spieler:** der Anteil der aktuellen Elf an den XI-basierten Beiträgen
- **Linie gegen Linie:** Angriff gegen Abwehr, Mittelfeld gegen Mittelfeld und Star-Spieler

Wichtig ist die Grenze: Die Spieler- und Linienansichten sind aus der aktuellen Elf und dem Erklärungsbudget abgeleitete What-if-Attributionen. Sie sind keine kausale Aussage darüber, wie viele Prozentpunkte ein echter Transfer oder eine Verletzung kosten würde.

## Von Erklärungen zu interventionalen Audits

Eine Erklärung schaut rückwärts: *Warum gab das Modell für diese Eingabe 53 Prozent aus?* Ein interventionaler Audit stellt eine andere Frage: *Wie reagiert das Modell, wenn ich einen Faktor gezielt verändere und den übrigen Kontext festhalte?*

Im einfachsten Fall wählt man eine Größe — in Spielfeld etwa die Stärke des Heim-Mittelfelds — und führt sie durch einen plausiblen Wertebereich. Für jeden Schritt wird die Vorhersage erneut ausgewertet. Die entstehende Kurve zeigt nicht nur einen einzelnen What-if-Punkt, sondern das Verhalten des Modells:

- Steigt die Heimsieg-Wahrscheinlichkeit überhaupt mit einem stärkeren Mittelfeld?
- Verläuft die Reaktion glatt oder gibt es unerwartete Sprünge?
- Sättigt der Effekt irgendwann?
- Verhält sich das Modell bei ähnlichen Partien konsistent?

Solche Tests sind näher an Softwaretests als an einer hübschen Erklärungsgrafik. Sie prüfen eine erwartete Eigenschaft über viele gezielte Anfragen. Das Paper [*XAudit: A Theoretical Look at Auditing with Explanations*](https://arxiv.org/abs/2206.04740) formalisiert genau diese Verbindung: Lokale Erklärungen und besonders Counterfactuals können Audits auf Feature-Sensitivität deutlich effizienter machen.

Spielfeld enthält mit dem Spieltag-What-if-Regler bereits eine einfache Form dieses Audits: Er variiert den XI-Qualitätsvorsprung und zeigt, wie alle Partien reagieren. Trotzdem nenne ich das bewusst **interventional**, nicht **kausal**. Wenn ich nur einen abgeleiteten XI-Wert ändere, können unrealistische Kombinationen entstehen — etwa ein stärkeres Mittelfeld bei unveränderten Spieler-, Angriffs- und Kaderwerten.

Für eine echte kausale Aussage bräuchte ich ein Strukturmodell darüber, welche Variablen voneinander abhängen, und müsste die Intervention entlang dieser Struktur weitergeben. [*Causal Shapley Values*](https://proceedings.neurips.cc/paper/2020/file/32e54441e6382a7fbacbbbaf3c450059-Paper.pdf) zeigt, wie Pearl’s *do*-Kalkül in Shapley-Erklärungen einfließen kann. Das ist die langfristig spannendere Richtung: nicht nur erklären, welche Features mit dem Tipp zusammenhängen, sondern systematisch testen, ob das Modell unter sinnvollen Eingriffen plausibel reagiert.

## Was Spielfeld nicht weiß

Fußball bleibt ein undankbares Vorhersageproblem. Das Modell kennt keine Kabinenstimmung, erfasst taktische Wechsel nur indirekt und weiß bei einer geschätzten Elf nicht sicher, wer am Samstag tatsächlich beginnt. Frühe Saisonspiele sind zusätzlich schwierig, weil aktuelle Form und neue Kader noch wenig beobachtbare Geschichte haben.

Deshalb zeigt Spielfeld Wahrscheinlichkeiten statt Gewissheiten — und die Datenquelle jeder Aufstellung gleich mit an. Die Unsicherheit verschwindet dadurch nicht. Sie wird nur schwerer zu übersehen.

## Was als Nächstes kommt

Ich möchte die Vorhersagen über die Saison archivieren und nicht nur den nächsten Spieltag zeigen. Dann lässt sich sauber messen, wie gut die Wahrscheinlichkeiten kalibriert sind, welche Aufstellungsquellen am zuverlässigsten waren und ob die Erklärungen im Rückblick plausibel bleiben.

Bis dahin ist Spielfeld vor allem das Werkzeug, das ich selbst wollte: Freitagabend eine Partie öffnen, über die 53 Prozent streiten und genau sehen können, worüber ich eigentlich streite.

- [Spielfeld ausprobieren](https://spielfeld.vercel.app)
- [Quellcode auf GitHub](https://github.com/Prgrmmrjns/spielfeld)

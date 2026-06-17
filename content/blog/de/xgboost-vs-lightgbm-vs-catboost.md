---
title: XGBoost vs LightGBM vs CatBoost — Welches Modell sollten Sie wählen?
excerpt: Wie Gradient Boosting funktioniert, was XGBoost, LightGBM und CatBoost jeweils innoviert haben — Histogramme, monotone Constraints, GPUs und ein Entscheidungsbaum zur Eingrenzung der Wahl.
date: "2026-06-17"
locale: de
slug: xgboost-vs-lightgbm-vs-catboost
topics:
  - machine-learning
  - ai
  - gradient-boosting
tags:
  - Machine Learning
  - KI
  - Gradient Boosting
---

Wenn Sie mit strukturierten, tabellarischen Daten arbeiten — Patientenakten, Klick-Logs, Sensormessungen, Tabellen mit Zeilen und Spalten — sind Sie vermutlich irgendwann auf Gradient Boosting gestoßen. Über lange Zeit in der Kaggle-Geschichte und in der angewandten Machine-Learning-Praxis lautete die Frage nicht, ob man boosten soll, sondern welche Bibliothek man nutzt: [XGBoost](https://xgboost.readthedocs.io/en/stable/index.html), [LightGBM](https://lightgbm.readthedocs.io/en/stable/) oder [CatBoost](https://catboost.ai/).

Alle drei implementieren dieselbe große Algorithmenfamilie. Sie wachsen Ensembles von Entscheidungsbäumen, einen nach dem anderen — jeder Baum wird darauf trainiert, die Fehler aller vorherigen zu korrigieren. Was sie unterscheidet, ist die Technik: wie jeder Baum wächst, wie nach Splits gesucht wird und wie sie mit den unordentlichen Details realer Datensätze umgehen — fehlende Werte, seltene Kategorien, Millionen von Zeilen, GPUs auf dem Schreibtisch und Regulierer, die darauf bestehen, dass Risikoscores sich vernünftig verhalten.

## Entscheidungsbäume als atomare Einheit

Ein Entscheidungsbaum ist das einfachste lesbare Modell im Machine Learning. Er stellt eine Folge von Fragen zu den Features — ist das Alter über 40, ist die Region gleich „Nord", ist der Blutzucker über 140 — und leitet jedes Beispiel einen Pfad entlang, bis es in einem Blatt landet, das eine Vorhersage enthält. Die Struktur lässt sich leicht visualisieren und ist für sich genommen leicht zu überinterpretieren.

![Beispieldiagramm eines Entscheidungsbaums mit Wurzelknoten, inneren Knoten und Blattknoten](/decision_tree_example.png)

Ein einzelner tiefer Baum merkt sich Rauschen. Deshalb verlässt sich Boosting nie auf einen großen Baum. Stattdessen nutzt es viele **flache** Bäume als **schwache Lerner**: Modelle, die nur geringfügig besser als Raten sind, aber günstig zu fitten und leicht zu kombinieren. Gradient Boosting fügt Hunderte oder Tausende dieser kleinen Bäume zu einem starken Prädiktor zusammen. Die Kunst liegt nicht in einem einzelnen Baum, sondern in der Sequenz.

## Was Gradient Boosting unter der Haube macht

Der Name klingt einschüchternd, aber die Logik ist iterative Korrektur. Man beginnt mit einer groben Vorhersage — dem Mittelwert des Ziels bei Regression oder den Log-Odds der positiven Klasse bei Klassifikation. Diese erste Schätzung ist strukturiert falsch: Sie überschätzt bei manchen Patientinnen und Patienten, unterschätzt bei anderen. Gradient Boosting misst diesen Fehler.

Bei quadratischem Fehler ist der Fehler einfach der Residual: Istwert minus Vorhersage. Allgemeiner betrachtet Boosting bei jeder differenzierbaren Verlustfunktion den **negativen Gradienten** des Verlusts bezüglich der aktuellen Vorhersage. Dieser Gradient sagt, in welche Richtung sich jedes Trainingsbeispiel bewegen möchte. Der nächste Baum wird darauf trainiert, diese Pseudo-Residuals vorherzusagen. Wenn man diesen Baum zum Ensemble hinzufügt — skaliert mit einer kleinen **Learning Rate**, damit jeder Schritt vorsichtig bleibt — bewegt sich das kombinierte Modell in die Richtung, die den Verlust reduziert.

![Flussdiagramm des Gradient-Boosting-Algorithmus](/gradient_boosting_algorithm.png)

Dann wiederholt man. Das Ensemble nach zwei Bäumen hat noch Fehler; Baum drei zielt auf das ab, was Baum eins und zwei verpasst haben. Nach hundert Bäumen haben die Korrekturen eine flexible Oberfläche geformt, die nichtlineare Zusammenhänge und Feature-Interaktionen erfassen kann, ohne dass man sie von Hand spezifizieren muss.

Zwei Stabilisatoren tauchen in fast jeder produktionsreifen Implementierung auf. **Shrinkage** (die Learning Rate) tauscht Konvergenzgeschwindigkeit gegen Generalisierung: Eine kleinere Rate bedeutet mehr Bäume, aber jeder Baum richtet weniger Schaden an, wenn er lokal überfittet. **Stochastisches Boosting** — jeden Baum auf einer zufälligen Teilmenge von Zeilen und/oder Spalten zu bauen — injiziert Zufall wie Bagging bei Random Forests, und es verbessert oft sowohl Geschwindigkeit als auch Robustheit.

Diese Pipeline ist der gemeinsame Motor. XGBoost, LightGBM und CatBoost unterscheiden sich darin, wie sie die Split-Suche approximieren, die Baumtopologie wachsen lassen, Kategorien kodieren, GPUs nutzen und Domänenlogik erzwingen — nicht in der übergeordneten Idee des Gradientenabstiegs im Funktionsraum. Die folgenden Abschnitte gehen jede Bibliothek der Reihe nach durch und zeigen, wo diese technischen Entscheidungen gelandet sind.

## XGBoost: Regularisierung, Constraints und der Produktions-Standard

Als XGBoost 2016 erschien, existierte Gradient Boosting bereits. Was XGBoost beisteuerte, war eine Implementierung, die auf Wettbewerbe und Produktion zugeschnitten war: schnell genug für ernsthafte Hardware, mit klarer Meinung zu Regularisierung und sorgfältig bei Randfällen wie fehlenden Daten.

Die zentrale Designentscheidung ist ein **regularisiertes Ziel**. Statt nur den Vorhersagefehler zu minimieren, bestraft XGBoost komplexe Blattgewichte mit L1- und L2-Termen, die direkt ins Ziel eingebaut sind. Komplexität ist Teil dessen, was der Optimierer bei jedem Split sieht — nicht nur etwas, das man nachträglich mit Pruning behebt. XGBoost nutzt eine **Taylor-Approximation zweiter Ordnung** beim Bewerten von Splits — Gradient plus **Hessian** — sodass jeder Baumschritt eine schärfere lokale Bewegung ist als reines Boosting erster Ordnung.

**Histogramm-basierte Split-Suche** ist XGBoosts Ansatz zur Gradientenquantisierung. Statt jeden eindeutigen Wert jedes Features zu scannen, fasst XGBoost kontinuierliche Spalten in eine feste Anzahl von Histogramm-Buckets zusammen (`max_bin`, Standard 256) und sucht Split-Punkte an Bin-Grenzen. Pro Bin werden die Summen der Gradienten und Hessians der darin fallenden Beispiele akkumuliert; Kandidaten-Splits werden bewertet, indem linke und rechte Histogramm-Summen kombiniert werden. Die Split-Suche sinkt von sortierlastiger Arbeit über Millionen eindeutiger Werte zu leichten Scans über wenige hundert Bins — bessere Cache-Lokalität, weniger Speicherverkehr und ein Pfad zu parallelem und verteiltem Training über Column Blocking. Zu wenige Bins glätten feine Strukturen weg; zu viele Bins nähern sich wieder den Kosten exakter Suche.

Fehlende Werte werden mit gelernten Standard-Richtungen pro Split behandelt, sodass man keinen separaten Imputationsschritt für den Baubau braucht.

**Monotone Constraints** sind eine XGBoost-Stärke, wenn das Modell für Menschen Sinn ergeben muss, nicht nur den Verlust minimieren soll. In Medizin, Kreditwesen oder Versicherung fragen Stakeholder oft, ob ein Score *sinken* kann, wenn der Schweregrad *steigt*. Man deklariert, welche Features in Bezug auf die Vorhersage nicht abnehmend oder nicht zunehmend sein dürfen; die Split-Suche verwirft Kandidaten, die die Constraint entlang eines Zweigs verletzen würden. Das zusammengesetzte Ensemble respektiert weiterhin diese globalen Formbeschränkungen — wichtig, wenn Modelle auditiert oder Klinikerinnen und Klinikern erklärt werden. **Interaction Constraints** gehen weiter: Man kann einschränken, welche Features zusammen splitten dürfen, und so strukturelles Domänenwissen kodieren, das naive Bäume ignorieren würden. Monotonie ist nicht kostenlos — constrained Modelle opfern auf verrauschten Realdaten vielleicht etwas Fit —, aber Deployability zählt oft mehr als ein marginaler AUC-Punkt.

**GPU-Training** kam als natürliche Erweiterung der Histogramm-Engine. Die `gpu_hist`-Tree-Methode (und ihre Nachfolger in neueren Versionen) baut Histogramme auf dem Device und evaluiert Splits parallel über Features. Für viele Workloads ist es ein Drop-in-Ersatz für CPU-`hist` mit derselben API. GPU-Training lohnt sich, wenn Zeilen- und Feature-Anzahl groß genug sind, um Host-Device-Transfer zu amortisieren; bei winzigen Tabellen kann der CPU-Pfad noch gewinnen.

XGBoost wurde der sichere Standard für viele Teams: umfangreiche Dokumentation, lange Produktionshistorie und eine Community, die Ihre obskure Stack-Overflow-Frage schon beantwortet hat.

## LightGBM: Leaf-wise-Wachstum, GOSS und Geschwindigkeit im großen Maßstab

LightGBM, 2017 von Microsoft Research veröffentlicht, fragt, ob Bäume effizienter wachsen können bei gleichbleibender Genauigkeit — und ob Gradientenstatistiken auf weniger Daten berechnet werden können, ohne viel Signal zu verlieren.

**Leaf-wise**- (best-first-) Wachstum ist LightGBMs charakteristische Topologie-Entscheidung. Statt alle Blätter auf einer Tiefenebene zu expandieren, bevor man tiefer geht, splittet es immer das Blatt, das den Verlust am stärksten reduziert. Das erzeugt tiefe, asymmetrische Bäume, die oft mit weniger Knoten gute Genauigkeit erreichen — auf Kosten des Overfitting-Risikos auf kleinen Datensätzen, wenn die Tiefe unkontrolliert bleibt. Ein sinnvoller `max_depth`-Bereich (oft 3–5) zähmt die leaf-wise-Begeisterung.

**Gradient-based One-Side Sampling (GOSS)** ist LightGBMs charakteristischer Twist bei der Gradientenquantisierung. Histogramm-Split-Suche fasst Features weiterhin in Bins zusammen (`max_bin`, Standard 255) und akkumuliert Gradientenstatistiken pro Bin — dieselbe Quantisierungsidee wie bei XGBoost. GOSS legt sich darüber: Alle Beispiele mit großen Gradienten (schwere Fälle, die das Modell noch falsch hat) bleiben erhalten, während leichte, niedrig-gradientige Zeilen zufällig subsampelt werden, bevor Histogramme gebaut werden. Die Berechnung konzentriert sich dort, wo die Verlustfläche am steilsten ist. **Exclusive Feature Bundling (EFB)** bündelt spärliche, sich gegenseitig ausschließende Features, um die effektive Dimensionalität zu verringern. Zusammen machen diese Tricks LightGBM routinemäßig zur schnellsten Option bei millionenzeiligen numerischen Workloads.

**Monotone Constraints** werden auch in LightGBM nativ unterstützt: Man übergibt einen Vektor zunehmender, abnehmender oder unconstrained Features, und ungültige Splits werden während der Suche entfernt. Die Ergonomie unterscheidet sich leicht von XGBoost, aber der Use Case ist derselbe — Modelle, die sinnvolle Zusammenhänge für regulatorische oder klinische Gründe nicht invertieren dürfen.

**GPU-Beschleunigung** kommt je nach Build über CUDA- oder OpenCL-Backends. Dieselbe leaf-wise-Logik und GOSS laufen auf dem Device; der Gewinn ist roher Durchsatz, wenn CPU-Training „schnell genug, um nervig zu sein" ist und eine GPU untätig herumsteht. LightGBM ist oft meine erste Empfehlung für numerisch schwere tabellarische Arbeit im großen Maßstab.

## CatBoost: geordnete Kategorien, symmetrische Bäume und GPU-native Architektur

CatBoost von Yandex optimiert für **kategoriale Features** ohne die üblichen Encoding-Fallen — und baut einen Training-Stack, in dem GPU-Ausführung Teil des Kerndesigns ist, kein nachträglicher Anbau.

**Ordered Target Statistics** kodieren Kategorien nur mit vorherigen Zeilen in einer zufälligen Permutation und reduzieren Target Leakage im Vergleich zu naivem Mean Encoding auf dem gesamten Trainingsset. **Ordered Boosting** adressiert Prediction Shift zwischen Training und Inferenz — eine subtile Verzerrung, die Offline-Metriken aufblähen kann, wenn Target-Statistiken Informationen leaken. Das ist CatBoosts Antwort auf die Frage: „Wie nutze ich hochkardinale Spalten, ohne eine fragile Preprocessing-Pipeline zu bauen?"

**Symmetrische (oblivious) Bäume** verwenden dieselbe Split-Bedingung über eine ganze Tiefenebene. Jeder Knoten auf Ebene *k* testet denselben Feature-Schwellenwert; nur das Routing unterscheidet sich. Diese Constraint vereinfacht Inferenz, reduziert die kombinatorische Explosion der Split-Suche und passt natürlich zu **GPU-Histogramm-Kernels**: Features werden in Bins quantisiert, Gradientenstatistiken pro Bin auf CUDA akkumuliert, und Split-Evaluation läuft parallel über die symmetrische Struktur. Bei kategorie-lastigen Daten bleiben Encoding und Baubau integriert — der „`task_type=GPU` setzen und nach Hause gehen"-Workflow ist ausgereift. Bei rein numerischen Daten ist CatBoost oft langsamer als LightGBM; der GPU-Pfad hilft trotzdem, aber die Sweet Spot der Bibliothek sind unordentliche Business-Tabellen mit IDs, Regionen und Produktcodes.

**Monotone Constraints** sind bei CatBoost nicht in dem Maße First-Class-Feature wie bei XGBoost oder LightGBM. Wenn harte Monotonie eine Deployment-Anforderung ist — kein Nice-to-have — ist CatBoost meist nicht die erste Bibliothek, die man greift. CatBoost tauscht diese Flexibilität gegen kategoriale Robustheit und starke Out-of-the-box-Defaults; Tuning der Tiefe ist auf denselben unordentlichen Daten oft weniger schmerzhaft als bei leaf-wise-Konkurrenten.

## Auf einen Blick

| | XGBoost | LightGBM | CatBoost |
| --- | --- | --- | --- |
| **Baumwachstum** | Level-wise | Leaf-wise (best-first) | Symmetrisch / oblivious |
| **Kategoriale Features** | Native Unterstützung; Encoding weiterhin üblich | `categorical_feature`-Unterstützung | Ordered Target Encoding |
| **Monotone Constraints** | Ja | Ja | Eingeschränkt |
| **GPU-Training** | CUDA-Histogramm (`gpu_hist`) | CUDA / OpenCL | CUDA (integrierter Pfad) |
| **Große numerische Daten** | Gut | Meist am schnellsten | Langsamer |
| **Viele Kategorien** | Hängt vom Encoding ab | Hängt vom Encoding ab | Oft insgesamt am schnellsten |
| **Beste Passung** | Constraints, Produktions-Standard | Skalierung, numerisch schwere Workloads | Hochkardinale Kategorien |
| **Hauptcaveat** | Langsamer als LightGBM im großen Maßstab | Overfitting auf kleinen Daten bei unkontrollierter Tiefe | Schwache Monotonie-Unterstützung |

Diese Zeilen fassen zusammen, wohin jede Bibliothek Komplexität investiert hat — die Abschnitte oben erklären das Wie und Warum.

## Welches sollten Sie wählen?

Bei Millionen von Zeilen, überwiegend numerischen Features und wenn Trainingszeit Ihre Iterationsschleife dominiert, sind LightGBMs Sampling und leaf-wise-Wachstum schwer zu schlagen — besonders auf der GPU. Wenn Ihre Spalten voller Kategorien sind und Sie müde sind, fragile Encoding-Pipelines zu bauen, sind CatBoosts geordnete Statistiken der Sinn der Bibliothek. Wenn Sie monotone Constraints, Interaktionskontrolle oder einen konservativen Produktions-Standard mit dem größten Community-Schatz brauchen, bleibt XGBoost der rationale Anker.

In der Praxis probiere ich trotzdem mehr als eines. Hyperparameter-Tuning verengt Genauigkeitslücken, aber Preprocessing-Aufwand, Constraint-Unterstützung und reine Trainingszeit lügen nicht.

## Noch unsicher? Nutzen Sie den Entscheidungsbaum.

Der interaktive Ablauf unten führt durch Datensatzgröße, Feature-Typen und Constraint-Anforderungen und schlägt eine Startbibliothek vor. Betrachten Sie ihn als Abkürzung zur Vergleichstabelle — und validieren Sie dann auf Ihren eigenen Daten.

::BoostingModelPicker
::

Gradient Boosting funktioniert, weil es ein schweres Vorhersageproblem in eine Sequenz kleiner, interpretierbarer Korrekturen zerlegt. XGBoost machte diese Sequenz regularisiert und deploybar, LightGBM machte sie im großen Maßstab schnell, und CatBoost machte Kategorien nativ. Die richtige Bibliothek passt zur Form Ihrer Daten, Ihrer Hardware und Ihrer Compliance-Checkliste — nicht zu der, die ein einzelnes öffentliches Leaderboard anführte.

## Was ist Ihr Go-to-Modell?

::BlogSurveyMlModel
::

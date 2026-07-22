---
title: Cursidian — Cursor × Obsidian für ein LLM-gepflegtes Forschungs-Wiki
excerpt: Ich habe das Vault-Muster, mit dem ich wissenschaftlich arbeite, open-sourced — unveränderliche Quellen, kompilierte Notizen, Cursor-Agent-Skills und Brücken in Code-Repos.
date: "2026-07-22"
locale: de
slug: cursidian-cursor-obsidian-llm-wiki
topics:
  - llms
  - research
  - personal
  - ai
tags:
  - LLMs
  - Research
  - Personal
  - AI
---

Seit Monaten läuft meine Forschung durch einen persönlichen Knowledge Vault: Papers landen als unveränderliche PDFs, Agents kompilieren Notizen zu verlinkten Concept-Seiten, und Obsidian bleibt der Ort für Graph, Journal und Tasks. Das Muster hat sich bewährt — deshalb habe ich es für andere verpackt.

**[Cursidian](https://github.com/Prgrmmrjns/cursidian)** ist dieses Paket — ein Open-Source-Template, das [Cursor](https://cursor.com)-Agents mit einem [Obsidian](https://obsidian.md)-Vault verbindet. Es folgt Karpathys [LLM-Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)-Idee und [OKF](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)-Frontmatter: Agents pflegen das Wiki; Sie lesen und entscheiden.

## Das Problem

Wissenschaftliche Arbeit zerfällt über zu viele Oberflächen. PDFs stapeln sich ungelesen. Gute Antworten sterben in Chat-Historien. Experiment-Code liegt in einem Ordner, Manuskript-Notizen in einem anderen — und keine Seite kennt die Konzepte der anderen. Am Abend ist „Was habe ich geliefert?“ oft eine Schätzung.

Cursidian behandelt den Vault als Source of Truth und gibt Agents wiederholbare Jobs statt einmaliger Prompts.

## Wie die Teile zusammenspielen

| Schicht | Wer | Rolle |
|---------|-----|-------|
| `raw/` | Sie | Quellen ablegen; als read-only behandeln |
| Wiki-Seiten | Agent | Kompilieren, verlinken, aktualisieren, linten |
| Obsidian | Sie | Graph, Journal, Tasks |
| Cursor-Skills | Agent | Ingest, Query, Progress, Cadence |

```
raw/          → unveränderliche Quellen (PDFs, HTML) — nie editieren
Concepts/     → flache Ideen-Seiten (Tags, keine Ordner)
Papers/       → kompilierte Notizen (nicht das PDF)
Projects/     → Projekt-Synthese + Pfad zu Code-Repos
Queries/      → abgelegte Antworten, die bleiben sollen
Journal/      → tägliche / wöchentliche Cadence
.cursor/      → Rules + Agent-Skills
```

![Cursidian wissenschaftlicher Workflow — Literatur, Fragen, Experimente, Cadence](/cursidian-scientific-workflow.png)

## Alltagsschleife

1. PDF in `raw/` legen und Cursor mit `wiki-ingest` ingestieren lassen — herauskommen `Papers/`-Notiz, aktualisierte Concepts und ein `log.md`-Eintrag.
2. Forschungsfrage mit `wiki-query` / `kb-lookup` stellen — Antworten landen unter `Queries/` statt im Chat zu verschwinden.
3. In einem Satellite-Code-Repo mit installierter Knowledge-Base-Bridge arbeiten — bei Meilensteinen aktualisieren Agents `Projects/<slug>.md` und das Log.
4. Tag mit `kb-session-close` abschließen; Woche mit `kb-weekly-review` Revue passieren lassen.

## Code in denselben Graph bringen

Forschung lebt selten nur im Vault. Bridge in einen Projektordner installieren:

```bash
./Templates/install-kb-bridge.sh MyStudy ~/code/my-study
```

`resource:` auf der passenden `Projects/`-Seite auf diesen Pfad zeigen. Agents im Repo können Concepts nachschlagen und bei Fortschritt zurück in den Vault schreiben. Ein Knowledge Graph; viele Codebases.

## Quick Start

```bash
git clone https://github.com/Prgrmmrjns/cursidian.git
cd cursidian
./scripts/setup.sh
```

Denselben Ordner in Obsidian und Cursor öffnen. Setup legt Beispielseiten an, installiert Python-Deps und baut den Index neu. `--bare` für leere Ordner, `--install-skills` zum Symlinken der Skills nach `~/.cursor/skills`.

## Warum ich es veröffentlicht habe

Ich brauchte ein System, das thesis-skalierte Literatur überlebt, ohne zum Paper-Dump zu werden — und das Code-Experimente ehrlich hält gegenüber dem, was das Wiki schon weiß. Cursidian ist das bereinigte Scaffold dieses Workflows — MIT-lizenziert, zum Klonen bereit.

Wenn Sie es ausprobieren: starten Sie mit einem PDF und einer Projekt-Bridge. Der Graph wird erst nützlich, wenn Agents etwas zu kompilieren haben.

→ [github.com/Prgrmmrjns/cursidian](https://github.com/Prgrmmrjns/cursidian)

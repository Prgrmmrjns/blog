---
title: Cursidian — Cursor × Obsidian for an LLM-Maintained Research Wiki
excerpt: I open-sourced the vault pattern I use for scientific work — immutable sources, compiled notes, Cursor agent skills, and bridges into code repos.
date: "2026-07-22"
locale: en
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

For months I have been running research through a personal knowledge vault: papers land as immutable PDFs, agents compile notes into linked concept pages, and Obsidian stays the place where I browse the graph, journal, and tasks. The pattern worked well enough that I packaged it for others.

**[Cursidian](https://github.com/Prgrmmrjns/cursidian)** is that package — an open-source template that wires [Cursor](https://cursor.com) agents to an [Obsidian](https://obsidian.md) vault. It follows Karpathy’s [LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) idea and [OKF](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md) frontmatter: agents maintain the wiki; you read and decide.

## The problem it solves

Scientific work scatters across too many surfaces. PDFs pile up unread. Good answers die in chat history. Experiment code lives in one folder, manuscript notes in another, and neither side knows the other’s concepts. End-of-day “what did I ship?” is a guess.

Cursidian treats the vault as the source of truth and gives agents repeatable jobs instead of one-off prompting.

## How the pieces fit

| Layer | Who | Role |
|-------|-----|------|
| `raw/` | You | Drop sources; treat as read-only |
| Wiki pages | Agent | Compile, link, update, lint |
| Obsidian | You | Graph, journal, tasks |
| Cursor skills | Agent | Ingest, query, progress, cadence |

```
raw/          → immutable sources (PDFs, HTML) — never edit
Concepts/     → flat idea pages (tags, not folders)
Papers/       → compiled notes (not the PDF)
Projects/     → project synthesis + path to code repos
Queries/      → filed answers worth keeping
Journal/      → daily / weekly cadence
.cursor/      → rules + agent skills
```

![Cursidian scientific workflow — literature, questions, experiments, cadence](/cursidian-scientific-workflow.png)

## Everyday loop

1. Drop a PDF into `raw/` and ask Cursor to ingest it with `wiki-ingest` — you get a `Papers/` note, updated concepts, and a `log.md` entry.
2. Ask a research question with `wiki-query` / `kb-lookup` — answers get filed under `Queries/` instead of vanishing in chat.
3. Work in a satellite code repo with the knowledge-base bridge installed — on milestones, agents update `Projects/<slug>.md` and the log.
4. Close the day with `kb-session-close`; review the week with `kb-weekly-review`.

## Bridge code into the same graph

Research rarely lives only in the vault. Install the bridge into a project folder:

```bash
./Templates/install-kb-bridge.sh MyStudy ~/code/my-study
```

Point `resource:` on the matching `Projects/` page at that path. Agents coding in the repo can look up concepts and, when something lands, write progress back to the vault. One knowledge graph; many codebases.

## Quick start

```bash
git clone https://github.com/Prgrmmrjns/cursidian.git
cd cursidian
./scripts/setup.sh
```

Open the same folder in Obsidian and Cursor. Setup seeds example pages, installs Python deps, and rebuilds the index. Use `--bare` for empty folders only, or `--install-skills` to symlink skills into `~/.cursor/skills`.

## Why I shipped it

I needed a system that survives thesis-scale literature without turning into a paper dump, and that keeps code experiments honest about what the wiki already knows. Cursidian is the sanitized scaffold of that workflow — MIT-licensed, ready to clone.

If you try it, start with one PDF and one project bridge. The graph only gets useful once agents have something to compile.

→ [github.com/Prgrmmrjns/cursidian](https://github.com/Prgrmmrjns/cursidian)

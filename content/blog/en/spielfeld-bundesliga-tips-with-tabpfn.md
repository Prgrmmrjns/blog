---
title: Spielfeld — Bundesliga Tips with TabPFN and ShapIQ
excerpt: How a 7th-place World Cup competition entry turned into a Bundesliga matchday app you can actually argue with — pitch board, player swaps, and honest explanations.
date: "2026-07-23"
locale: en
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

Most football prediction sites hand you a number and expect you to trust it. I never do. So when I built one, I wanted to be able to poke at it: see the odds, move the lineup around, and find out which player or stat was actually behind the tip.

That app is [Spielfeld](https://spielfeld.vercel.app). For every Bundesliga fixture it gives you a tip — home win, draw, or away win — using [Prior Labs' TabPFN](https://priorlabs.ai/), figures out who is likely to start, and then shows its reasoning with ShapIQ. The code is on [GitHub](https://github.com/Prgrmmrjns/spielfeld).

![Spielfeld pitch mark](/spielfeld-icon.svg)

## How it started

Prior Labs ran a competition around the last World Cup: predict the knockout rounds with their TabPFN model. I entered, built a pipeline that fell back on squad value whenever the full lineups weren't available, and finished 7th. Not bad for a first go.

I liked the setup too much to let it die with the tournament, so I aimed it at the Bundesliga for the 2026/27 season. Same model at the core, a league I actually watch, and finally room to build the thing I really wanted: a lineup lab.

A quick confession about the interface. I broke my hand around that time and couldn't type properly for a while, so a lot of the UI got vibe-coded in Cursor. The CSS was never the point anyway. What I cared about was making the tips transparent enough that I'd bother checking them each weekend.

## What a matchday looks like

You land on the fixtures for the next Spieltag, each with a tip and the three probabilities. Click into a match and it opens up:

- an **11v11 pitch board** with the expected starters, which you can swap around
- a **Best XI** button that rebuilds each side from its strongest available players
- a **ShapIQ tab** that breaks the tip down into what pushed it up or down

The point of clicking in is that nothing is fixed. Change the lineup and the probabilities move with it.

## How the tip gets made

The pipeline is fairly plain once you lay it out:

1. Pull match history from [OpenLigaDB](https://www.openligadb.de/) — finished Bundesliga games back to 2019/20.
2. Turn each fixture into features: an ELO rating with home advantage, recent form, goals scored and conceded, head-to-head record, days of rest, a squad-value gap, and a set of lineup features (overall XI strength, the GK/DEF/MID/FWD lines, the star-player edge, and matchups like home attack against away defence).
3. Let TabPFN map those features to home/draw/away probabilities. There's no gradient-boosting fallback anymore; the whole thing runs on TabPFN, so `predict.py` needs the Prior Labs key.
4. Save the predictions to JSON and serve them from a small FastAPI app on Vercel. A daily cron refreshes the lineups, and I can trigger a full retrain from GitHub Actions when I want.

### Getting the lineups right

The starting XI isn't just decoration on the pitch board — it feeds the prediction. So the app tries, in order:

1. confirmed lineups from API-Football when they're published,
2. otherwise the last XI a club actually fielded,
3. and if free data is stale, a squad estimate from Wikipedia and footballsquads.

Whoever is expected to play changes the odds, not just the graphic.

## Explanations, not a shrug

This is the part I care about most. A lot of "explainable" tools stop at a bar chart of feature importances. Spielfeld uses [ShapIQ](https://github.com/mmschlk/shapiq) instead, which can also show how features interact — so you get the team-level drivers, how the XI's quality is spread across individual players, and line-versus-line battles like attack against defence.

![ShapIQ waterfall for Freiburg vs Bremen, ending at a 0.53 home-win probability](/spielfeld-shapiq-waterfall.png)

The waterfall above is straight from the app: it starts at the average home-win rate and walks feature by feature to this match's number. There's also a Spieltag slider that lets you nudge the home-XI quality across the whole round and watch every tip react.

I try to be honest about the limits. The lab swaps use a local approximation, not a fresh retrain on every click. Football is noisy, and injuries, tactics and referees only partly show up in the features. And when nobody has published a lineup yet, my squad estimate can simply be wrong about who starts on Saturday.

## The stack, briefly

```
OpenLigaDB + lineup sources
        ↓
predict.py  (TabPFN + ShapIQ)
        ↓
predictions.json + explanation plots
        ↓
FastAPI on Vercel
```

Everything lives in one Python app: `predict.py` trains the model and writes the plots, `app/main.py` serves the UI and the API, and a couple of GitHub Actions handle deploys and the scheduled refresh.

## Why I keep it around

Tabular foundation models and explainability are a big part of my research, and Spielfeld is the fun version of the same questions. A tip you can't question is just another guy with an opinion. A tip you can open on a pitch, swap a midfielder in, and watch the reasoning shift — that one I'll actually pull up on a Friday night.

→ Live: [spielfeld.vercel.app](https://spielfeld.vercel.app)  
→ Code: [github.com/Prgrmmrjns/spielfeld](https://github.com/Prgrmmrjns/spielfeld)

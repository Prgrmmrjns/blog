# AI in Medicine Paper Club

Weekly YouTube series on new, high-impact, peer-reviewed studies in AI and medicine.

Everything lives under `content/blog/paper-club/`. The agent prepares the reading. You record and speak.

## Weekly pipeline

1. Pick a recent paper, preferably from a high-impact journal (`Nature Medicine`, `NEJM`, `Lancet`, `JAMA`, `Nature`, `BMJ`).
2. Write the English post in `content/blog/en/<slug>.md` (optional German twin in `content/blog/de/`).
3. Write a spoken video script with slide cues.
4. Build a Marp slideshow that includes the study's own figures (with license-compliant attribution).
5. Copy figures, `slides.html`, and `slides.pdf` into `public/paper-club/episodes/<slug>/` so the live post can link them.
6. You record over the slides.

## Render slides

From an episode folder:

```bash
npx --yes @marp-team/marp-cli@4 slides.md \
  --theme-set ../../theme/paper-club.css \
  --html \
  --allow-local-files \
  -o slides.html
```

PDF:

```bash
npx --yes @marp-team/marp-cli@4 slides.md \
  --theme-set ../../theme/paper-club.css \
  --pdf \
  --allow-local-files \
  --pdf-outlines \
  -o slides.pdf
```

Then copy `slides.html`, `slides.pdf`, `figures/`, and `theme/` into the matching `public/paper-club/` paths.

## Episode layout

```
content/blog/paper-club/episodes/NNN-short-slug/
  script.md     # spoken script with slide markers
  slides.md     # Marp source
  slides.html   # rendered deck
  slides.pdf    # 16:9 PDF
  figures/      # study images + SOURCES.md

content/blog/en/<slug>.md   # published post
```

## License rule for figures

Only embed paper figures when the article is open (typically CC BY). Credit the authors, journal, DOI, and license in `figures/SOURCES.md` and on the closing slide.

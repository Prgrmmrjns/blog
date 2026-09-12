# AI in Medicine Paper Club

Weekly YouTube series on new, high-impact, peer-reviewed studies in AI and medicine.

The agent prepares the reading. You record and speak.

## Weekly pipeline

1. Pick a recent paper, preferably from a high-impact journal (`Nature Medicine`, `NEJM`, `Lancet`, `JAMA`, `Nature`, `BMJ`).
2. Write a blog-ready markdown draft. Do **not** copy it into `content/blog/` until you want it live.
3. Write a spoken video script with slide cues.
4. Build a Marp slideshow that includes the study's own figures (with license-compliant attribution).
5. You record over the slides.

## Render slides

From an episode folder:

```bash
npx --yes @marp-team/marp-cli@4 slides.md \
  --theme-set ../../theme/paper-club.css \
  --html \
  --allow-local-files \
  -o slides.html
```

PDF (needs Chrome/Chromium):

```bash
npx --yes @marp-team/marp-cli@4 slides.md \
  --theme-set ../../theme/paper-club.css \
  --pdf \
  --allow-local-files \
  -o slides.pdf
```

Open `slides.html` in a browser. Present with arrow keys. Record your voice over the deck.

## Episode layout

```
paper-club/episodes/NNN-short-slug/
  blog.md       # Nuxt-ready draft (copy to content/blog/en/ to publish)
  script.md     # spoken script with slide markers
  slides.md     # Marp source
  slides.html   # rendered deck
  figures/      # study images + SOURCES.md
```

## Publishing the blog later

Copy `blog.md` to `content/blog/en/<slug>.md`. Add a German translation under `content/blog/de/` if you want both locales. Then deploy as usual.

## License rule for figures

Only embed paper figures when the article is open (typically CC BY). Credit the authors, journal, DOI, and license in `figures/SOURCES.md` and on the closing slide.

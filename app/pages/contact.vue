<script setup lang="ts">
useHead({
  title: "Contact — Jonas Wolber",
  meta: [
    {
      name: "description",
      content:
        "Reach Jonas Wolber for research collaboration, questions about digital medicine and machine learning, or just to say hello.",
    },
  ],
});

const links = [
  {
    href: "https://www.linkedin.com/in/jonas-wolber/",
    label: "LinkedIn",
    desc: "Professional messages & collaboration",
    tag: "Professional",
    accent: "teal",
  },
  {
    href: "https://github.com/Prgrmmrjns",
    label: "GitHub",
    desc: "Code, repos & projects",
    tag: "Code",
    accent: "gold",
  },
  {
    href: "https://www.researchgate.net/profile/Jonas-Wolber-4",
    label: "ResearchGate",
    desc: "Papers & publications",
    tag: "Publications",
    accent: "teal",
  },
  {
    href: "https://www.ukaachen.de/kliniken-institute/institut-fuer-digitale-allgemeinmedizin/ueber-uns/team/jonas-wolber/",
    label: "Uniklinikum RWTH",
    desc: "Official institute profile",
    tag: "Institute",
    accent: "gold",
  },
];
</script>

<template>
  <div class="flex h-[calc(100dvh-4rem)] flex-col overflow-hidden bg-[#f5f3eb] dark:bg-[#0e0e0e]">
    <div class="relative flex min-h-0 flex-1 flex-col px-5 py-5 sm:px-8 sm:py-6 lg:py-8">
      <div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-teal/10 via-transparent to-gold/10" />

      <div class="relative z-10 mx-auto flex min-h-0 w-full max-w-4xl flex-1 flex-col">
        <header class="mb-5 shrink-0 text-center lg:mb-6">
          <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-teal dark:text-mint">Contact</p>
          <h1 class="mt-1 text-3xl font-extrabold text-gray-900 dark:text-cream lg:text-4xl">Let's talk</h1>
          <p class="mx-auto mt-2 max-w-lg text-sm text-gray-600 dark:text-cream/60">
            Research collaboration, paper questions, speaking — pick a channel below.
          </p>
        </header>

        <div class="grid min-h-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <a
            v-for="link in links"
            :key="link.href"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white/90 p-4 shadow-sm transition hover:border-teal/40 hover:shadow-md dark:border-white/10 dark:bg-[#161616]/90 dark:hover:border-mint/30"
          >
            <div
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-base font-bold"
              :class="
                link.accent === 'gold'
                  ? 'bg-gold/15 text-gold'
                  : 'bg-teal/15 text-teal dark:bg-mint/15 dark:text-mint'
              "
            >
              {{ link.label.charAt(0) }}
            </div>
            <div class="min-w-0">
              <div class="flex flex-wrap items-center gap-2">
                <span class="font-semibold text-gray-900 dark:text-cream">{{ link.label }}</span>
                <span
                  class="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide"
                  :class="
                    link.accent === 'gold'
                      ? 'bg-gold/15 text-gold'
                      : 'bg-teal/10 text-teal dark:bg-mint/10 dark:text-mint'
                  "
                >
                  {{ link.tag }}
                </span>
              </div>
              <p class="mt-0.5 text-xs text-gray-600 dark:text-cream/55">{{ link.desc }}</p>
            </div>
            <span
              class="ml-auto shrink-0 text-sm text-teal opacity-0 transition group-hover:opacity-100 dark:text-mint"
              aria-hidden="true"
            >
              ↗
            </span>
          </a>
        </div>

        <p class="mt-5 shrink-0 text-center text-[11px] text-gray-500 dark:text-cream/30">
          Jonas Wolber · Curiosity is all you need.
        </p>
      </div>
    </div>
  </div>
</template>

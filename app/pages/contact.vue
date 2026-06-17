<script setup lang="ts">
const { t, tm } = useLocale();

const hrefs = [
  "https://www.linkedin.com/in/jonas-wolber/",
  "https://github.com/Prgrmmrjns",
  "https://www.researchgate.net/profile/Jonas-Wolber-4",
  "https://www.ukaachen.de/kliniken-institute/institut-fuer-digitale-allgemeinmedizin/ueber-uns/team/jonas-wolber/",
];

const icons = ["/icons/linkedin.png", "/icons/github.png", "/icons/researchgate.png", "/icons/rwth.png"];
const accents = ["teal", "gold", "teal", "gold"] as const;

const links = computed(() => {
  const items = tm<{ label: string; desc: string; tag: string }[]>("contact.links");
  return items.map((item, index) => ({
    ...item,
    href: hrefs[index],
    icon: icons[index],
    accent: accents[index],
  }));
});

useHead(() => ({
  title: t("contact.title"),
  meta: [{ name: "description", content: t("contact.metaDescription") }],
}));
</script>

<template>
  <div class="min-h-[calc(100dvh-4rem)] bg-[#f5f3eb] dark:bg-[#0e0e0e]">
    <div class="relative px-5 py-10 sm:px-8 sm:py-12 lg:py-16">
      <div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-teal/10 via-transparent to-gold/10" />
      <div class="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
      <div class="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-teal/10 blur-3xl" />

      <div class="relative z-10 mx-auto w-full max-w-3xl">
        <header class="mb-10 text-center">
          <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-teal dark:text-mint">{{ t("contact.label") }}</p>
          <h1 class="mt-2 text-3xl font-extrabold text-gray-900 dark:text-cream sm:text-4xl">{{ t("contact.heading") }}</h1>
          <p class="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-600 dark:text-cream/60">
            {{ t("contact.subtitle") }}
          </p>
        </header>

        <div class="grid gap-4">
          <a
            v-for="link in links"
            :key="link.href"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center gap-5 rounded-2xl border border-gray-200 bg-white/90 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-teal/40 hover:shadow-lg dark:border-white/10 dark:bg-[#161616]/90 dark:hover:border-mint/30 dark:hover:shadow-[0_20px_50px_-12px_rgba(122,218,165,0.12)]"
          >
            <div class="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-sm ring-1 ring-gray-100 transition-transform duration-300 group-hover:scale-105 dark:bg-[#0e0e0e] dark:ring-white/10">
              <img
                :src="link.icon"
                :alt="`${link.label} icon`"
                class="h-full w-full object-contain"
                width="40"
                height="40"
                loading="lazy"
              />
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-2">
                <span class="text-lg font-semibold text-gray-900 dark:text-cream">{{ link.label }}</span>
                <span
                  class="rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wide"
                  :class="
                    link.accent === 'gold'
                      ? 'bg-gold/15 text-gold'
                      : 'bg-teal/10 text-teal dark:bg-mint/10 dark:text-mint'
                  "
                >
                  {{ link.tag }}
                </span>
              </div>
              <p class="mt-1 text-sm text-gray-600 dark:text-cream/55">{{ link.desc }}</p>
            </div>
            <span
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 text-base text-gray-400 transition-all duration-300 group-hover:border-teal/30 group-hover:bg-teal/10 group-hover:text-teal dark:border-white/10 dark:group-hover:border-mint/30 dark:group-hover:bg-mint/10 dark:group-hover:text-mint"
              aria-hidden="true"
            >
              ↗
            </span>
          </a>
        </div>

        <p class="mt-12 text-center text-[11px] text-gray-500 dark:text-cream/30">
          {{ t("meta.footer") }}
        </p>
      </div>
    </div>
  </div>
</template>

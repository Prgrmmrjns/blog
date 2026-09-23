<script setup lang="ts">
import { freelanceCases, type FreelanceCaseId } from "~/data/freelance-cases";

const { t, tm } = useLocale();

const cases = computed(() =>
  tm<Record<FreelanceCaseId, { title: string; text: string }>>("freelancing.cases"),
);

useHead(() => ({
  title: t("freelancing.title"),
  meta: [{ name: "description", content: t("freelancing.metaDescription") }],
}));

function indexLabel(index: number) {
  return String(index + 1).padStart(2, "0");
}
</script>

<template>
  <div class="min-h-[calc(100dvh-4rem)] overflow-x-hidden bg-[#f5f3eb] dark:bg-[#0e0e0e]">
    <div class="relative px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-16">
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-teal/10 via-transparent to-gold/10" />
        <div class="absolute -right-24 top-0 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
        <div class="absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-teal/10 blur-3xl" />
      </div>

      <div class="relative z-10 mx-auto w-full max-w-6xl">
        <header class="mb-10 max-w-3xl lg:mb-14">
          <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-teal dark:text-mint">
            {{ t("freelancing.label") }}
          </p>
          <h1 class="mt-2 font-display text-4xl font-extrabold leading-tight text-gray-900 dark:text-cream sm:text-5xl">
            {{ t("freelancing.heading") }}
          </h1>
          <p class="mt-4 text-base leading-relaxed text-gray-600 dark:text-cream/65 sm:text-lg">
            {{ t("freelancing.intro") }}
          </p>
        </header>

        <div class="grid gap-8 sm:gap-10 lg:grid-cols-2">
          <article
            v-for="(item, index) in freelanceCases"
            :id="item.id"
            :key="item.id"
            class="scroll-mt-24 overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white/95 shadow-sm dark:border-white/10 dark:bg-[#161616]/95"
            :class="index === 0 ? 'lg:col-span-2' : ''"
          >
            <div class="relative aspect-[16/9] overflow-hidden bg-[#efece3] dark:bg-[#121212]">
              <FreelanceCaseArt :id="item.id" :label="cases[item.id].title" />
            </div>
            <div class="px-5 py-6 sm:px-7 sm:py-7" :class="index === 0 ? 'sm:px-8 sm:py-8' : ''">
              <p class="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                {{ indexLabel(index) }}
              </p>
              <h2
                class="mt-2 font-display text-2xl font-extrabold leading-tight text-gray-900 dark:text-cream sm:text-3xl"
                :class="index === 0 ? 'lg:text-4xl' : ''"
              >
                {{ cases[item.id].title }}
              </h2>
              <p class="mt-3 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-cream/65">
                {{ cases[item.id].text }}
              </p>
              <a
                v-if="item.href"
                :href="item.href"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal dark:text-mint"
              >
                {{ t("freelancing.openCase") }}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        </div>

        <section class="mt-12 rounded-[1.75rem] border border-teal/20 bg-teal/5 px-6 py-8 sm:px-8 dark:bg-teal/10">
          <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-teal dark:text-mint">
            {{ t("freelancing.contactLabel") }}
          </p>
          <p class="mt-3 max-w-xl text-base leading-relaxed text-gray-700 dark:text-cream/75">
            {{ t("freelancing.contactText") }}
          </p>
          <div class="mt-6 flex flex-wrap gap-3">
            <a
              href="https://www.linkedin.com/in/jonas-wolber/"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-dark dark:bg-mint dark:text-[#0e0e0e] dark:hover:bg-mint-dark"
            >
              {{ t("freelancing.linkedin") }}
              <span aria-hidden="true">↗</span>
            </a>
            <NuxtLink
              to="/contact"
              class="inline-flex items-center rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-800 transition hover:border-teal/40 hover:text-teal dark:border-white/15 dark:text-cream dark:hover:border-mint/40 dark:hover:text-mint"
            >
              {{ t("freelancing.contactPage") }}
            </NuxtLink>
          </div>
        </section>

        <p class="mt-12 text-center text-[11px] text-gray-500 dark:text-cream/30">
          {{ t("meta.footer") }}
        </p>
      </div>
    </div>
  </div>
</template>

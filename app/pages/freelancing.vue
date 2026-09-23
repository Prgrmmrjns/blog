<script setup lang="ts">
const { t, tm } = useLocale();

const steps = computed(() => tm<{ title: string; text: string }[]>("freelancing.steps"));
const deliver = computed(() => tm<string[]>("freelancing.deliver"));

useHead(() => ({
  title: t("freelancing.title"),
  meta: [{ name: "description", content: t("freelancing.metaDescription") }],
}));
</script>

<template>
  <div class="min-h-[calc(100dvh-4rem)] overflow-x-hidden bg-[#f5f3eb] dark:bg-[#0e0e0e]">
    <div class="relative px-5 py-10 sm:px-8 sm:py-12 lg:py-16">
      <div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-teal/10 via-transparent to-gold/10" />
      <div class="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
      <div class="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-teal/10 blur-3xl" />

      <div class="relative z-10 mx-auto w-full max-w-3xl">
        <header class="mb-10">
          <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-teal dark:text-mint">
            {{ t("freelancing.label") }}
          </p>
          <h1 class="mt-2 font-display text-4xl font-extrabold leading-tight text-gray-900 dark:text-cream sm:text-5xl">
            {{ t("freelancing.heading") }}
          </h1>
          <p class="mt-4 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-cream/65 sm:text-lg">
            {{ t("freelancing.intro") }}
          </p>
        </header>

        <section class="rounded-2xl border border-gray-200 bg-white/90 p-5 shadow-sm dark:border-white/10 dark:bg-[#161616]/90 sm:p-6">
          <p class="text-[10px] font-bold uppercase tracking-wider text-gold">{{ t("freelancing.workflowLabel") }}</p>
          <ol class="mt-4 grid gap-4 sm:grid-cols-2">
            <li
              v-for="(step, index) in steps"
              :key="step.title"
              class="rounded-xl bg-[#f5f3eb]/80 px-4 py-4 dark:bg-[#0e0e0e]/50"
            >
              <p class="text-[10px] font-bold uppercase tracking-wider text-teal dark:text-mint">
                {{ index + 1 }}
              </p>
              <p class="mt-1 text-lg font-semibold text-gray-900 dark:text-cream">{{ step.title }}</p>
              <p class="mt-2 text-sm leading-relaxed text-gray-600 dark:text-cream/60">{{ step.text }}</p>
            </li>
          </ol>
        </section>

        <section class="mt-4 rounded-2xl border border-gray-200 bg-white/90 p-5 shadow-sm dark:border-white/10 dark:bg-[#161616]/90 sm:p-6">
          <p class="text-[10px] font-bold uppercase tracking-wider text-teal dark:text-mint">
            {{ t("freelancing.deliverLabel") }}
          </p>
          <div class="mt-3 flex flex-wrap gap-2">
            <span
              v-for="item in deliver"
              :key="item"
              class="rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal dark:bg-mint/10 dark:text-mint"
            >
              {{ item }}
            </span>
          </div>
        </section>

        <section class="mt-4 rounded-2xl border border-gray-200 bg-white/90 p-5 shadow-sm dark:border-white/10 dark:bg-[#161616]/90 sm:p-6">
          <p class="text-[10px] font-bold uppercase tracking-wider text-gold">{{ t("freelancing.exampleLabel") }}</p>
          <p class="mt-2 text-sm leading-relaxed text-gray-700 dark:text-cream/70">
            {{ t("freelancing.exampleText") }}
          </p>
          <a
            href="https://belegcheck.vercel.app"
            class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal transition hover:text-teal-dark dark:text-mint dark:hover:text-mint-dark"
            rel="noopener noreferrer"
          >
            {{ t("freelancing.exampleHrefLabel") }}
            <span aria-hidden="true">↗</span>
          </a>
        </section>

        <section class="mt-4 rounded-2xl border border-teal/20 bg-teal/5 p-5 dark:bg-teal/5 sm:p-6">
          <p class="text-[10px] font-bold uppercase tracking-wider text-teal dark:text-mint">
            {{ t("freelancing.contactLabel") }}
          </p>
          <p class="mt-2 text-sm leading-relaxed text-gray-700 dark:text-cream/70">
            {{ t("freelancing.contactText") }}
          </p>
          <div class="mt-5 flex flex-wrap gap-3">
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

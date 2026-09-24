<script setup lang="ts">
import { freelanceCaseById, type FreelanceCaseId } from "~/data/freelance-cases";

const route = useRoute();
const { t, tm } = useLocale();

const id = computed(() => String(route.params.id || ""));
const item = computed(() => freelanceCaseById(id.value));

if (!item.value) {
  throw createError({ statusCode: 404, statusMessage: "Case not found" });
}

const copy = computed(() => {
  const cases = tm<Record<FreelanceCaseId, { title: string; text: string; steps: string[] }>>("freelancing.cases");
  return cases[id.value as FreelanceCaseId];
});

useHead(() => ({
  title: copy.value ? `${copy.value.title} — Jonas Wolber` : t("freelancing.title"),
  meta: [{ name: "description", content: copy.value?.text ?? t("freelancing.metaDescription") }],
}));
</script>

<template>
  <div v-if="item && copy" class="min-h-[calc(100dvh-4rem)] overflow-x-hidden bg-[#f5f3eb] dark:bg-[#0e0e0e]">
    <div class="relative px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-16">
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-teal/10 via-transparent to-gold/10" />
        <div class="absolute -right-24 top-0 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
        <div class="absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-teal/10 blur-3xl" />
      </div>

      <div class="relative z-10 mx-auto w-full max-w-3xl">
        <NuxtLink
          to="/freelancing"
          class="text-sm font-semibold text-teal underline-offset-4 hover:underline dark:text-mint"
        >
          ← {{ t("freelancing.back") }}
        </NuxtLink>

        <header class="mt-6">
          <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-teal dark:text-mint">
            {{ t("freelancing.workflow") }}
          </p>
          <h1 class="mt-2 font-display text-4xl font-extrabold leading-tight text-gray-900 dark:text-cream sm:text-5xl">
            {{ copy.title }}
          </h1>
          <p class="mt-4 text-base leading-relaxed text-gray-600 dark:text-cream/65 sm:text-lg">
            {{ copy.text }}
          </p>
        </header>

        <div class="mt-8 overflow-hidden rounded-[1.75rem] border border-gray-200 bg-[#efece3] dark:border-white/10 dark:bg-[#121212]">
          <div class="relative aspect-[16/9]">
            <FreelanceCaseArt :id="item.id" :label="copy.title" />
          </div>
        </div>

        <ol class="mt-8 space-y-4">
          <li
            v-for="(step, index) in copy.steps"
            :key="step"
            class="flex gap-4 rounded-2xl border border-gray-200 bg-white/95 px-5 py-4 dark:border-white/10 dark:bg-[#161616]/95"
          >
            <span class="font-display text-lg font-extrabold text-gold">{{ String(index + 1).padStart(2, "0") }}</span>
            <p class="text-base leading-relaxed text-gray-700 dark:text-cream/75">{{ step }}</p>
          </li>
        </ol>

        <div v-if="item.links?.length" class="mt-8 flex flex-wrap gap-3">
          <a
            v-for="link in item.links"
            :key="link.href"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-dark dark:bg-mint dark:text-[#0e0e0e] dark:hover:bg-mint-dark"
          >
            {{ link.kind === "github" ? t("freelancing.github") : t("freelancing.live") }}
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <p class="mt-12 text-center text-[11px] text-gray-500 dark:text-cream/30">
          {{ t("meta.footer") }}
        </p>
      </div>
    </div>
  </div>
</template>

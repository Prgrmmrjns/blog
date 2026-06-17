<script setup lang="ts">
const { t, tm } = useLocale();

useHead(() => ({
  title: t("about.title"),
  meta: [{ name: "description", content: t("about.metaDescription") }],
}));

const focusAreas = computed(() => tm<string[]>("about.focusAreas"));
const hobbies = computed(() => tm<string[]>("about.hobbies"));
</script>

<template>
  <div class="min-h-[calc(100dvh-4rem)] bg-[#f5f3eb] dark:bg-[#0e0e0e]">
    <div class="relative px-5 py-8 sm:px-8 sm:py-10 lg:py-12">
      <div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-teal/10 via-transparent to-gold/10" />

      <div class="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-8 lg:grid lg:grid-cols-[20rem_1fr] lg:gap-10">
        <div class="flex shrink-0 items-start gap-5 lg:flex-col lg:gap-4">
          <img
            src="/profile.jpg"
            alt="Jonas Wolber"
            class="h-52 w-40 shrink-0 rounded-xl border-2 border-white object-cover object-top shadow-[0_0_40px_rgba(122,218,165,0.25)] dark:border-[#1a1a1a] sm:h-60 sm:w-44 lg:h-72 lg:w-full"
          />
          <div class="min-w-0 lg:text-left">
            <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-teal dark:text-mint">{{ t("about.label") }}</p>
            <h1 class="text-2xl font-extrabold text-gray-900 dark:text-cream lg:text-3xl">Jonas Wolber</h1>
            <p class="mt-0.5 text-sm text-gray-600 dark:text-cream/60">{{ t("about.role") }}</p>
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <p class="text-sm leading-relaxed text-gray-800 dark:text-cream/85 lg:text-[15px]">
            {{ t("about.intro") }}
          </p>

          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="area in focusAreas"
              :key="area"
              class="rounded-full bg-teal/10 px-2.5 py-1 text-[11px] font-semibold text-teal dark:bg-mint/10 dark:text-mint"
            >
              {{ area }}
            </span>
          </div>

          <div class="rounded-2xl border border-gray-200 bg-white/80 p-3 dark:border-white/10 dark:bg-[#161616]/80 sm:p-4">
            <div class="grid gap-2 sm:grid-cols-3">
              <div class="rounded-lg bg-[#f5f3eb]/80 px-3 py-2 dark:bg-[#0e0e0e]/50">
                <p class="text-[10px] font-bold uppercase tracking-wider text-teal dark:text-mint">{{ t("about.now") }}</p>
                <p class="mt-0.5 text-xs font-semibold text-gray-900 dark:text-cream">{{ t("about.nowRole") }}</p>
                <p class="text-[11px] text-gray-600 dark:text-cream/50">{{ t("about.nowPlace") }}</p>
              </div>
              <div class="rounded-lg bg-[#f5f3eb]/80 px-3 py-2 dark:bg-[#0e0e0e]/50">
                <p class="text-[10px] font-bold uppercase tracking-wider text-gold">{{ t("about.msc") }}</p>
                <p class="mt-0.5 text-xs font-semibold text-gray-900 dark:text-cream">{{ t("about.mscField") }}</p>
                <p class="text-[11px] text-gray-600 dark:text-cream/50">{{ t("about.mscPlace") }}</p>
              </div>
              <div class="rounded-lg bg-[#f5f3eb]/80 px-3 py-2 dark:bg-[#0e0e0e]/50">
                <p class="text-[10px] font-bold uppercase tracking-wider text-teal dark:text-mint">{{ t("about.bsc") }}</p>
                <p class="mt-0.5 text-xs font-semibold text-gray-900 dark:text-cream">{{ t("about.bscField") }}</p>
                <p class="text-[11px] text-gray-600 dark:text-cream/50">{{ t("about.bscPlace") }}</p>
              </div>
            </div>

            <div class="my-3 h-px bg-gray-200 dark:bg-white/10" />

            <div class="rounded-lg border border-teal/15 bg-teal/5 px-3 py-2.5 dark:bg-teal/5">
              <p class="text-[10px] font-bold uppercase tracking-wider text-teal dark:text-mint">{{ t("about.drivesMe") }}</p>
              <p class="mt-0.5 text-[11px] leading-snug text-gray-700 dark:text-cream/65">{{ t("about.drivesMeText") }}</p>
            </div>
          </div>

          <div class="rounded-2xl border border-gray-200 bg-white/80 p-4 dark:border-white/10 dark:bg-[#161616]/80 sm:p-5">
            <p class="text-[10px] font-bold uppercase tracking-wider text-gold">{{ t("about.beyond") }}</p>
            <p class="mt-2 text-sm leading-relaxed text-gray-800 dark:text-cream/85 lg:text-[15px]">
              {{ t("about.beyondP1") }}
            </p>
            <p class="mt-3 text-sm leading-relaxed text-gray-800 dark:text-cream/85 lg:text-[15px]">
              {{ t("about.beyondP2") }}
            </p>

            <div class="mt-3 flex flex-wrap gap-1.5">
              <span
                v-for="hobby in hobbies"
                :key="hobby"
                class="rounded-full bg-gold/15 px-2.5 py-1 text-[11px] font-semibold text-gold"
              >
                {{ hobby }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <p class="relative z-10 mt-10 text-center text-[11px] text-gray-500 dark:text-cream/30">
        {{ t("meta.footer") }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "About — Jonas Wolber",
  meta: [
    {
      name: "description",
      content:
        "Doctoral student in Computational Biomedicine at RWTH Aachen. Research in metabolic diseases, diabetes, machine learning, and digital medicine.",
    },
  ],
});

const focusAreas = [
  "Type 1 diabetes",
  "Remote monitoring",
  "Machine learning",
  "Time series",
  "LLMs",
  "Hybrid modeling",
];
</script>

<template>
  <div class="flex h-[calc(100dvh-4rem)] flex-col overflow-hidden bg-[#f5f3eb] dark:bg-[#0e0e0e]">
    <div class="relative flex min-h-0 flex-1 flex-col px-5 py-5 sm:px-8 sm:py-6 lg:py-8">
      <div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-teal/10 via-transparent to-gold/10" />

      <div class="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-5 lg:grid lg:grid-cols-[11rem_1fr] lg:gap-8">
        <!-- Profile -->
        <div class="flex shrink-0 items-center gap-4 lg:flex-col lg:items-start lg:gap-3">
          <img
            src="/profile.jpg"
            alt="Jonas Wolber"
            class="h-20 w-20 shrink-0 rounded-full border-2 border-white object-cover shadow-[0_0_30px_rgba(122,218,165,0.2)] dark:border-[#1a1a1a] lg:h-28 lg:w-28"
          />
          <div class="min-w-0 lg:text-left">
            <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-teal dark:text-mint">About</p>
            <h1 class="text-2xl font-extrabold text-gray-900 dark:text-cream lg:text-3xl">Jonas Wolber</h1>
            <p class="mt-0.5 text-sm text-gray-600 dark:text-cream/60">
              PhD · Computational Biomedicine · RWTH Aachen
            </p>
          </div>
        </div>

        <!-- Content -->
        <div class="flex flex-col gap-3 overflow-hidden">
          <p class="text-sm leading-relaxed text-gray-800 dark:text-cream/85 lg:text-[15px]">
            I research metabolic disease — especially type 1 diabetes — and how continuous monitoring, wearables, and
            AI can turn messy real-world data into tools clinicians and patients can use. My work mixes time series,
            gradient boosting, multimodal LLMs, and hybrid models that respect physiology.
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

          <div
            class="rounded-2xl border border-gray-200 bg-white/80 p-3 dark:border-white/10 dark:bg-[#161616]/80 sm:p-4"
          >
            <div class="grid gap-2 sm:grid-cols-3">
              <div class="rounded-lg bg-[#f5f3eb]/80 px-3 py-2 dark:bg-[#0e0e0e]/50">
                <p class="text-[10px] font-bold uppercase tracking-wider text-teal dark:text-mint">Now</p>
                <p class="mt-0.5 text-xs font-semibold text-gray-900 dark:text-cream">Doctoral researcher</p>
                <p class="text-[11px] text-gray-600 dark:text-cream/50">RWTH · Digital GP & Comp. Biomedicine</p>
              </div>
              <div class="rounded-lg bg-[#f5f3eb]/80 px-3 py-2 dark:bg-[#0e0e0e]/50">
                <p class="text-[10px] font-bold uppercase tracking-wider text-gold">M.Sc.</p>
                <p class="mt-0.5 text-xs font-semibold text-gray-900 dark:text-cream">Cardiovascular Science</p>
                <p class="text-[11px] text-gray-600 dark:text-cream/50">University of Göttingen</p>
              </div>
              <div class="rounded-lg bg-[#f5f3eb]/80 px-3 py-2 dark:bg-[#0e0e0e]/50">
                <p class="text-[10px] font-bold uppercase tracking-wider text-teal dark:text-mint">B.Sc.</p>
                <p class="mt-0.5 text-xs font-semibold text-gray-900 dark:text-cream">Biomedical Sciences</p>
                <p class="text-[11px] text-gray-600 dark:text-cream/50">Maastricht University</p>
              </div>
            </div>

            <div class="my-3 h-px bg-gray-200 dark:bg-white/10" />

            <div class="grid gap-2 sm:grid-cols-2">
              <div class="flex gap-3 rounded-lg border border-gold/15 bg-gold/5 px-3 py-2 dark:bg-gold/5">
                <p class="text-2xl font-extrabold leading-none text-gray-900 dark:text-cream">5%</p>
                <div>
                  <p class="text-[10px] font-bold uppercase tracking-wider text-gold">p(doom)</p>
                  <p class="mt-0.5 text-[11px] leading-snug text-gray-700 dark:text-cream/65">
                    Optimistic, not naive. More tolerance, more care for nature.
                  </p>
                </div>
              </div>
              <div class="rounded-lg border border-teal/15 bg-teal/5 px-3 py-2 dark:bg-teal/5">
                <p class="text-[10px] font-bold uppercase tracking-wider text-teal dark:text-mint">What drives me</p>
                <p class="mt-0.5 text-[11px] leading-snug text-gray-700 dark:text-cream/65">
                  Impact where everyone benefits — cancer, heart disease, dementia would be a good start.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p class="relative z-10 mt-4 shrink-0 text-center text-[11px] text-gray-500 dark:text-cream/30">
        Curiosity is all you need.
      </p>
    </div>
  </div>
</template>

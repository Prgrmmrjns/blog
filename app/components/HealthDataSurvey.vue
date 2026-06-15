<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    postSlug?: string;
    surveyId?: string;
  }>(),
  {
    postSlug: "health-monitoring-and-ml-in-diabetes-research",
    surveyId: "health-data-sharing",
  }
);

const { responses, loading, submitting, hasVoted, error, submitError, submitResponse } = useBlogSurvey(
  props.postSlug,
  props.surveyId
);

const score = ref(5);

const scaleLabels: Record<number, string> = {
  0: "Never",
  1: "Very unlikely",
  2: "Rather skeptical",
  3: "Only with clear rules",
  4: "Probably not",
  5: "It depends",
  6: "Cautiously open",
  7: "Rather yes",
  8: "Probably yes",
  9: "Very likely",
  10: "Always",
};

const scores = computed(() =>
  responses.value
    .map((row) => row.numeric_value)
    .filter((value): value is number => value !== null)
);

const distribution = computed(() => {
  const counts = Array.from({ length: 11 }, () => 0);
  for (const value of scores.value) {
    counts[value] += 1;
  }
  return counts;
});

const totalResponses = computed(() => scores.value.length);

const averageScore = computed(() => {
  if (!totalResponses.value) return null;
  const sum = scores.value.reduce((acc, value) => acc + value, 0);
  return sum / totalResponses.value;
});

const maxCount = computed(() => Math.max(1, ...distribution.value));

const averagePercent = computed(() => {
  if (averageScore.value === null) return 0;
  return (averageScore.value / 10) * 100;
});

function submitVote() {
  submitResponse(String(score.value), score.value);
}
</script>

<template>
  <section
    class="not-prose my-12 overflow-hidden rounded-3xl border border-teal/20 bg-gradient-to-br from-teal/5 via-white to-gold/10 p-6 shadow-lg dark:border-mint/20 dark:from-teal/10 dark:via-[#141414] dark:to-gold/5 sm:p-8"
    aria-labelledby="health-survey-title"
  >
    <div class="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <p class="text-xs font-bold uppercase tracking-widest text-teal dark:text-mint">
          Survey
        </p>
        <h3 id="health-survey-title" class="mt-2 text-xl font-bold text-gray-900 dark:text-cream sm:text-2xl">
          Would you share personal health data to receive AI health recommendations?
        </h3>
        <p class="mt-2 text-sm text-gray-600 dark:text-cream/60">
          0 = Never · 10 = Always. Anonymous, no sign-in required.
        </p>
      </div>
      <div
        v-if="averageScore !== null"
        class="rounded-2xl border border-gold/30 bg-gold/10 px-4 py-3 text-center"
      >
        <p class="text-xs font-semibold uppercase tracking-wide text-gold">Average</p>
        <p class="text-3xl font-extrabold text-gray-900 dark:text-cream">
          {{ averageScore.toFixed(1) }}
          <span class="text-base font-medium text-gray-500 dark:text-cream/50">/ 10</span>
        </p>
        <p class="text-xs text-gray-500 dark:text-cream/40">{{ totalResponses }} responses</p>
      </div>
    </div>

    <div v-if="!hasVoted" class="mb-8 rounded-2xl border border-gray-200 bg-white/80 p-5 dark:border-white/10 dark:bg-[#1a1a1a]/80">
      <div class="mb-3 flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-cream/50">
        <span>0 — Never</span>
        <span>10 — Always</span>
      </div>

      <input
        v-model.number="score"
        type="range"
        min="0"
        max="10"
        step="1"
        class="h-3 w-full cursor-pointer appearance-none rounded-full bg-gradient-to-r from-gray-300 via-teal/40 to-mint accent-teal dark:from-white/10 dark:via-teal/30 dark:to-mint/50"
        aria-label="Survey score from 0 to 10"
      />

      <div class="mt-4 flex items-center justify-between gap-4">
        <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal/15 text-2xl font-extrabold text-teal dark:bg-mint/15 dark:text-mint">
          {{ score }}
        </div>
        <p class="text-sm font-medium leading-snug text-gray-700 dark:text-cream/80">
          {{ scaleLabels[score] }}
        </p>
      </div>

      <p v-if="submitError" class="mt-3 text-sm text-red-500">
        {{ submitError }}
      </p>

      <button
        type="button"
        class="mt-5 w-full rounded-xl bg-teal px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-dark disabled:cursor-not-allowed disabled:opacity-50 dark:bg-mint dark:text-gray-900 dark:hover:bg-mint/90"
        :disabled="submitting"
        @click="submitVote"
      >
        {{ submitting ? "Submitting…" : "Vote anonymously" }}
      </button>
    </div>

    <div v-else class="mb-8 rounded-2xl border border-mint/30 bg-mint/10 px-5 py-4 text-sm font-medium text-teal-dark dark:text-mint">
      Thank you — your response has been recorded. The chart updates automatically. (One vote per browser.)
    </div>

    <div v-if="loading" class="py-8 text-center text-sm text-gray-500 dark:text-cream/50">
      Loading results…
    </div>
    <p v-else-if="error" class="text-sm text-red-500">{{ error }}</p>

    <div v-else class="space-y-4">
      <div
        class="flex items-end justify-between gap-1 sm:gap-2"
        style="height: 180px"
        role="img"
        :aria-label="`Survey distribution chart with ${totalResponses} responses`"
      >
        <div
          v-for="(count, index) in distribution"
          :key="index"
          class="group flex flex-1 flex-col items-center justify-end"
        >
          <span
            class="mb-1 text-[10px] font-semibold text-gray-500 opacity-0 transition group-hover:opacity-100 dark:text-cream/50"
          >
            {{ count || "" }}
          </span>
          <div
            class="w-full rounded-t-lg bg-gradient-to-t from-teal to-mint/80 transition-all duration-500 dark:from-teal-dark dark:to-mint"
            :style="{ height: `${(count / maxCount) * 100}%`, minHeight: count ? '8px' : '2px' }"
            :class="count ? 'opacity-100' : 'opacity-20'"
            :title="`${count} votes at ${index}`"
          />
          <span class="mt-2 text-[10px] font-bold text-gray-500 dark:text-cream/40 sm:text-xs">{{ index }}</span>
        </div>
      </div>

      <div class="relative h-4 overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
        <div
          class="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gray-400 via-teal to-mint transition-all duration-700"
          :style="{ width: `${averagePercent}%` }"
        />
        <div
          v-if="averageScore !== null"
          class="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-white bg-gold shadow-md transition-all duration-700 dark:border-[#141414]"
          :style="{ left: `calc(${averagePercent}% - 10px)` }"
        />
      </div>

      <div class="flex justify-between text-xs font-medium text-gray-500 dark:text-cream/40">
        <span>Privacy</span>
        <span>Data sharing</span>
      </div>

      <p v-if="totalResponses === 0" class="text-center text-sm text-gray-500 dark:text-cream/50">
        No responses yet — be the first to vote.
      </p>
    </div>
  </section>
</template>

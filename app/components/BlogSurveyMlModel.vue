<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    postSlug?: string;
    surveyId?: string;
  }>(),
  {
    postSlug: "xgboost-vs-lightgbm-vs-catboost",
    surveyId: "favorite-ml-model",
  }
);

const { responses, loading, submitting, hasVoted, error, submitError, submitResponse } = useBlogSurvey(
  props.postSlug,
  props.surveyId
);

const models = [
  { id: "xgboost", label: "XGBoost", color: "from-teal to-teal-dark" },
  { id: "lightgbm", label: "LightGBM", color: "from-mint to-teal" },
  { id: "catboost", label: "CatBoost", color: "from-gold to-gold-dark" },
  { id: "neural-networks", label: "Neural Networks", color: "from-teal-dark to-gray-800" },
  { id: "random-forest", label: "Random Forest", color: "from-green-600 to-teal" },
  { id: "svm", label: "Support Vector Machine (SVM)", color: "from-gray-600 to-gray-800" },
  { id: "knn", label: "K-Nearest Neighbors (KNN)", color: "from-teal/80 to-mint" },
  { id: "linear", label: "Linear / Logistic Regression", color: "from-gray-500 to-teal" },
  { id: "naive-bayes", label: "Naive Bayes", color: "from-gold/80 to-teal" },
  { id: "other", label: "Other", color: "from-gray-400 to-gray-500" },
] as const;

const selected = ref<string | null>(null);

const countsByModel = computed(() => {
  const counts = Object.fromEntries(models.map((model) => [model.id, 0])) as Record<string, number>;
  for (const row of responses.value) {
    if (row.answer in counts) {
      counts[row.answer] += 1;
    }
  }
  return counts;
});

const totalResponses = computed(() => responses.value.length);

const maxCount = computed(() => Math.max(1, ...Object.values(countsByModel.value)));

const leadingModel = computed(() => {
  if (!totalResponses.value) return null;
  return models.reduce((best, model) =>
    countsByModel.value[model.id] > countsByModel.value[best.id] ? model : best
  );
});

function submitVote() {
  if (!selected.value) return;
  submitResponse(selected.value);
}
</script>

<template>
  <section
    class="not-prose my-12 overflow-hidden rounded-3xl border border-teal/20 bg-gradient-to-br from-teal/5 via-white to-mint/10 p-6 shadow-lg dark:border-mint/20 dark:from-teal/10 dark:via-[#141414] dark:to-mint/5 sm:p-8"
    aria-labelledby="ml-model-survey-title"
  >
    <div class="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <p class="text-xs font-bold uppercase tracking-widest text-teal dark:text-mint">Survey</p>
        <h3 id="ml-model-survey-title" class="mt-2 text-xl font-bold text-gray-900 dark:text-cream sm:text-2xl">
          What is your favorite machine learning model?
        </h3>
        <p class="mt-2 text-sm text-gray-600 dark:text-cream/60">
          Pick one — anonymous, no sign-in required.
        </p>
      </div>
      <div
        v-if="leadingModel && totalResponses > 0"
        class="rounded-2xl border border-teal/30 bg-teal/10 px-4 py-3 text-center dark:border-mint/30 dark:bg-mint/10"
      >
        <p class="text-xs font-semibold uppercase tracking-wide text-teal dark:text-mint">Leading pick</p>
        <p class="mt-1 text-sm font-bold text-gray-900 dark:text-cream">{{ leadingModel.label }}</p>
        <p class="text-xs text-gray-500 dark:text-cream/40">{{ totalResponses }} responses</p>
      </div>
    </div>

    <div v-if="!hasVoted" class="mb-8 rounded-2xl border border-gray-200 bg-white/80 p-5 dark:border-white/10 dark:bg-[#1a1a1a]/80">
      <div class="grid gap-2 sm:grid-cols-2">
        <button
          v-for="model in models"
          :key="model.id"
          type="button"
          class="rounded-xl border px-4 py-3 text-left text-sm font-medium transition"
          :class="
            selected === model.id
              ? 'border-teal bg-teal/10 text-gray-900 dark:border-mint dark:bg-mint/10 dark:text-cream'
              : 'border-gray-200 text-gray-700 hover:border-teal/40 dark:border-white/10 dark:text-cream/80 dark:hover:border-mint/30'
          "
          @click="selected = model.id"
        >
          {{ model.label }}
        </button>
      </div>

      <p v-if="submitError" class="mt-3 text-sm text-red-500">{{ submitError }}</p>

      <button
        type="button"
        class="mt-5 w-full rounded-xl bg-teal px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-dark disabled:cursor-not-allowed disabled:opacity-50 dark:bg-mint dark:text-gray-900 dark:hover:bg-mint/90"
        :disabled="submitting || !selected"
        @click="submitVote"
      >
        {{ submitting ? "Submitting…" : "Vote anonymously" }}
      </button>
    </div>

    <div
      v-else
      class="mb-8 rounded-2xl border border-mint/30 bg-mint/10 px-5 py-4 text-sm font-medium text-teal-dark dark:text-mint"
    >
      Thank you — your response has been recorded. (One vote per browser.)
    </div>

    <div v-if="loading" class="py-8 text-center text-sm text-gray-500 dark:text-cream/50">
      Loading results…
    </div>
    <p v-else-if="error" class="text-sm text-red-500">{{ error }}</p>

    <div v-else class="space-y-3">
      <div v-for="model in models" :key="model.id">
        <div class="mb-1 flex items-center justify-between gap-2 text-xs">
          <span class="font-medium text-gray-700 dark:text-cream/75">{{ model.label }}</span>
          <span class="shrink-0 text-gray-500 dark:text-cream/45">
            {{ countsByModel[model.id] }}
            <span class="hidden sm:inline">
              ({{ totalResponses ? Math.round((countsByModel[model.id] / totalResponses) * 100) : 0 }}%)
            </span>
          </span>
        </div>
        <div class="h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
          <div
            class="h-full rounded-full bg-gradient-to-r transition-all duration-700"
            :class="model.color"
            :style="{
              width: `${(countsByModel[model.id] / maxCount) * 100}%`,
              minWidth: countsByModel[model.id] ? '4px' : '0',
            }"
            :title="`${countsByModel[model.id]} votes`"
          />
        </div>
      </div>

      <p v-if="totalResponses === 0" class="pt-2 text-center text-sm text-gray-500 dark:text-cream/50">
        No responses yet — be the first to vote.
      </p>
    </div>
  </section>
</template>

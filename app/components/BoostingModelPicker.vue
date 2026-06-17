<script setup lang="ts">
type Choice = {
  id: string;
  label: string;
  next?: string;
  result?: string;
};

type Node = {
  id: string;
  question: string;
  choices: Choice[];
};

const nodes: Record<string, Node> = {
  start: {
    id: "start",
    question: "How large is your training set?",
    choices: [
      { id: "large", label: "More than about 500,000 rows", next: "large-features" },
      { id: "small", label: "500,000 rows or fewer", next: "small-features" },
    ],
  },
  "large-features": {
    id: "large-features",
    question: "What best describes your features?",
    choices: [
      { id: "large-numeric", label: "Mostly numeric columns", next: "large-monotone" },
      { id: "large-categorical", label: "Many high-cardinality categorical columns", result: "catboost" },
    ],
  },
  "large-monotone": {
    id: "large-monotone",
    question: "Do you need monotonic constraints on any features?",
    choices: [
      { id: "large-mono-yes", label: "Yes — predictions must respect fixed directional rules", result: "xgboost" },
      { id: "large-mono-no", label: "No", result: "lightgbm" },
    ],
  },
  "small-features": {
    id: "small-features",
    question: "What best describes your features?",
    choices: [
      { id: "small-categorical", label: "Many high-cardinality categorical columns", result: "catboost" },
      { id: "small-mixed", label: "Mostly numeric, or only a few categories", next: "small-monotone" },
    ],
  },
  "small-monotone": {
    id: "small-monotone",
    question: "Do you need monotonic constraints on any features?",
    choices: [
      { id: "small-mono-yes", label: "Yes — predictions must respect fixed directional rules", result: "xgboost" },
      { id: "small-mono-no", label: "No", next: "small-priority" },
    ],
  },
  "small-priority": {
    id: "small-priority",
    question: "What matters more for this project?",
    choices: [
      { id: "priority-speed", label: "Training speed and memory efficiency", result: "lightgbm" },
      { id: "priority-stable", label: "Conservative defaults and stable generalization on smaller data", result: "xgboost" },
    ],
  },
};

const results: Record<string, { name: string; tagline: string; color: string }> = {
  xgboost: {
    name: "XGBoost",
    tagline:
      "A strong fit when monotonic or interaction constraints are required, or when you want a well-tested production default with level-wise growth and built-in regularization.",
    color: "border-teal bg-teal/10 text-teal dark:border-mint dark:bg-mint/10 dark:text-mint",
  },
  lightgbm: {
    name: "LightGBM",
    tagline:
      "A strong fit for large, mostly numeric datasets where training time and memory matter. Use depth limits and validation to control leaf-wise overfitting on smaller sets.",
    color: "border-mint bg-mint/10 text-teal-dark dark:border-mint dark:bg-mint/5 dark:text-mint",
  },
  catboost: {
    name: "CatBoost",
    tagline:
      "A strong fit when high-cardinality categorical features dominate and you want ordered encodings, symmetric trees, and reliable defaults without a heavy preprocessing pipeline.",
    color: "border-gold bg-gold/10 text-gold-dark dark:border-gold dark:bg-gold/10 dark:text-gold",
  },
};

const currentId = ref("start");
const finalResult = ref<(typeof results)[keyof typeof results] | null>(null);

const currentNode = computed(() => nodes[currentId.value]);

function choose(choice: Choice) {
  if (choice.result) {
    finalResult.value = results[choice.result];
    currentId.value = "__result__";
  } else if (choice.next) {
    currentId.value = choice.next;
  }
}

function reset() {
  currentId.value = "start";
  finalResult.value = null;
}

const isResult = computed(() => currentId.value === "__result__");
</script>

<template>
  <section
    class="not-prose my-12 overflow-hidden rounded-3xl border border-teal/20 bg-gradient-to-br from-teal/5 via-white to-gold/5 p-6 shadow-lg dark:border-mint/20 dark:from-[#141414] dark:via-[#141414] dark:to-gold/5 sm:p-8"
    aria-labelledby="model-picker-title"
  >
    <p class="text-xs font-bold uppercase tracking-widest text-teal dark:text-mint">Decision tree</p>
    <h3 id="model-picker-title" class="mt-2 text-xl font-bold text-gray-900 dark:text-cream sm:text-2xl">
      Which gradient booster should you use?
    </h3>
    <p class="mt-2 text-sm text-gray-600 dark:text-cream/60">
      Answer the questions below based on your dataset and deployment requirements. The result is a starting recommendation, not a substitute for cross-validation.
    </p>

    <div v-if="!isResult" class="mt-8 rounded-2xl border border-gray-200 bg-white/90 p-6 dark:border-white/10 dark:bg-[#1a1a1a]/90">
      <p class="text-base font-semibold leading-snug text-gray-900 dark:text-cream">
        {{ currentNode?.question }}
      </p>
      <div class="mt-5 flex flex-col gap-3">
        <button
          v-for="choice in currentNode?.choices"
          :key="choice.id"
          type="button"
          class="rounded-xl border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-800 transition hover:border-teal hover:bg-teal/5 dark:border-white/10 dark:text-cream/85 dark:hover:border-mint dark:hover:bg-mint/5"
          @click="choose(choice)"
        >
          {{ choice.label }}
        </button>
      </div>
    </div>

    <div v-else-if="finalResult" class="mt-8 rounded-2xl border-2 p-6 text-center" :class="finalResult.color">
      <p class="text-xs font-bold uppercase tracking-wider opacity-80">Recommendation</p>
      <p class="mt-2 text-3xl font-extrabold">{{ finalResult.name }}</p>
      <p class="mx-auto mt-3 max-w-md text-sm leading-relaxed opacity-90">
        {{ finalResult.tagline }}
      </p>
      <button
        type="button"
        class="mt-6 rounded-xl border border-current/30 px-5 py-2 text-sm font-semibold opacity-80 transition hover:opacity-100"
        @click="reset"
      >
        Start over
      </button>
    </div>
  </section>
</template>

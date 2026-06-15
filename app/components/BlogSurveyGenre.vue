<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    postSlug?: string;
    surveyId?: string;
  }>(),
  {
    postSlug: "my-top-10-books-and-why-i-love-them",
    surveyId: "favorite-genre",
  }
);

const { responses, loading, submitting, hasVoted, error, submitError, submitResponse } = useBlogSurvey(
  props.postSlug,
  props.surveyId
);

const genres = [
  { id: "sci-fi", label: "Science Fiction", color: "from-teal to-teal-dark" },
  { id: "fantasy", label: "Fantasy", color: "from-gold to-gold-dark" },
  { id: "non-fiction", label: "Non-fiction & Science", color: "from-mint to-teal" },
  { id: "productivity", label: "Productivity & Self-help", color: "from-gold/80 to-teal" },
  { id: "history", label: "History & Politics", color: "from-gray-500 to-gray-700" },
  { id: "mystery", label: "Mystery & Thriller", color: "from-teal-dark to-gray-800" },
  { id: "other", label: "Other", color: "from-gray-400 to-gray-500" },
] as const;

const selected = ref<string | null>(null);

const countsByGenre = computed(() => {
  const counts = Object.fromEntries(genres.map((genre) => [genre.id, 0])) as Record<string, number>;
  for (const row of responses.value) {
    if (row.answer in counts) {
      counts[row.answer] += 1;
    }
  }
  return counts;
});

const totalResponses = computed(() => responses.value.length);

const maxCount = computed(() => Math.max(1, ...Object.values(countsByGenre.value)));

const leadingGenre = computed(() => {
  if (!totalResponses.value) return null;
  return genres.reduce((best, genre) =>
    countsByGenre.value[genre.id] > countsByGenre.value[best.id] ? genre : best
  );
});

function submitVote() {
  if (!selected.value) return;
  submitResponse(selected.value);
}
</script>

<template>
  <section
    class="not-prose my-12 overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-br from-gold/5 via-white to-teal/10 p-6 shadow-lg dark:border-gold/20 dark:from-gold/5 dark:via-[#141414] dark:to-teal/10 sm:p-8"
    aria-labelledby="genre-survey-title"
  >
    <div class="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <p class="text-xs font-bold uppercase tracking-widest text-gold">Survey</p>
        <h3 id="genre-survey-title" class="mt-2 text-xl font-bold text-gray-900 dark:text-cream sm:text-2xl">
          What is your favorite genre?
        </h3>
        <p class="mt-2 text-sm text-gray-600 dark:text-cream/60">
          Pick one — anonymous, no sign-in required.
        </p>
      </div>
      <div
        v-if="leadingGenre && totalResponses > 0"
        class="rounded-2xl border border-gold/30 bg-gold/10 px-4 py-3 text-center"
      >
        <p class="text-xs font-semibold uppercase tracking-wide text-gold">Leading pick</p>
        <p class="mt-1 text-sm font-bold text-gray-900 dark:text-cream">{{ leadingGenre.label }}</p>
        <p class="text-xs text-gray-500 dark:text-cream/40">{{ totalResponses }} responses</p>
      </div>
    </div>

    <div v-if="!hasVoted" class="mb-8 rounded-2xl border border-gray-200 bg-white/80 p-5 dark:border-white/10 dark:bg-[#1a1a1a]/80">
      <div class="grid gap-2 sm:grid-cols-2">
        <button
          v-for="genre in genres"
          :key="genre.id"
          type="button"
          class="rounded-xl border px-4 py-3 text-left text-sm font-medium transition"
          :class="
            selected === genre.id
              ? 'border-gold bg-gold/10 text-gray-900 dark:border-gold dark:bg-gold/10 dark:text-cream'
              : 'border-gray-200 text-gray-700 hover:border-gold/40 dark:border-white/10 dark:text-cream/80 dark:hover:border-gold/30'
          "
          @click="selected = genre.id"
        >
          {{ genre.label }}
        </button>
      </div>

      <p v-if="submitError" class="mt-3 text-sm text-red-500">{{ submitError }}</p>

      <button
        type="button"
        class="mt-5 w-full rounded-xl bg-gold px-5 py-3 text-sm font-bold text-gray-900 transition hover:bg-gold-dark disabled:cursor-not-allowed disabled:opacity-50"
        :disabled="submitting || !selected"
        @click="submitVote"
      >
        {{ submitting ? "Submitting…" : "Vote anonymously" }}
      </button>
    </div>

    <div
      v-else
      class="mb-8 rounded-2xl border border-gold/30 bg-gold/10 px-5 py-4 text-sm font-medium text-gray-800 dark:text-cream"
    >
      Thank you — your response has been recorded. (One vote per browser.)
    </div>

    <div v-if="loading" class="py-8 text-center text-sm text-gray-500 dark:text-cream/50">
      Loading results…
    </div>
    <p v-else-if="error" class="text-sm text-red-500">{{ error }}</p>

    <div v-else class="space-y-3">
      <div
        v-for="genre in genres"
        :key="genre.id"
        class="group"
      >
        <div class="mb-1 flex items-center justify-between text-xs">
          <span class="font-medium text-gray-700 dark:text-cream/75">{{ genre.label }}</span>
          <span class="text-gray-500 dark:text-cream/45">
            {{ countsByGenre[genre.id] }}
            <span class="hidden sm:inline">
              ({{ totalResponses ? Math.round((countsByGenre[genre.id] / totalResponses) * 100) : 0 }}%)
            </span>
          </span>
        </div>
        <div class="h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
          <div
            class="h-full rounded-full bg-gradient-to-r transition-all duration-700"
            :class="genre.color"
            :style="{ width: `${(countsByGenre[genre.id] / maxCount) * 100}%`, minWidth: countsByGenre[genre.id] ? '4px' : '0' }"
            :title="`${countsByGenre[genre.id]} votes`"
          />
        </div>
      </div>

      <p v-if="totalResponses === 0" class="pt-2 text-center text-sm text-gray-500 dark:text-cream/50">
        No responses yet — be the first to vote.
      </p>
    </div>
  </section>
</template>

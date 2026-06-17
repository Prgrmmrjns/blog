<script setup lang="ts">
const props = defineProps<{
  topics: string[];
  modelValue: string | null;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string | null];
}>();

const { t } = useLocale();

function select(topic: string | null) {
  emit("update:modelValue", topic);
}
</script>

<template>
  <div v-if="topics.length > 0" class="mb-10">
    <p class="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-cream/40">
      {{ t("blog.filterByTopic") }}
    </p>
    <div class="flex flex-wrap gap-2">
      <button
        type="button"
        class="rounded-full px-3 py-1.5 text-xs font-semibold transition-colors"
        :class="
          modelValue === null
            ? 'bg-teal text-white dark:bg-mint dark:text-[#0e0e0e]'
            : 'bg-gray-200/80 text-gray-700 hover:bg-teal/15 hover:text-teal dark:bg-white/10 dark:text-cream/70 dark:hover:bg-mint/10 dark:hover:text-mint'
        "
        @click="select(null)"
      >
        {{ t("blog.filterAll") }}
      </button>
      <button
        v-for="topic in topics"
        :key="topic"
        type="button"
        class="rounded-full px-3 py-1.5 text-xs font-semibold transition-colors"
        :class="
          modelValue === topic
            ? 'bg-gold/25 text-gold ring-1 ring-gold/30'
            : 'bg-gold/10 text-gold/80 hover:bg-gold/20 dark:bg-gold/10 dark:text-gold dark:hover:bg-gold/20'
        "
        @click="select(topic)"
      >
        {{ topic }}
      </button>
    </div>
  </div>
</template>

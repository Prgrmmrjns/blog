<script setup lang="ts">
import { getPostTopics, topicLabel } from "~/utils/blogTopics";

const props = defineProps<{
  title: string;
  excerpt: string;
  date: string;
  topics?: string[];
  tags?: string[];
  slug: string;
  to: string;
}>();

const topicLabels = computed(() =>
  getPostTopics(props).slice(0, 2).map((key) => topicLabel(key)),
);
</script>

<template>
  <NuxtLink
    :to="to"
    class="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:scale-[1.01] hover:shadow-xl dark:bg-[#161616] dark:shadow-none dark:hover:shadow-[0_20px_60px_-10px_rgba(122,218,165,0.15)]"
  >
    <div class="relative aspect-[16/9] shrink-0 overflow-hidden bg-[#f5f3eb] dark:bg-[#121212]">
      <BlogPostHero :slug="slug" compact />
    </div>

    <div class="flex flex-1 flex-col p-6">
      <div v-if="topicLabels.length" class="mb-2 flex flex-wrap gap-2">
        <span
          v-for="label in topicLabels"
          :key="label"
          class="rounded-full bg-gold/20 px-2 py-0.5 text-xs font-semibold text-gold"
        >
          {{ label }}
        </span>
      </div>
      <h3 class="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-teal dark:text-cream dark:group-hover:text-mint sm:text-2xl">
        {{ title }}
      </h3>
      <p class="mt-2 flex-1 text-sm font-light leading-relaxed text-gray-600 line-clamp-2 dark:text-cream/50">
        {{ excerpt }}
      </p>
      <p class="mt-4 text-xs text-gray-500 dark:text-cream/40">
        {{ date }}
      </p>
    </div>
  </NuxtLink>
</template>

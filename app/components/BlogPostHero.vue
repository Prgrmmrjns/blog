<script setup lang="ts">
import BlogHeroBooks from "./BlogHeroBooks.vue";
import BlogHeroGradientBoosting from "./BlogHeroGradientBoosting.vue";
import BlogHeroHealthMonitoring from "./BlogHeroHealthMonitoring.vue";

const props = defineProps<{
  slug: string;
  compact?: boolean;
}>();

const heroes: Record<string, Component> = {
  "xgboost-vs-lightgbm-vs-catboost": BlogHeroGradientBoosting,
  "health-monitoring-and-ml-in-diabetes-research": BlogHeroHealthMonitoring,
  "my-top-10-books-and-why-i-love-them": BlogHeroBooks,
};

const heroComponent = computed(() => heroes[props.slug] ?? null);
</script>

<template>
  <component
    :is="heroComponent"
    v-if="heroComponent"
    :compact="compact"
  />
  <div
    v-else
    class="flex h-full w-full items-center justify-center bg-teal/10 text-4xl text-teal/40"
  >
    #
  </div>
</template>

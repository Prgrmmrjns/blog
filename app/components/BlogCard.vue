<script setup lang="ts">
defineProps<{
  title: string;
  excerpt: string;
  date: string;
  tags?: string[];
  image?: string | null;
  to: string;
}>();
</script>

<template>
  <NuxtLink
    :to="to"
    class="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:scale-[1.01] hover:shadow-xl dark:bg-[#161616] dark:shadow-none dark:hover:shadow-[0_20px_60px_-10px_rgba(122,218,165,0.15)]"
  >
    <div class="relative aspect-[16/9] shrink-0 overflow-hidden">
      <img
        v-if="image"
        :src="image"
        :alt="title"
        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div
        v-else
        class="flex h-full w-full items-center justify-center bg-teal/10 text-4xl text-teal/40"
      >
        #
      </div>
    </div>

    <div class="flex flex-1 flex-col p-6">
      <div class="mb-2 flex flex-wrap gap-2">
        <span
          v-for="tag in (tags ?? []).slice(0, 2)"
          :key="tag"
          class="rounded-full bg-gold/20 px-2 py-0.5 text-xs font-semibold text-gold"
        >
          {{ tag }}
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

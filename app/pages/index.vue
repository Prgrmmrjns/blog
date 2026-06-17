<script setup lang="ts">
const { t, locale } = useLocale();
const { listPosts } = useBlogPosts();

const { data: posts } = await useAsyncData(
  () => `posts-list-${locale.value}`,
  () => listPosts(),
  { watch: [locale] },
);

const postsRef = computed(() => posts.value);
const { selectedTopic, allTopics, filteredPosts } = usePostTopicFilter(postsRef);

watch(locale, () => {
  selectedTopic.value = null;
});
</script>

<template>
  <div class="min-h-screen bg-[#f5f3eb] dark:bg-[#0e0e0e]">
    <header class="relative overflow-hidden px-6 pb-16 pt-12 lg:pb-20 lg:pt-16">
      <div class="absolute inset-0 bg-gradient-to-b from-teal/10 via-transparent to-transparent" />
      <div class="absolute -right-20 top-10 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
      <div class="absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-teal/10 blur-3xl" />

      <div class="relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div class="text-center lg:text-left">
          <p class="mb-4 text-sm font-medium tracking-[0.3em] uppercase text-teal dark:text-mint">
            {{ t("home.tagline") }}
          </p>
          <h1 class="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-cream sm:text-6xl lg:text-7xl">
            Jonas Wolber
          </h1>
          <p class="mt-6 text-lg font-light leading-relaxed text-gray-600 dark:text-cream/60">
            {{ t("home.motto") }}<br />
            {{ t("home.subtitle") }}
          </p>
          <div class="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent lg:mx-0" />
        </div>

        <CoffeeLaptopHero />
      </div>
    </header>

    <main class="mx-auto max-w-7xl px-6 pb-32">
      <h2 class="mb-6 text-xl font-bold text-gold">{{ t("home.latestPosts") }}</h2>

      <BlogTopicFilter v-model="selectedTopic" :topics="allTopics" />

      <div v-if="filteredPosts.length > 0" class="grid gap-10 sm:grid-cols-2">
        <BlogCard
          v-for="post in filteredPosts"
          :key="post.path"
          :to="`/blog/${post.slug}`"
          :slug="post.slug"
          :title="post.title"
          :excerpt="post.excerpt"
          :date="post.date"
          :tags="post.tags"
        />
      </div>
      <p v-else class="rounded-2xl border border-gray-200 bg-white/80 px-6 py-12 text-center text-sm text-gray-600 dark:border-white/10 dark:bg-[#161616]/80 dark:text-cream/50">
        {{ t("blog.noPostsForTopic") }}
      </p>
    </main>

    <footer class="border-t border-gray-200 py-12 text-center text-xs text-gray-500 dark:border-white/5 dark:text-cream/30">
      {{ t("meta.footer") }}
    </footer>
  </div>
</template>

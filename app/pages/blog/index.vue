<script setup lang="ts">
const { t } = useLocale();
const { pending, selectedTopic, allTopics, filteredPosts } = await useBlogPostList("blog-posts");

useHead(() => ({
  title: `Blog — Jonas Wolber`,
  meta: [{ name: "description", content: t("blog.metaDescription") }],
}));
</script>

<template>
  <div class="min-h-screen bg-[#f5f3eb] dark:bg-[#0e0e0e]">
    <header class="px-6 py-24 text-center">
      <h1 class="text-4xl font-extrabold text-gray-900 dark:text-cream sm:text-5xl">
        {{ t("blog.title") }}
      </h1>
      <p class="mt-4 text-lg text-gray-600 dark:text-cream/60">
        {{ t("blog.subtitle") }}
      </p>
    </header>

    <main class="mx-auto max-w-7xl px-6 pb-32">
      <BlogTopicFilter v-model="selectedTopic" :topics="allTopics" />

      <p
        v-if="pending"
        class="rounded-2xl border border-gray-200 bg-white/80 px-6 py-12 text-center text-sm text-gray-600 dark:border-white/10 dark:bg-[#161616]/80 dark:text-cream/50"
      >
        {{ t("blog.loadingPosts") }}
      </p>
      <div v-else-if="filteredPosts.length > 0" class="grid gap-10 sm:grid-cols-2">
        <BlogCard
          v-for="post in filteredPosts"
          :key="post.path"
          :to="`/blog/${post.slug}`"
          :slug="post.slug"
          :title="post.title"
          :excerpt="post.excerpt"
          :date="post.date"
          :topics="post.topics"
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

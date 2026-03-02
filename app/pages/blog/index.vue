<script setup lang="ts">
const { data: posts } = await useAsyncData("blog-posts", () =>
  queryCollection("posts").order("date", "DESC").all()
);

useHead({
  title: "Blog — Jonas Wolber",
  meta: [{ name: "description", content: "Latest posts on science, AI, programming, medicine, health and fitness." }],
});
</script>

<template>
  <div class="min-h-screen bg-[#f5f3eb] dark:bg-[#0e0e0e]">
    <header class="py-24 px-6 text-center">
      <h1 class="text-4xl font-extrabold text-gray-900 dark:text-cream sm:text-5xl">
        Blog
      </h1>
      <p class="mt-4 text-lg text-gray-600 dark:text-cream/60">
        Science · AI · Programming · Medicine · Health & Fitness
      </p>
    </header>

    <main class="mx-auto max-w-7xl px-6 pb-32">
      <div class="grid gap-10 sm:grid-cols-2">
        <BlogCard
          v-for="post in posts ?? []"
          :key="post.path"
          :to="post.path"
          :title="post.title"
          :excerpt="post.excerpt"
          :date="post.date"
          :tags="post.tags"
          :image="post.image"
        />
      </div>
    </main>

    <footer class="border-t border-gray-200 py-12 text-center text-xs text-gray-500 dark:border-white/5 dark:text-cream/30">
      Jonas Wolber · Curiosity is all you need.
    </footer>
  </div>
</template>

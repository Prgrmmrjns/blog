<script setup lang="ts">
const { data: posts } = await useAsyncData("posts-list", () =>
  queryCollection("posts").order("date", "DESC").all()
);
</script>

<template>
  <div class="min-h-screen bg-[#f5f3eb] dark:bg-[#0e0e0e]">
    <!-- Header -->
    <header class="relative overflow-hidden py-24 px-6 text-center">
      <div class="absolute inset-0 bg-gradient-to-b from-teal/10 via-transparent to-transparent" />
      <div class="relative z-10 mx-auto max-w-3xl">
        <p class="mb-4 text-sm font-medium tracking-[0.3em] uppercase text-teal dark:text-mint">
          Science · AI · Programming · Medicine · Health & Fitness
        </p>
        <h1 class="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-cream sm:text-7xl">
          Jonas Wolber
        </h1>
        <p class="mt-6 text-lg font-light leading-relaxed text-gray-600 dark:text-cream/60">
          Curiosity is all you need.<br />
          Doctoral student in Computational Biomedicine · RWTH Aachen
        </p>
        <div class="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
      </div>
    </header>

    <!-- Latest Posts -->
    <main class="mx-auto max-w-7xl px-6 pb-32">
      <h2 class="mb-10 text-xl font-bold text-gold">Latest posts</h2>
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

    <!-- Footer -->
    <footer class="border-t border-gray-200 py-12 text-center text-xs text-gray-500 dark:border-white/5 dark:text-cream/30">
      Jonas Wolber · Curiosity is all you need.
    </footer>
  </div>
</template>

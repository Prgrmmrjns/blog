<script setup lang="ts">
const { t } = useLocale();
const { pending, selectedTopic, allTopics, filteredPosts } = useBlogPostList("home-posts");
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
      <section class="relative mb-16 overflow-hidden rounded-[2rem] border border-gray-200 bg-white/90 px-6 py-12 shadow-sm dark:border-white/10 dark:bg-[#161616]/90 sm:px-10 sm:py-16 lg:mb-20 lg:px-14 lg:py-20">
        <div class="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
        <div class="pointer-events-none absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-teal/15 blur-3xl" />
        <div class="relative z-10 max-w-3xl">
          <p class="text-xs font-bold uppercase tracking-[0.28em] text-teal dark:text-mint">
            {{ t("home.freelanceLabel") }}
          </p>
          <h2 class="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-gray-900 dark:text-cream sm:text-5xl lg:text-6xl">
            {{ t("home.freelanceTitle") }}
          </h2>
          <p class="mt-6 max-w-2xl text-lg font-light leading-relaxed text-gray-600 dark:text-cream/65 sm:text-xl">
            {{ t("home.freelanceLead") }}
          </p>
          <NuxtLink
            to="/freelancing"
            class="mt-8 inline-flex items-center gap-2 rounded-full bg-teal px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-dark dark:bg-mint dark:text-[#0e0e0e] dark:hover:bg-mint-dark"
          >
            {{ t("home.freelanceCta") }}
            <span aria-hidden="true">→</span>
          </NuxtLink>
        </div>
      </section>

      <h2 class="mb-6 text-xl font-bold text-gold">{{ t("home.latestPosts") }}</h2>

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
      <p v-else-if="selectedTopic" class="rounded-2xl border border-gray-200 bg-white/80 px-6 py-12 text-center text-sm text-gray-600 dark:border-white/10 dark:bg-[#161616]/80 dark:text-cream/50">
        {{ t("blog.noPostsForTopic") }}
      </p>
    </main>

    <footer class="border-t border-gray-200 py-12 text-center text-xs text-gray-500 dark:border-white/5 dark:text-cream/30">
      {{ t("meta.footer") }}
    </footer>
  </div>
</template>

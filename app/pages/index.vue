<script setup lang="ts">
import { freelanceCases, type FreelanceCaseId } from "~/data/freelance-cases";

const { t, tm } = useLocale();
const { pending, selectedTopic, allTopics, filteredPosts } = useBlogPostList("home-posts");
const caseTitles = computed(() =>
  tm<Record<FreelanceCaseId, { title: string; text: string }>>("freelancing.cases"),
);
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

      <p
        v-if="pending"
        class="mb-16 rounded-2xl border border-gray-200 bg-white/80 px-6 py-12 text-center text-sm text-gray-600 dark:border-white/10 dark:bg-[#161616]/80 dark:text-cream/50 lg:mb-20"
      >
        {{ t("blog.loadingPosts") }}
      </p>
      <div v-else-if="filteredPosts.length > 0" class="mb-16 grid gap-10 sm:grid-cols-2 lg:mb-20">
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
      <p
        v-else
        class="mb-16 rounded-2xl border border-gray-200 bg-white/80 px-6 py-12 text-center text-sm text-gray-600 dark:border-white/10 dark:bg-[#161616]/80 dark:text-cream/50 lg:mb-20"
      >
        {{ selectedTopic ? t("blog.noPostsForTopic") : t("blog.emptyPosts") }}
      </p>

      <section class="relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white/90 px-6 py-8 shadow-sm dark:border-white/10 dark:bg-[#161616]/90 sm:px-8 sm:py-10">
        <div class="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/15 blur-3xl" />
        <div class="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-teal/10 blur-3xl" />
        <div class="relative z-10 grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.28em] text-teal dark:text-mint">
              {{ t("home.freelanceLabel") }}
            </p>
            <h2 class="mt-3 font-display text-3xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-cream sm:text-4xl">
              {{ t("home.freelanceTitle") }}
            </h2>
            <p class="mt-4 max-w-xl text-base font-light leading-relaxed text-gray-600 dark:text-cream/65 sm:text-lg">
              {{ t("home.freelanceLead") }}
            </p>
            <div class="mt-6 flex flex-wrap items-center gap-3">
              <NuxtLink
                to="/freelancing"
                class="inline-flex items-center gap-2 rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-dark dark:bg-mint dark:text-[#0e0e0e] dark:hover:bg-mint-dark"
              >
                {{ t("home.freelanceCta") }}
                <span aria-hidden="true">→</span>
              </NuxtLink>
              <a
                href="https://www.linkedin.com/in/jonas-wolber/"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-800 transition hover:border-teal/40 hover:text-teal dark:border-white/15 dark:text-cream dark:hover:border-mint/40 dark:hover:text-mint"
              >
                {{ t("home.freelanceLinkedin") }}
                <span aria-hidden="true">↗</span>
              </a>
              <NuxtLink
                to="/contact"
                class="text-sm font-semibold text-teal underline-offset-4 hover:underline dark:text-mint"
              >
                {{ t("home.freelanceContact") }}
              </NuxtLink>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-2">
            <NuxtLink
              v-for="item in freelanceCases"
              :key="item.id"
              :to="`/freelancing/${item.id}`"
              class="group overflow-hidden rounded-xl border border-gray-200/80 bg-[#efece3] dark:border-white/10 dark:bg-[#121212]"
            >
              <img
                :src="item.image"
                :alt="caseTitles[item.id].title"
                class="aspect-[16/9] w-full object-cover transition duration-300 group-hover:scale-105"
                width="320"
                height="180"
              />
            </NuxtLink>
          </div>
        </div>
      </section>
    </main>

    <footer class="border-t border-gray-200 py-12 text-center text-xs text-gray-500 dark:border-white/5 dark:text-cream/30">
      {{ t("meta.footer") }}
    </footer>
  </div>
</template>

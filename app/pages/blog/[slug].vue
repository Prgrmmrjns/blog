<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string;
const { t, locale } = useLocale();
const { getPost } = useBlogPosts();

const { data: post } = await useAsyncData(
  () => `post-${slug}-${locale.value}`,
  () => getPost(slug),
  { watch: [locale] },
);

const topicLabels = computed(() => {
  if (!post.value) return [];
  return getPostTopics(post.value).map((key) => translateTopic(key, locale.value));
});

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: t("blog.postNotFound") });
}

useHead(() => ({
  title: `${post.value?.title ?? ""} — Jonas Wolber`,
  meta: [{ name: "description", content: post.value?.excerpt ?? "" }],
}));
</script>

<template>
  <div v-if="post" class="min-h-screen bg-[#f5f3eb] dark:bg-[#0e0e0e]">
    <div class="relative flex h-[40vh] min-h-[280px] w-full items-center justify-center overflow-hidden bg-[#f5f3eb] dark:bg-[#121212]">
      <BlogPostHero :slug="slug" />
    </div>

    <div class="border-b border-gray-200 bg-[#f5f3eb] px-8 py-10 dark:border-white/5 dark:bg-[#0e0e0e] sm:px-12">
      <div class="mx-auto max-w-4xl">
        <NuxtLink
          to="/"
          class="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-teal dark:text-cream/50 dark:hover:text-mint"
        >
          <IconArrowLeft class="h-4 w-4" />
          {{ t("blog.back") }}
        </NuxtLink>
        <h1 class="text-3xl font-extrabold leading-tight text-gray-900 dark:text-cream sm:text-5xl">
          {{ post.title }}
        </h1>
        <div class="mt-4 flex flex-wrap items-center gap-4 text-gray-600 dark:text-cream/60">
          <span>{{ post.date }}</span>
          <span
            v-for="label in topicLabels"
            :key="label"
            class="rounded-full bg-gold/20 px-2.5 py-1 text-xs font-semibold text-gold"
          >
            {{ label }}
          </span>
        </div>
      </div>
    </div>

    <article class="mx-auto max-w-3xl px-8 py-16 sm:px-12">
      <div class="prose prose-gray-900 max-w-none dark:prose-invert dark:prose-cream">
        <ContentRenderer v-if="post.body" :value="post" />
      </div>

      <BlogComments :post-slug="slug" />
    </article>

    <footer class="border-t border-gray-200 py-12 text-center text-xs text-gray-500 dark:border-white/5 dark:text-cream/30">
      {{ t("meta.footer") }}
    </footer>
  </div>
</template>

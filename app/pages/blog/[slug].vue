<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string;

const { data: post } = await useAsyncData(`post-${slug}`, () =>
  queryCollection("posts").path(`/blog/${slug}`).first()
);

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: "Post not found" });
}

useHead({
  title: `${post.value.title} — Jonas Wolber`,
  meta: [{ name: "description", content: post.value.excerpt }],
});
</script>

<template>
  <div v-if="post" class="min-h-screen bg-[#f5f3eb] dark:bg-[#0e0e0e]">
    <!-- Hero image only -->
    <div class="relative h-[40vh] min-h-[280px] w-full overflow-hidden">
      <img
        v-if="post.image"
        :src="post.image"
        :alt="post.title"
        class="h-full w-full object-cover"
      />
      <div v-else class="flex h-full w-full items-center justify-center bg-teal/10 text-6xl text-teal/30">
        #
      </div>
    </div>

    <!-- Title block - below image, no overlap -->
    <div class="border-b border-gray-200 bg-[#f5f3eb] px-8 py-10 dark:border-white/5 dark:bg-[#0e0e0e] sm:px-12">
      <div class="mx-auto max-w-4xl">
        <NuxtLink
          to="/"
          class="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-teal dark:text-cream/50 dark:hover:text-mint"
        >
          <IconArrowLeft class="h-4 w-4" />
          Back
        </NuxtLink>
        <h1 class="text-3xl font-extrabold leading-tight text-gray-900 dark:text-cream sm:text-5xl">
          {{ post.title }}
        </h1>
        <div class="mt-4 flex flex-wrap items-center gap-4 text-gray-600 dark:text-cream/60">
          <span>{{ post.date }}</span>
          <span
            v-for="tag in post.tags ?? []"
            :key="tag"
            class="rounded-full bg-gold/20 px-2.5 py-1 text-xs font-semibold text-gold"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>

    <!-- Content -->
    <article class="mx-auto max-w-3xl px-8 py-16 sm:px-12">
      <div class="prose prose-gray-900 max-w-none dark:prose-invert dark:prose-cream">
        <ContentRenderer v-if="post.body" :value="post" />
      </div>

      <BlogComments :post-slug="slug" />
    </article>

    <!-- Footer -->
    <footer class="border-t border-gray-200 py-12 text-center text-xs text-gray-500 dark:border-white/5 dark:text-cream/30">
      Jonas Wolber · Curiosity is all you need.
    </footer>
  </div>
</template>

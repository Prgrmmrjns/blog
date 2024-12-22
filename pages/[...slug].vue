<template>
  <main>
    <ContentDoc v-slot="{ doc }">
      <!-- Hero Section with Image -->
      <div class="relative h-[400px] mb-8">
        <img 
          :src="doc.image || 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144'"
          :alt="doc.title"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent flex items-end">
          <div class="container mx-auto px-4 py-12">
            <div class="max-w-3xl">
              <div class="text-gray-300 mb-4 flex items-center gap-4">
                <span class="flex items-center gap-2">
                  <UIcon name="i-heroicons-calendar" />
                  {{ formatDate(doc.date) }}
                </span>
                <span class="flex items-center gap-2">
                  <UIcon name="i-heroicons-tag" />
                  {{ doc.topic }}
                </span>
              </div>
              <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
                {{ doc.title }}
              </h1>
              <p class="text-xl text-gray-200">
                {{ doc.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Section -->
      <article class="container mx-auto px-4 py-8">
        <div class="max-w-3xl mx-auto prose prose-lg prose-gray">
          <ContentRenderer :value="doc" />
        </div>
      </article>

      <!-- Navigation -->
      <div class="container mx-auto px-4 py-8 border-t border-gray-200">
        <div class="max-w-3xl mx-auto flex justify-between">
          <NuxtLink 
            to="/blog"
            class="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <UIcon name="i-heroicons-arrow-left" />
            Back to Blog
          </NuxtLink>
        </div>
      </div>

      <!-- Add Comments section -->
      <Comments />
    </ContentDoc>
  </main>
</template>

<script setup lang="ts">
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style>
.prose h1 {
  @apply text-3xl font-bold mb-6;
}
.prose h2 {
  @apply text-2xl font-bold mt-8 mb-4;
}
.prose p {
  @apply mb-4 leading-relaxed;
}
.prose a {
  @apply text-blue-600 hover:text-blue-800;
}
</style>

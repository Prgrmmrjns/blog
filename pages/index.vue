<template>
  <div class="min-h-screen bg-gray-50">
    <main class="container mx-auto px-4 py-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">AI in Healthcare</h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Exploring the latest developments and applications of artificial intelligence in medicine and healthcare
        </p>
      </div>

      <div class="relative h-[400px] mb-12 rounded-xl overflow-hidden shadow-xl">
        <img 
          src="https://images.unsplash.com/photo-1584036561566-baf8f5f1b144" 
          alt="AI in Healthcare" 
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div class="p-8 text-white">
            <h2 class="text-3xl font-bold mb-2">Transforming Healthcare with AI</h2>
            <p class="text-lg">Discover how artificial intelligence is revolutionizing medical diagnosis, treatment, and patient care</p>
          </div>
        </div>
      </div>

      <div class="flex justify-center mb-8">
        <h2 class="text-2xl font-bold text-gray-900">Latest Blog Entries</h2>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <template v-if="posts">
          <NuxtLink 
            v-for="post in posts" 
            :key="post._path"
            :to="post._path"
            class="transition-transform hover:-translate-y-1"
          >
            <BlogCard
              :imageUrl="post.image ?? 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144'"
              :title="post.title ?? 'Untitled Post'"
              :description="post.description ?? 'No description available'"
            />
          </NuxtLink>
        </template>
        <template v-else>
          <p class="text-gray-600 col-span-full text-center py-12">
            Loading blog posts...
          </p>
        </template>
      </div>

      <div class="flex justify-center mt-8">
        <NuxtLink 
          to="/blog"
          class="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          View All Posts
          <UIcon name="i-heroicons-arrow-right" />
        </NuxtLink>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import BlogCard from '~/components/BlogCard.vue'
import type { BlogPost } from '~/types/blog'

// Fetch the latest 3 blog posts from the content directory
const { data: posts } = await useAsyncData<BlogPost[]>('latest-posts', () => 
  queryContent<BlogPost>('blog')
    .sort({ date: -1 }) // Sort by date descending
    .limit(3) // Only get the latest 3 posts
    .find()
)
</script>
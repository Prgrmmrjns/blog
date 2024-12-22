<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="relative h-[300px] mb-12">
      <img 
        src="https://images.unsplash.com/photo-1532094349884-543bc11b234d"
        alt="AI Healthcare Blog" 
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent flex items-center">
        <div class="container mx-auto px-4">
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
            Healthcare AI Blog
          </h1>
          <p class="text-xl text-gray-200 max-w-2xl">
            Explore the latest insights and developments in AI-powered healthcare
          </p>
        </div>
      </div>
    </div>

    <!-- Blog Grid -->
    <main class="container mx-auto px-4 py-8">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    </main>
  </div>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/types/blog'

// Fetch all blog posts from the content directory
const { data: posts } = await useAsyncData<BlogPost[]>('posts', () => 
  queryContent<BlogPost>('blog')
    .sort({ date: -1 }) // Sort by date descending
    .find()
)
</script> 
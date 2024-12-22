<template>
  <UCard>
    <template #header>
      <img :src="imageUrl" :alt="title" class="h-48 w-full object-cover"/>
    </template>
    <h3 class="text-xl font-semibold mb-2">{{ title }}</h3>
    <p class="text-gray-600">{{ description }}</p>
  </UCard>
</template>

<script setup lang="ts">
defineProps<{
  imageUrl: string
  title: string
  description: string
}>()
</script> 
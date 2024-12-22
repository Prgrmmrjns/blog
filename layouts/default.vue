<template>
  <div class="min-h-screen bg-gray-50">
    <UHorizontalNavigation :links="links" class="border-b border-gray-200 bg-white shadow-sm"/>
    <slot />
  </div>
</template>

<script setup lang="ts">
const links = [
  [{
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/'
  }, {
    label: 'Blog',
    icon: 'i-heroicons-newspaper',
    to: '/blog'
  }, ], [{
    label: 'About',
    icon: 'i-heroicons-information-circle',
    to: '/about'
  }, {
    label: 'Contact',
    icon: 'i-heroicons-envelope',
    to: '/contact'
  }]
]
</script> 
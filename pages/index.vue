<template>
  <div>
    <UHorizontalNavigation :links="links" class="border-b border-gray-2000"/>
    <h1>Hello World</h1>
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
    icon: 'i-heroicons-chart-bar',
    to: '/components/horizontal-navigation'
  }, {
    label: 'Forum',
    icon: 'i-heroicons-command-line',
    to: '/components/command-palette'
  }], [{
    label: 'About',
    icon: 'i-heroicons-light-bulb'
  }, {
    label: 'Contact',
    icon: 'i-heroicons-question-mark-circle'
  }]
]
</script>
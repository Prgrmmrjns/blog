<script setup lang="ts">
const { isDark, toggle } = useTheme();

const links = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];
</script>

<template>
  <nav class="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-[#f5f3eb]/90 backdrop-blur-md transition-colors dark:border-white/5 dark:bg-[#0e0e0e]/80">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
      <NuxtLink
        to="/"
        class="text-lg font-bold text-gray-900 transition-colors hover:text-teal dark:text-cream dark:hover:text-mint"
      >
        Jonas Wolber
      </NuxtLink>
      <div class="flex items-center gap-8">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          :exact="link.to === '/'"
          class="text-sm font-medium text-gray-600 transition-colors hover:text-teal dark:text-cream/70 dark:hover:text-mint"
          active-class="!text-teal dark:!text-mint"
        >
          {{ link.label }}
        </NuxtLink>
        <div class="h-5 w-px bg-gray-300 dark:bg-white/20" aria-hidden="true" />
        <button
          type="button"
          aria-label="Toggle dark mode"
          class="-m-2 rounded-lg p-2.5 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-cream/70 dark:hover:bg-white/10 dark:hover:text-cream"
          @click="toggle"
        >
          <span v-if="isDark" class="text-lg">☀️</span>
          <span v-else class="text-lg">🌙</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute();
const { t } = useLocale();

const links = computed(() => [
  { to: "/blog", label: t("nav.blog"), hard: true },
  { to: "/about", label: t("nav.about"), hard: false },
  { to: "/contact", label: t("nav.contact"), hard: false },
]);

function navigateHard(path: string) {
  if (!import.meta.client) return;
  window.location.assign(path);
}

function isActive(path: string) {
  return route.path === path || route.path.startsWith(`${path}/`);
}
</script>

<template>
  <nav class="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-[#f5f3eb]/90 backdrop-blur-md transition-colors dark:border-white/5 dark:bg-[#0e0e0e]/80">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
      <NuxtLink
        to="/"
        :aria-label="t('meta.homeAria')"
        class="text-gray-900 transition-colors hover:text-teal dark:text-cream dark:hover:text-mint"
      >
        <SiteLogo />
      </NuxtLink>
      <div class="flex items-center gap-4 sm:gap-6">
        <template v-for="link in links" :key="link.to">
          <a
            v-if="link.hard"
            :href="link.to"
            class="text-sm font-medium text-gray-600 transition-colors hover:text-teal dark:text-cream/70 dark:hover:text-mint"
            :class="isActive(link.to) ? '!text-teal dark:!text-mint' : ''"
            @click.prevent="navigateHard(link.to)"
          >
            {{ link.label }}
          </a>
          <NuxtLink
            v-else
            :to="link.to"
            class="text-sm font-medium text-gray-600 transition-colors hover:text-teal dark:text-cream/70 dark:hover:text-mint"
            active-class="!text-teal dark:!text-mint"
          >
            {{ link.label }}
          </NuxtLink>
        </template>
        <div class="h-5 w-px bg-gray-300 dark:bg-white/20" aria-hidden="true" />
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </div>
  </nav>
</template>

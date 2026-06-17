<script setup lang="ts">
const { isDark, setTheme } = useTheme();
const { t } = useLocale();

const themes = computed(() => [
  { dark: false, label: t("meta.lightMode"), icon: "☀️" },
  { dark: true, label: t("meta.darkMode"), icon: "🌙" },
]);
</script>

<template>
  <div
    class="flex items-center gap-0.5 rounded-lg border border-gray-200 bg-white/80 p-0.5 dark:border-white/10 dark:bg-[#161616]/80"
    role="group"
    :aria-label="t('meta.selectTheme')"
  >
    <button
      v-for="theme in themes"
      :key="theme.dark ? 'dark' : 'light'"
      type="button"
      class="rounded-md px-2 py-1 text-lg leading-none transition-all"
      :class="
        isDark === theme.dark
          ? 'bg-teal ring-1 ring-teal/30 dark:bg-mint dark:ring-mint/30'
          : 'opacity-60 hover:opacity-100'
      "
      :aria-label="theme.label"
      :aria-pressed="isDark === theme.dark"
      @click="setTheme(theme.dark)"
    >
      <span aria-hidden="true">{{ theme.icon }}</span>
    </button>
  </div>
</template>

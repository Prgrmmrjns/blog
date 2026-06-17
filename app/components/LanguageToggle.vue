<script setup lang="ts">
import type { Locale } from "~/locales/en";
import { locales } from "~/locales/en";

const { locale, setLocale, t } = useLocale();

function select(next: Locale) {
  setLocale(next);
}
</script>

<template>
  <div
    class="flex items-center gap-0.5 rounded-lg border border-gray-200 bg-white/80 p-0.5 dark:border-white/10 dark:bg-[#161616]/80"
    role="group"
    :aria-label="t('meta.selectLanguage')"
  >
    <button
      v-for="item in locales"
      :key="item.code"
      type="button"
      class="rounded-md px-2 py-1 text-lg leading-none transition-all"
      :class="
        locale === item.code
          ? 'bg-teal ring-1 ring-teal/30 dark:bg-mint dark:ring-mint/30'
          : 'opacity-60 hover:opacity-100'
      "
      :aria-label="item.label"
      :aria-pressed="locale === item.code"
      @click="select(item.code)"
    >
      <span aria-hidden="true">{{ item.flag }}</span>
    </button>
  </div>
</template>

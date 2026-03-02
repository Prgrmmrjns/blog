<script setup lang="ts">
defineProps<{
  label: string;
  value: string;
}>();
</script>

<template>
  <div class="flex items-center gap-2 text-sm text-cream/60">
    <span class="text-teal">
      <slot />
    </span>
    <span class="font-light">{{ label }}:</span>
    <span class="font-semibold text-cream">{{ value }}</span>
  </div>
</template>

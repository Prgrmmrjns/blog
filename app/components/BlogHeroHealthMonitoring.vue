<script setup lang="ts">
defineProps<{ compact?: boolean }>();

const { t } = useLocale();
const { reducedMotion } = useReducedMotion();
const isScanning = ref(false);
let scanTimer: ReturnType<typeof setTimeout> | null = null;

function startScan() {
  if (reducedMotion.value) return;
  if (scanTimer) clearTimeout(scanTimer);
  isScanning.value = true;
}

function stopScan() {
  isScanning.value = false;
  if (scanTimer) {
    clearTimeout(scanTimer);
    scanTimer = null;
  }
}

function handleMealClick() {
  startScan();
  scanTimer = setTimeout(stopScan, 3500);
}
</script>

<template>
  <div
    class="health-hero relative mx-auto flex h-full w-full items-center justify-center select-none"
    :class="[
      compact ? 'max-h-full p-4' : 'max-w-[560px] p-6',
      {
        'health-hero--static': reducedMotion,
        'health-hero--animate': !reducedMotion,
        'health-hero--scanning': isScanning,
      },
    ]"
    aria-hidden="true"
  >
    <svg
      viewBox="0 0 480 320"
      class="h-full w-full max-h-full drop-shadow-lg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="health-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#239BA7" stop-opacity="0.1" />
          <stop offset="100%" stop-color="#E1AA36" stop-opacity="0.08" />
        </linearGradient>
        <linearGradient id="glucose-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#239BA7" />
          <stop offset="100%" stop-color="#E1AA36" />
        </linearGradient>
        <linearGradient id="plate-food" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E1AA36" />
          <stop offset="50%" stop-color="#7ADAA5" />
          <stop offset="100%" stop-color="#239BA7" />
        </linearGradient>
      </defs>

      <rect width="480" height="320" rx="16" fill="url(#health-bg)" />

      <!-- CGM monitor -->
      <g transform="translate(250, 50)">
        <rect x="0" y="0" width="200" height="140" rx="10" fill="#1a202c" />
        <rect x="8" y="8" width="184" height="100" rx="4" fill="#0e0e0e" />
        <text x="14" y="22" fill="#7ADAA5" font-size="8" font-family="monospace">CGM · mmol/L</text>

        <!-- Baseline glucose -->
        <polyline
          class="glucose-base"
          points="14,75 50,72 86,74 122,73"
          fill="none"
          stroke="#239BA7"
          stroke-width="2"
          stroke-linecap="round"
          opacity="0.6"
        />
        <!-- Spike after meal -->
        <polyline
          class="glucose-spike"
          points="122,73 140,55 158,40 176,48 194,65"
          fill="none"
          stroke="url(#glucose-line)"
          stroke-width="2.5"
          stroke-linecap="round"
          opacity="0"
        />

        <g class="spike-dot" opacity="0">
          <circle cx="158" cy="40" r="5" fill="#E1AA36" />
          <circle cx="158" cy="40" r="9" fill="#E1AA36" opacity="0.3" />
        </g>

        <text x="14" y="128" fill="#7ADAA5" font-size="8" font-family="monospace" opacity="0.5">predicted ↑</text>
      </g>

      <!-- Phone with meal photo -->
      <g
        class="meal-phone"
        transform="translate(55, 45)"
        @mouseenter="startScan"
        @mouseleave="stopScan"
        @click="handleMealClick"
      >
        <rect x="-10" y="-10" width="170" height="220" fill="transparent" class="meal-hit" />
        <rect x="0" y="0" width="150" height="200" rx="16" fill="#2d3748" />
        <rect x="8" y="12" width="134" height="160" rx="6" fill="#1a202c" />
        <!-- Plate -->
        <ellipse cx="75" cy="105" rx="48" ry="14" fill="#4a5568" />
        <ellipse cx="75" cy="100" rx="42" ry="12" fill="#718096" opacity="0.5" />
        <!-- Food blobs -->
        <circle cx="58" cy="92" r="14" fill="url(#plate-food)" class="food-item" />
        <circle cx="82" cy="88" r="11" fill="#E1AA36" class="food-item" />
        <ellipse cx="72" cy="108" rx="16" ry="8" fill="#7ADAA5" class="food-item" />
        <!-- Camera notch -->
        <rect x="60" y="4" width="30" height="5" rx="2.5" fill="#0e0e0e" />

        <!-- Scan overlay -->
        <g class="scan-overlay" opacity="0">
          <rect x="8" y="12" width="134" height="160" rx="6" fill="#7ADAA5" opacity="0.08" />
          <line class="scan-line" x1="8" y1="12" x2="142" y2="12" stroke="#7ADAA5" stroke-width="2" opacity="0.8" />
          <text x="75" y="185" text-anchor="middle" fill="#7ADAA5" font-size="8" font-family="monospace">Pixtral · macros</text>
        </g>
      </g>

      <!-- Connection beam -->
      <path
        class="data-beam"
        d="M205 120 Q230 100 250 110"
        fill="none"
        stroke="#7ADAA5"
        stroke-width="2"
        stroke-dasharray="6 4"
        opacity="0"
      />

      <!-- LLM sparkle -->
      <g class="ai-sparkle" opacity="0">
        <path d="M215 85 l3 8 l8 3 l-8 3 l-3 8 l-3-8 l-8-3 l8-3z" fill="#E1AA36" />
        <path d="M228 70 l2 5 l5 2 l-5 2 l-2 5 l-2-5 l-5-2 l5-2z" fill="#7ADAA5" />
      </g>

      <text
        v-if="!compact"
        x="240"
        y="300"
        text-anchor="middle"
        class="caption-hint fill-gray-500 dark:fill-cream/40"
        font-size="11"
        font-style="italic"
      >
        {{ t("heroes.healthHint") }}
      </text>
      <text
        v-if="!compact"
        x="240"
        y="300"
        text-anchor="middle"
        class="caption-active fill-gray-500 dark:fill-cream/40"
        font-size="11"
        font-style="italic"
      >
        {{ t("heroes.healthActive") }}
      </text>
    </svg>
  </div>
</template>

<style scoped>
.health-hero--animate .meal-hit {
  cursor: pointer;
}

.health-hero--animate .caption-active {
  opacity: 0;
}

.health-hero--animate .caption-hint {
  opacity: 0.55;
}

.health-hero--animate.health-hero--scanning .caption-hint {
  opacity: 0;
}

.health-hero--animate.health-hero--scanning .caption-active {
  animation: caption-fade 3.5s ease-in-out forwards;
}

.health-hero--animate.health-hero--scanning .scan-overlay {
  animation: scan-show 3.5s ease-in-out forwards;
}

.health-hero--animate.health-hero--scanning .scan-line {
  animation: scan-sweep 3.5s ease-in-out forwards;
}

.health-hero--animate.health-hero--scanning .glucose-spike {
  animation: spike-draw 3.5s ease-out forwards;
}

.health-hero--animate.health-hero--scanning .spike-dot {
  animation: dot-pop 3.5s ease-out forwards;
}

.health-hero--animate.health-hero--scanning .data-beam {
  animation: beam-pulse 3.5s ease-in-out forwards;
}

.health-hero--animate.health-hero--scanning .ai-sparkle {
  animation: sparkle-pop 3.5s ease-out forwards;
}

.health-hero--animate.health-hero--scanning .food-item {
  animation: food-glow 3.5s ease-in-out forwards;
}

@keyframes scan-show {
  0%, 5% { opacity: 0; }
  15%, 60% { opacity: 1; }
  75%, 100% { opacity: 0; }
}

@keyframes scan-sweep {
  0%, 8% { transform: translateY(0); opacity: 0; }
  15% { opacity: 1; }
  45% { transform: translateY(150px); opacity: 1; }
  55%, 100% { transform: translateY(150px); opacity: 0; }
}

@keyframes spike-draw {
  0%, 30% { opacity: 0; stroke-dasharray: 120; stroke-dashoffset: 120; }
  50% { opacity: 1; stroke-dashoffset: 0; }
  100% { opacity: 1; stroke-dashoffset: 0; }
}

@keyframes dot-pop {
  0%, 40% { opacity: 0; transform: scale(0); }
  55% { opacity: 1; transform: scale(1.2); }
  70%, 100% { opacity: 1; transform: scale(1); }
}

@keyframes beam-pulse {
  0%, 20% { opacity: 0; }
  30%, 65% { opacity: 0.7; }
  80%, 100% { opacity: 0; }
}

@keyframes sparkle-pop {
  0%, 15% { opacity: 0; transform: scale(0) rotate(0deg); }
  25% { opacity: 1; transform: scale(1.2) rotate(20deg); }
  40%, 100% { opacity: 0.8; transform: scale(1) rotate(0deg); }
}

@keyframes food-glow {
  0%, 100% { filter: brightness(1); }
  30% { filter: brightness(1.4); }
}

@keyframes caption-fade {
  0%, 35% { opacity: 0; }
  50% { opacity: 1; fill: #E1AA36; }
  100% { opacity: 0.7; }
}

.health-hero--static .glucose-spike,
.health-hero--static .spike-dot,
.health-hero--static .scan-overlay {
  opacity: 1;
}

.health-hero--static .glucose-spike {
  stroke-dashoffset: 0;
  opacity: 0.9;
}
</style>

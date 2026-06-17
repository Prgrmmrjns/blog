<script setup lang="ts">
defineProps<{ compact?: boolean }>();

const { t } = useLocale();
const { reducedMotion } = useReducedMotion();
const isBoosting = ref(false);
let boostTimer: ReturnType<typeof setTimeout> | null = null;

const uid = useId().replace(/:/g, "");

function startBoost() {
  if (reducedMotion.value) return;
  if (boostTimer) {
    clearTimeout(boostTimer);
    boostTimer = null;
  }
  isBoosting.value = true;
}

function stopBoost() {
  isBoosting.value = false;
  if (boostTimer) {
    clearTimeout(boostTimer);
    boostTimer = null;
  }
}

function handleBoost() {
  startBoost();
  boostTimer = setTimeout(stopBoost, 3000);
}
</script>

<template>
  <div
    class="boost-hero relative mx-auto flex h-full w-full items-center justify-center select-none"
    :class="[
      compact ? 'max-h-full p-4' : 'max-w-[560px] p-6',
      {
        'boost-hero--static': reducedMotion,
        'boost-hero--animate': !reducedMotion,
        'boost-hero--boosting': isBoosting,
      },
    ]"
    aria-hidden="true"
    @mouseenter="startBoost"
    @mouseleave="stopBoost"
    @click.stop="handleBoost"
  >
    <svg
      viewBox="0 0 480 320"
      class="h-full w-full max-h-full drop-shadow-lg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient :id="`${uid}-bg`" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#239BA7" stop-opacity="0.12" />
          <stop offset="100%" stop-color="#7ADAA5" stop-opacity="0.08" />
        </linearGradient>
        <linearGradient :id="`${uid}-tree`" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#7ADAA5" />
          <stop offset="100%" stop-color="#239BA7" />
        </linearGradient>
      </defs>

      <rect width="480" height="320" rx="16" :fill="`url(#${uid}-bg)`" />

      <g opacity="0.15" stroke="#239BA7" stroke-width="0.5">
        <line v-for="y in 8" :key="`gy-${y}`" x1="40" :y1="y * 32" x2="440" :y2="y * 32" />
        <line v-for="x in 10" :key="`gx-${x}`" :x1="x * 44" y1="40" :x2="x * 44" y2="260" />
      </g>

      <!-- Trees -->
      <g class="tree-group tree-1" transform="translate(90, 55)">
        <circle cx="30" cy="20" r="10" :fill="`url(#${uid}-tree)`" opacity="0.9" />
        <line x1="30" y1="30" x2="15" y2="55" stroke="#239BA7" stroke-width="2" />
        <line x1="30" y1="30" x2="45" y2="55" stroke="#239BA7" stroke-width="2" />
        <circle cx="15" cy="60" r="7" fill="#7ADAA5" />
        <circle cx="45" cy="60" r="7" fill="#7ADAA5" />
        <text x="30" y="95" text-anchor="middle" fill="#239BA7" font-size="9" font-family="monospace" opacity="0.6">tree1</text>
      </g>

      <g class="tree-group tree-2" transform="translate(210, 45)">
        <circle cx="30" cy="25" r="10" :fill="`url(#${uid}-tree)`" opacity="0.85" />
        <line x1="30" y1="35" x2="12" y2="62" stroke="#239BA7" stroke-width="2" />
        <line x1="30" y1="35" x2="48" y2="62" stroke="#239BA7" stroke-width="2" />
        <line x1="12" y1="67" x2="5" y2="88" stroke="#239BA7" stroke-width="1.5" />
        <line x1="12" y1="67" x2="20" y2="88" stroke="#239BA7" stroke-width="1.5" />
        <circle cx="5" cy="92" r="5" fill="#7ADAA5" />
        <circle cx="20" cy="92" r="5" fill="#7ADAA5" />
        <circle cx="48" cy="67" r="7" fill="#7ADAA5" />
        <text x="30" y="110" text-anchor="middle" fill="#239BA7" font-size="9" font-family="monospace" opacity="0.6">tree2</text>
      </g>

      <g class="tree-group tree-3" transform="translate(330, 38)">
        <circle cx="30" cy="28" r="10" :fill="`url(#${uid}-tree)`" opacity="0.8" />
        <line x1="30" y1="38" x2="18" y2="65" stroke="#239BA7" stroke-width="2" />
        <line x1="30" y1="38" x2="42" y2="65" stroke="#239BA7" stroke-width="2" />
        <circle cx="18" cy="70" r="6" fill="#7ADAA5" />
        <circle cx="42" cy="70" r="6" fill="#7ADAA5" />
        <line x1="18" y1="76" x2="10" y2="95" stroke="#239BA7" stroke-width="1.5" />
        <circle cx="10" cy="99" r="4" fill="#E1AA36" />
        <text x="30" y="118" text-anchor="middle" fill="#239BA7" font-size="9" font-family="monospace" opacity="0.6">tree3</text>
      </g>

      <g class="tree-group tree-4" transform="translate(390, 30)">
        <g class="tree-4-inner">
          <circle cx="20" cy="30" r="9" :fill="`url(#${uid}-tree)`" />
          <line x1="20" y1="39" x2="10" y2="60" stroke="#239BA7" stroke-width="2" />
          <line x1="20" y1="39" x2="30" y2="60" stroke="#239BA7" stroke-width="2" />
          <circle cx="10" cy="64" r="5" fill="#E1AA36" />
          <circle cx="30" cy="64" r="5" fill="#7ADAA5" />
          <text x="20" y="88" text-anchor="middle" fill="#E1AA36" font-size="9" font-family="monospace">+</text>
        </g>
      </g>

      <!-- Loss chart -->
      <g transform="translate(60, 200)">
        <rect x="0" y="0" width="360" height="70" rx="6" fill="#000" opacity="0.04" />
        <text x="8" y="14" fill="#239BA7" font-size="9" font-family="monospace" opacity="0.7">loss</text>
        <polyline
          class="loss-line"
          points="10,55 70,48 130,42 190,36 250,30 310,26"
          fill="none"
          stroke="#E1AA36"
          stroke-width="2.5"
          stroke-linecap="round"
        />
        <polyline
          class="loss-line-boost"
          points="310,26 360,14"
          fill="none"
          stroke="#7ADAA5"
          stroke-width="2.5"
          stroke-linecap="round"
        />
      </g>

      <g class="boost-sparks">
        <circle class="spark spark-1" cx="240" cy="120" r="3" fill="#E1AA36" />
        <circle class="spark spark-2" cx="240" cy="120" r="2" fill="#7ADAA5" />
        <circle class="spark spark-3" cx="240" cy="120" r="4" fill="#239BA7" />
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
        {{ t("heroes.boostHint") }}
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
        {{ t("heroes.boostActive") }}
      </text>
    </svg>
  </div>
</template>

<style scoped>
.boost-hero--animate {
  cursor: pointer;
}

.boost-hero--animate .caption-active {
  opacity: 0;
}

.boost-hero--animate .caption-hint {
  opacity: 0.55;
  transition: opacity 0.2s;
}

.boost-hero--animate .tree-4-inner {
  opacity: 0;
  transform: scale(0.6);
  transform-origin: 20px 60px;
  transform-box: fill-box;
}

.boost-hero--animate .loss-line-boost {
  opacity: 0;
  stroke-dasharray: 60;
  stroke-dashoffset: 60;
}

.boost-hero--animate .boost-sparks {
  opacity: 0;
}

.boost-hero--animate.boost-hero--boosting .caption-hint {
  opacity: 0;
}

.boost-hero--animate.boost-hero--boosting .caption-active {
  animation: caption-fade 3s ease-in-out forwards;
}

.boost-hero--animate.boost-hero--boosting .tree-4-inner {
  animation: tree-appear 3s ease-out forwards;
}

.boost-hero--animate.boost-hero--boosting .loss-line-boost {
  animation: loss-drop 3s ease-out forwards;
}

.boost-hero--animate.boost-hero--boosting .tree-1,
.boost-hero--animate.boost-hero--boosting .tree-2,
.boost-hero--animate.boost-hero--boosting .tree-3 {
  animation: tree-pulse 3s ease-in-out forwards;
}

.boost-hero--animate.boost-hero--boosting .boost-sparks {
  animation: sparks-show 3s ease-out forwards;
}

.boost-hero--animate.boost-hero--boosting .spark-1 {
  animation: spark-fly-1 3s ease-out forwards;
}

.boost-hero--animate.boost-hero--boosting .spark-2 {
  animation: spark-fly-2 3s ease-out forwards;
}

.boost-hero--animate.boost-hero--boosting .spark-3 {
  animation: spark-fly-3 3s ease-out forwards;
}

@keyframes tree-appear {
  0% { opacity: 0; transform: scale(0.6); }
  25% { opacity: 1; transform: scale(1.08); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes loss-drop {
  0%, 15% { opacity: 0; stroke-dashoffset: 60; }
  35% { opacity: 1; stroke-dashoffset: 0; }
  100% { opacity: 1; stroke-dashoffset: 0; }
}

@keyframes tree-pulse {
  0%, 100% { filter: brightness(1); }
  35% { filter: brightness(1.25); }
}

@keyframes sparks-show {
  0%, 10% { opacity: 0; }
  20%, 75% { opacity: 1; }
  100% { opacity: 0; }
}

@keyframes spark-fly-1 {
  0%, 10% { opacity: 0; }
  20% { opacity: 1; }
  100% { opacity: 0; transform: translate(-40px, -30px); }
}

@keyframes spark-fly-2 {
  0%, 10% { opacity: 0; }
  20% { opacity: 1; }
  100% { opacity: 0; transform: translate(50px, -25px); }
}

@keyframes spark-fly-3 {
  0%, 10% { opacity: 0; }
  20% { opacity: 1; }
  100% { opacity: 0; transform: translate(0, 40px); }
}

@keyframes caption-fade {
  0%, 20% { opacity: 0; }
  35% { opacity: 1; fill: #E1AA36; }
  100% { opacity: 0.7; }
}

.boost-hero--static .tree-4-inner {
  opacity: 1;
  transform: scale(1);
}

.boost-hero--static .loss-line-boost {
  opacity: 1;
  stroke-dashoffset: 0;
}
</style>

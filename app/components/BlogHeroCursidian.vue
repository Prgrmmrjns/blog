<script setup lang="ts">
defineProps<{ compact?: boolean }>();

const { t } = useLocale();
const { reducedMotion } = useReducedMotion();
const isLinking = ref(false);
let linkTimer: ReturnType<typeof setTimeout> | null = null;

const uid = useId().replace(/:/g, "");

function startLink() {
  if (reducedMotion.value) return;
  if (linkTimer) {
    clearTimeout(linkTimer);
    linkTimer = null;
  }
  isLinking.value = true;
}

function stopLink() {
  isLinking.value = false;
  if (linkTimer) {
    clearTimeout(linkTimer);
    linkTimer = null;
  }
}

function handleLink() {
  startLink();
  linkTimer = setTimeout(stopLink, 2800);
}
</script>

<template>
  <div
    class="cursidian-hero relative mx-auto flex h-full w-full items-center justify-center select-none"
    :class="[
      compact ? 'max-h-full p-4' : 'max-w-[560px] p-6',
      {
        'cursidian-hero--static': reducedMotion,
        'cursidian-hero--animate': !reducedMotion,
        'cursidian-hero--linking': isLinking,
      },
    ]"
    aria-hidden="true"
    @mouseenter="startLink"
    @mouseleave="stopLink"
    @click.stop="handleLink"
  >
    <svg
      viewBox="0 0 480 320"
      class="h-full w-full max-h-full drop-shadow-lg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient :id="`${uid}-bg`" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#239BA7" stop-opacity="0.14" />
          <stop offset="100%" stop-color="#7ADAA5" stop-opacity="0.08" />
        </linearGradient>
        <linearGradient :id="`${uid}-crystal`" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#7ADAA5" />
          <stop offset="100%" stop-color="#239BA7" />
        </linearGradient>
        <filter :id="`${uid}-glow`" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="480" height="320" rx="16" :fill="`url(#${uid}-bg)`" />

      <!-- Graph edges -->
      <g class="edges" stroke="#239BA7" stroke-width="1.5" fill="none" opacity="0.35">
        <path class="edge edge-1" d="M140 100 L240 160" />
        <path class="edge edge-2" d="M340 100 L240 160" />
        <path class="edge edge-3" d="M160 240 L240 160" />
        <path class="edge edge-4" d="M320 240 L240 160" />
      </g>

      <!-- Pulse dots along edges -->
      <g class="pulses" fill="#7ADAA5">
        <circle class="pulse pulse-1" r="3" cx="0" cy="0" transform="translate(140 100)" />
        <circle class="pulse pulse-2" r="3" cx="0" cy="0" transform="translate(340 100)" />
        <circle class="pulse pulse-3" r="3" cx="0" cy="0" transform="translate(160 240)" />
        <circle class="pulse pulse-4" r="3" cx="0" cy="0" transform="translate(320 240)" />
      </g>

      <!-- Satellite nodes -->
      <g class="node node-paper" transform="translate(110, 70)">
        <rect x="0" y="0" width="56" height="44" rx="8" fill="#fff" stroke="#239BA7" stroke-width="1.5" />
        <line x1="10" y1="14" x2="46" y2="14" stroke="#239BA7" stroke-width="1.5" opacity="0.5" />
        <line x1="10" y1="22" x2="38" y2="22" stroke="#239BA7" stroke-width="1.5" opacity="0.35" />
        <line x1="10" y1="30" x2="42" y2="30" stroke="#239BA7" stroke-width="1.5" opacity="0.35" />
        <text x="28" y="58" text-anchor="middle" fill="#239BA7" font-size="9" font-family="monospace" opacity="0.65">Papers</text>
      </g>

      <g class="node node-concept" transform="translate(314, 70)">
        <circle cx="28" cy="22" r="22" fill="#fff" stroke="#239BA7" stroke-width="1.5" />
        <circle cx="28" cy="22" r="8" :fill="`url(#${uid}-crystal)`" opacity="0.85" />
        <text x="28" y="58" text-anchor="middle" fill="#239BA7" font-size="9" font-family="monospace" opacity="0.65">Concepts</text>
      </g>

      <g class="node node-project" transform="translate(130, 210)">
        <rect x="0" y="0" width="56" height="44" rx="8" fill="#fff" stroke="#239BA7" stroke-width="1.5" />
        <rect x="12" y="10" width="14" height="14" rx="2" fill="#7ADAA5" opacity="0.7" />
        <rect x="30" y="10" width="14" height="14" rx="2" fill="#239BA7" opacity="0.55" />
        <rect x="12" y="26" width="32" height="6" rx="2" fill="#239BA7" opacity="0.25" />
        <text x="28" y="58" text-anchor="middle" fill="#239BA7" font-size="9" font-family="monospace" opacity="0.65">Projects</text>
      </g>

      <g class="node node-query" transform="translate(294, 210)">
        <rect x="0" y="0" width="56" height="44" rx="8" fill="#fff" stroke="#239BA7" stroke-width="1.5" />
        <text x="28" y="28" text-anchor="middle" fill="#239BA7" font-size="18" font-family="serif" opacity="0.7">?</text>
        <text x="28" y="58" text-anchor="middle" fill="#239BA7" font-size="9" font-family="monospace" opacity="0.65">Queries</text>
      </g>

      <!-- Center: Obsidian crystal × Cursor -->
      <g class="hub" :filter="`url(#${uid}-glow)`" transform="translate(240, 160)">
        <polygon
          class="crystal"
          points="0,-36 28,-12 18,34 -18,34 -28,-12"
          :fill="`url(#${uid}-crystal)`"
          opacity="0.92"
        />
        <polygon
          points="0,-36 28,-12 0,8 -28,-12"
          fill="#fff"
          opacity="0.18"
        />
        <!-- Cursor pointer -->
        <g class="cursor-tip" transform="translate(10, -6) rotate(-18)">
          <path
            d="M0 0 L0 28 L8 22 L14 34 L20 31 L14 19 L24 19 Z"
            fill="#0f172a"
            stroke="#7ADAA5"
            stroke-width="1.2"
          />
        </g>
      </g>

      <text
        x="240"
        y="300"
        text-anchor="middle"
        fill="#239BA7"
        font-size="11"
        font-family="monospace"
        opacity="0.55"
      >
        Cursor × Obsidian
      </text>
    </svg>

    <p
      v-if="!compact"
      class="caption-hint pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] tracking-wide text-teal/50 opacity-0"
    >
      {{ t("heroes.cursidianHint") }}
    </p>
    <p
      v-if="!compact"
      class="caption-active pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] tracking-wide text-teal/70 opacity-0"
    >
      {{ t("heroes.cursidianActive") }}
    </p>
  </div>
</template>

<style scoped>
.cursidian-hero--animate .caption-hint {
  animation: fade-in 0.6s ease 0.8s forwards;
}

.cursidian-hero--animate .caption-active {
  opacity: 0;
}

.cursidian-hero--animate.cursidian-hero--linking .caption-hint {
  opacity: 0;
  animation: none;
}

.cursidian-hero--animate.cursidian-hero--linking .caption-active {
  animation: fade-in 0.35s ease forwards;
}

.cursidian-hero--animate .hub {
  transform-origin: 240px 160px;
  animation: hub-float 4s ease-in-out infinite;
}

.cursidian-hero--animate.cursidian-hero--linking .hub {
  animation: hub-pulse 0.9s ease-in-out infinite;
}

.cursidian-hero--animate.cursidian-hero--linking .edges {
  opacity: 0.7;
  stroke-width: 2;
}

.cursidian-hero--animate.cursidian-hero--linking .pulse-1 {
  animation: travel-1 1.4s ease-in-out infinite;
}
.cursidian-hero--animate.cursidian-hero--linking .pulse-2 {
  animation: travel-2 1.4s ease-in-out 0.15s infinite;
}
.cursidian-hero--animate.cursidian-hero--linking .pulse-3 {
  animation: travel-3 1.4s ease-in-out 0.3s infinite;
}
.cursidian-hero--animate.cursidian-hero--linking .pulse-4 {
  animation: travel-4 1.4s ease-in-out 0.45s infinite;
}

.cursidian-hero--animate.cursidian-hero--linking .node {
  animation: node-pop 0.5s ease forwards;
}

.cursidian-hero--animate .cursor-tip {
  transform-origin: 10px -6px;
}

.cursidian-hero--animate.cursidian-hero--linking .cursor-tip {
  animation: cursor-tap 0.7s ease-in-out infinite;
}

.cursidian-hero--static .pulses {
  display: none;
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}

@keyframes hub-float {
  0%,
  100% {
    transform: translate(240px, 160px) translateY(0);
  }
  50% {
    transform: translate(240px, 160px) translateY(-4px);
  }
}

@keyframes hub-pulse {
  0%,
  100% {
    transform: translate(240px, 160px) scale(1);
  }
  50% {
    transform: translate(240px, 160px) scale(1.06);
  }
}

@keyframes travel-1 {
  0% {
    transform: translate(140px, 100px);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    transform: translate(240px, 160px);
    opacity: 0.2;
  }
}

@keyframes travel-2 {
  0% {
    transform: translate(340px, 100px);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    transform: translate(240px, 160px);
    opacity: 0.2;
  }
}

@keyframes travel-3 {
  0% {
    transform: translate(160px, 240px);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    transform: translate(240px, 160px);
    opacity: 0.2;
  }
}

@keyframes travel-4 {
  0% {
    transform: translate(320px, 240px);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    transform: translate(240px, 160px);
    opacity: 0.2;
  }
}

@keyframes node-pop {
  from {
    opacity: 0.7;
  }
  to {
    opacity: 1;
  }
}

@keyframes cursor-tap {
  0%,
  100% {
    transform: translate(10px, -6px) rotate(-18deg) translateY(0);
  }
  50% {
    transform: translate(10px, -6px) rotate(-18deg) translateY(3px);
  }
}
</style>

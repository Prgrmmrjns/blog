<script setup lang="ts">
defineProps<{ compact?: boolean }>();

const { t } = useLocale();
const { reducedMotion } = useReducedMotion();
const isReading = ref(false);
let readTimer: ReturnType<typeof setTimeout> | null = null;

function startRead() {
  if (reducedMotion.value) return;
  if (readTimer) clearTimeout(readTimer);
  isReading.value = true;
}

function stopRead() {
  isReading.value = false;
  if (readTimer) {
    clearTimeout(readTimer);
    readTimer = null;
  }
}

function handleStackClick() {
  startRead();
  readTimer = setTimeout(stopRead, 3000);
}
</script>

<template>
  <div
    class="books-hero relative mx-auto flex h-full w-full items-center justify-center select-none"
    :class="[
      compact ? 'max-h-full p-4' : 'max-w-[560px] p-6',
      {
        'books-hero--static': reducedMotion,
        'books-hero--animate': !reducedMotion,
        'books-hero--reading': isReading,
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
        <linearGradient id="books-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E1AA36" stop-opacity="0.1" />
          <stop offset="100%" stop-color="#239BA7" stop-opacity="0.08" />
        </linearGradient>
      </defs>

      <rect width="480" height="320" rx="16" fill="url(#books-bg)" />

      <!-- Shelf -->
      <rect x="80" y="230" width="320" height="10" rx="3" class="shelf" />
      <ellipse cx="240" cy="248" rx="160" ry="10" fill="#000" opacity="0.06" />

      <!-- Book stack -->
      <g
        class="book-stack"
        transform="translate(140, 60)"
        @mouseenter="startRead"
        @mouseleave="stopRead"
        @click="handleStackClick"
      >
        <rect x="-20" y="-10" width="200" height="190" fill="transparent" class="stack-hit" />

        <!-- Book 5 (back) -->
        <g class="book book-5">
          <rect x="60" y="30" width="28" height="165" rx="2" fill="#4a5568" />
          <text x="74" y="110" text-anchor="middle" fill="#cbd5e1" font-size="7" transform="rotate(-90 74 110)">SCI-FI</text>
        </g>

        <!-- Book 4 -->
        <g class="book book-4">
          <rect x="42" y="22" width="30" height="173" rx="2" fill="#239BA7" />
          <text x="57" y="108" text-anchor="middle" fill="#ECECBB" font-size="7" transform="rotate(-90 57 108)">ASIMOV</text>
        </g>

        <!-- Book 3 -->
        <g class="book book-3">
          <rect x="24" y="14" width="32" height="181" rx="2" fill="#E1AA36" />
          <text x="40" y="105" text-anchor="middle" fill="#1a202c" font-size="7" transform="rotate(-90 40 105)">MARTIN</text>
        </g>

        <!-- Book 2 -->
        <g class="book book-2">
          <rect x="6" y="8" width="30" height="187" rx="2" fill="#7ADAA5" />
          <text x="21" y="102" text-anchor="middle" fill="#0e0e0e" font-size="7" transform="rotate(-90 21 102)">SCIENCE</text>
        </g>

        <!-- Book 1 (top, pulls out) -->
        <g class="book book-top">
          <rect x="0" y="0" width="34" height="195" rx="2" fill="#1a7a84" />
          <rect x="3" y="3" width="3" height="189" rx="1" fill="#ECECBB" opacity="0.3" />
          <text x="17" y="98" text-anchor="middle" fill="#ECECBB" font-size="8" font-weight="bold" transform="rotate(-90 17 98)">READ</text>
        </g>
      </g>

      <!-- Pages fanning out -->
      <g class="pages" transform="translate(140, 60)" opacity="0">
        <path class="page page-1" d="M34 20 Q60 30 55 100 Q50 170 34 180" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.5" />
        <path class="page page-2" d="M34 25 Q65 40 58 100 Q52 165 34 175" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="0.5" />
        <path class="page page-3" d="M34 30 Q70 50 62 100 Q55 160 34 170" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="0.5" />
      </g>

      <!-- Floating letters -->
      <g class="float-letters" opacity="0">
        <text class="letter letter-1" x="300" y="120" fill="#E1AA36" font-size="18" font-family="Georgia, serif" font-style="italic">A</text>
        <text class="letter letter-2" x="330" y="100" fill="#239BA7" font-size="14" font-family="Georgia, serif" font-style="italic">a</text>
        <text class="letter letter-3" x="315" y="150" fill="#7ADAA5" font-size="16" font-family="Georgia, serif" font-style="italic">…</text>
      </g>

      <!-- Reading light -->
      <ellipse class="reading-glow" cx="175" cy="100" rx="0" ry="0" fill="#E1AA36" opacity="0" />

      <text
        v-if="!compact"
        x="240"
        y="300"
        text-anchor="middle"
        class="caption-hint fill-gray-500 dark:fill-cream/40"
        font-size="11"
        font-style="italic"
      >
        {{ t("heroes.booksHint") }}
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
        {{ t("heroes.booksActive") }}
      </text>
    </svg>
  </div>
</template>

<style scoped>
.shelf {
  fill: #d6cfc0;
}

:global(.dark) .shelf {
  fill: #2a2a2a;
}

.books-hero--animate .stack-hit {
  cursor: pointer;
}

.books-hero--animate .caption-active {
  opacity: 0;
}

.books-hero--animate .caption-hint {
  opacity: 0.55;
}

.books-hero--animate.books-hero--reading .caption-hint {
  opacity: 0;
}

.books-hero--animate.books-hero--reading .caption-active {
  animation: caption-fade 3s ease-in-out forwards;
}

.books-hero--animate.books-hero--reading .book-top {
  animation: book-pull 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  transform-origin: 0 195px;
}

.books-hero--animate.books-hero--reading .pages {
  animation: pages-show 3s ease-out forwards;
}

.books-hero--animate.books-hero--reading .page-1 {
  animation: page-fan-1 3s ease-out forwards;
}

.books-hero--animate.books-hero--reading .page-2 {
  animation: page-fan-2 3s ease-out forwards;
}

.books-hero--animate.books-hero--reading .page-3 {
  animation: page-fan-3 3s ease-out forwards;
}

.books-hero--animate.books-hero--reading .float-letters {
  animation: letters-show 3s ease-out forwards;
}

.books-hero--animate.books-hero--reading .letter-1 {
  animation: letter-float-1 3s ease-out forwards;
}

.books-hero--animate.books-hero--reading .letter-2 {
  animation: letter-float-2 3s ease-out 0.1s forwards;
}

.books-hero--animate.books-hero--reading .letter-3 {
  animation: letter-float-3 3s ease-out 0.2s forwards;
}

.books-hero--animate.books-hero--reading .reading-glow {
  animation: glow-expand 3s ease-out forwards;
}

@keyframes book-pull {
  0% { transform: translate(0, 0) rotate(0deg); }
  20% { transform: translate(-8px, -6px) rotate(-8deg); }
  40%, 70% { transform: translate(-30px, -12px) rotate(-18deg); }
  100% { transform: translate(-20px, -8px) rotate(-12deg); }
}

@keyframes pages-show {
  0%, 15% { opacity: 0; }
  25%, 75% { opacity: 1; }
  100% { opacity: 0; }
}

@keyframes page-fan-1 {
  0%, 20% { transform: translate(0, 0); opacity: 0; }
  35% { transform: translate(15px, -5px) rotate(5deg); opacity: 0.9; }
  100% { transform: translate(25px, 0) rotate(8deg); opacity: 0.7; }
}

@keyframes page-fan-2 {
  0%, 22% { transform: translate(0, 0); opacity: 0; }
  38% { transform: translate(22px, 0) rotate(10deg); opacity: 0.8; }
  100% { transform: translate(32px, 2px) rotate(14deg); opacity: 0.6; }
}

@keyframes page-fan-3 {
  0%, 24% { transform: translate(0, 0); opacity: 0; }
  40% { transform: translate(28px, 5px) rotate(15deg); opacity: 0.7; }
  100% { transform: translate(38px, 8px) rotate(20deg); opacity: 0.5; }
}

@keyframes letters-show {
  0%, 25% { opacity: 0; }
  40%, 80% { opacity: 1; }
  100% { opacity: 0; }
}

@keyframes letter-float-1 {
  0%, 25% { transform: translate(0, 0); opacity: 0; }
  45% { transform: translate(10px, -20px); opacity: 1; }
  100% { transform: translate(20px, -35px); opacity: 0; }
}

@keyframes letter-float-2 {
  0%, 28% { transform: translate(0, 0); opacity: 0; }
  48% { transform: translate(15px, -15px); opacity: 1; }
  100% { transform: translate(25px, -30px); opacity: 0; }
}

@keyframes letter-float-3 {
  0%, 30% { transform: translate(0, 0); opacity: 0; }
  50% { transform: translate(5px, -25px); opacity: 1; }
  100% { transform: translate(12px, -40px); opacity: 0; }
}

@keyframes glow-expand {
  0%, 15% { rx: 0; ry: 0; opacity: 0; }
  30% { rx: 50; ry: 40; opacity: 0.15; }
  70%, 100% { rx: 70; ry: 55; opacity: 0; }
}

@keyframes caption-fade {
  0%, 30% { opacity: 0; }
  45% { opacity: 1; fill: #E1AA36; }
  100% { opacity: 0.7; }
}

.books-hero--static .book-top {
  transform: translate(-15px, -6px) rotate(-10deg);
}

.books-hero--static .pages {
  opacity: 0.6;
}
</style>

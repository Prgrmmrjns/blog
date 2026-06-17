<script setup lang="ts">
const { t } = useLocale();
const reducedMotion = ref(false);
const isSpilling = ref(false);
let spillTimer: ReturnType<typeof setTimeout> | null = null;

onMounted(() => {
  reducedMotion.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
});

function startSpill() {
  if (reducedMotion.value) return;
  if (spillTimer) {
    clearTimeout(spillTimer);
    spillTimer = null;
  }
  isSpilling.value = true;
}

function stopSpill() {
  isSpilling.value = false;
  if (spillTimer) {
    clearTimeout(spillTimer);
    spillTimer = null;
  }
}

function handleCupClick() {
  startSpill();
  spillTimer = setTimeout(stopSpill, 4000);
}
</script>

<template>
  <div
    class="coffee-hero relative mx-auto w-full max-w-[420px] select-none"
    :class="{
      'coffee-hero--static': reducedMotion,
      'coffee-hero--animate': !reducedMotion,
      'coffee-hero--spilling': isSpilling,
    }"
    aria-hidden="true"
  >
    <svg
      viewBox="0 0 480 320"
      class="h-auto w-full drop-shadow-xl"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="screen-glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#7ADAA5" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#239BA7" stop-opacity="0.15" />
        </linearGradient>
        <linearGradient id="coffee-liquid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#6B4226" />
          <stop offset="100%" stop-color="#3D2314" />
        </linearGradient>
        <linearGradient id="mug-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f8fafc" />
          <stop offset="100%" stop-color="#cbd5e1" />
        </linearGradient>
      </defs>

      <!-- Desk -->
      <ellipse cx="240" cy="278" rx="190" ry="18" fill="#000" opacity="0.08" />
      <rect x="60" y="248" width="360" height="14" rx="4" class="desk-surface" />

      <!-- Laptop group -->
      <g class="laptop-shake">
        <g class="laptop-base">
          <path
            d="M130 210 L350 210 Q360 210 362 218 L368 238 Q370 246 360 248 L120 248 Q110 246 112 238 L118 218 Q120 210 130 210 Z"
            fill="#4a5568"
          />
          <path
            d="M125 218 L355 218 L360 242 L120 242 Z"
            fill="#718096"
          />
          <rect x="155" y="228" width="170" height="6" rx="2" fill="#2d3748" opacity="0.5" />
        </g>

        <g class="laptop-screen">
          <path
            d="M145 95 L335 95 Q345 95 348 102 L355 200 Q356 208 346 208 L134 208 Q124 208 125 200 L132 102 Q135 95 145 95 Z"
            fill="#2d3748"
          />
          <rect x="138" y="102" width="204" height="98" rx="3" fill="#1a202c" />
          <rect x="138" y="102" width="204" height="98" rx="3" fill="url(#screen-glow)" />
          <text x="152" y="125" fill="#7ADAA5" font-family="monospace" font-size="11">&lt;code/&gt;</text>
          <text x="152" y="145" fill="#239BA7" font-family="monospace" font-size="9" opacity="0.8">def train():</text>
          <text x="162" y="160" fill="#E1AA36" font-family="monospace" font-size="9" opacity="0.8">  return magic</text>
          <text x="152" y="180" fill="#7ADAA5" font-family="monospace" font-size="9" opacity="0.5"># no bugs here</text>
          <g class="screen-glitch">
            <rect x="138" y="115" width="204" height="3" fill="#7ADAA5" opacity="0.6" />
            <rect x="138" y="155" width="204" height="2" fill="#E1AA36" opacity="0.5" />
            <rect x="138" y="175" width="120" height="4" fill="#ff6b6b" opacity="0.4" />
          </g>
        </g>

        <circle cx="240" cy="165" r="0" class="explosion-flash" fill="#fff" opacity="0" />
      </g>

      <g class="laptop-fragments" opacity="0">
        <path class="frag frag-1" d="M145 95 L240 95 L235 150 L140 150 Z" fill="#2d3748" />
        <path class="frag frag-2" d="M240 95 L335 95 L340 150 L245 150 Z" fill="#374151" />
        <path class="frag frag-3" d="M130 210 L240 210 L235 248 L125 248 Z" fill="#4a5568" />
        <path class="frag frag-4" d="M240 210 L350 210 L355 248 L245 248 Z" fill="#718096" />
        <path class="frag frag-5" d="M180 102 L300 102 L295 200 L185 200 Z" fill="#1a202c" opacity="0.9" />
      </g>

      <g class="coffee-puddle" opacity="0">
        <ellipse cx="240" cy="222" rx="0" ry="0" fill="url(#coffee-liquid)" opacity="0.85" />
        <ellipse cx="220" cy="218" rx="0" ry="0" fill="#5c3a21" opacity="0.5" />
        <ellipse cx="265" cy="225" rx="0" ry="0" fill="#5c3a21" opacity="0.4" />
      </g>

      <g class="coffee-stream" opacity="0">
        <path
          d="M318 118 Q312 145 280 175 Q260 195 245 210 Q240 218 238 225"
          fill="none"
          stroke="url(#coffee-liquid)"
          stroke-width="7"
          stroke-linecap="round"
          class="stream-path"
        />
        <path
          d="M322 120 Q316 150 290 180 Q275 200 252 215"
          fill="none"
          stroke="#8B5A2B"
          stroke-width="3"
          stroke-linecap="round"
          opacity="0.4"
        />
        <circle class="drip drip-1" cx="238" cy="225" r="3" fill="#6B4226" />
        <circle class="drip drip-2" cx="242" cy="232" r="2" fill="#6B4226" />
        <circle class="drip drip-3" cx="235" cy="238" r="2.5" fill="#6B4226" />
      </g>

      <!-- Coffee cup (hover target) -->
      <g
        class="coffee-cup"
        transform="translate(300, 72)"
        @mouseenter="startSpill"
        @mouseleave="stopSpill"
        @click="handleCupClick"
      >
        <rect
          x="-12"
          y="8"
          width="92"
          height="88"
          fill="transparent"
          class="cup-hit-area"
        />
        <g class="cup-tilt">
          <path
            d="M52 28 Q72 28 72 48 Q72 68 52 68 Q58 48 58 48 Q58 28 52 28"
            fill="none"
            stroke="#94a3b8"
            stroke-width="4"
          />
          <path
            d="M8 18 L48 18 Q58 18 58 28 L58 72 Q58 82 48 82 L8 82 Q-2 82 -2 72 L-2 28 Q-2 18 8 18 Z"
            fill="url(#mug-body)"
            stroke="#94a3b8"
            stroke-width="2"
          />
          <path
            d="M4 32 L44 32 Q50 32 50 38 L50 68 Q50 74 44 74 L4 74 Q-2 74 -2 68 L-2 38 Q-2 32 4 32 Z"
            fill="url(#coffee-liquid)"
          />
        </g>
      </g>

      <g class="steam" opacity="0">
        <path d="M310 55 Q305 40 312 25" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round" class="steam-1" />
        <path d="M322 58 Q328 42 320 28" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round" class="steam-2" />
      </g>

      <g class="explosion-particles" opacity="0">
        <circle class="spark spark-1" cx="240" cy="165" r="4" fill="#E1AA36" />
        <circle class="spark spark-2" cx="240" cy="165" r="3" fill="#7ADAA5" />
        <circle class="spark spark-3" cx="240" cy="165" r="5" fill="#ff6b6b" />
        <circle class="spark spark-4" cx="240" cy="165" r="2" fill="#fff" />
        <circle class="spark spark-5" cx="240" cy="165" r="3" fill="#6B4226" />
        <circle class="spark spark-6" cx="240" cy="165" r="4" fill="#239BA7" />
        <rect class="spark spark-7" x="238" y="163" width="6" height="6" fill="#718096" transform="rotate(15 241 166)" />
        <rect class="spark spark-8" x="238" y="163" width="4" height="8" fill="#2d3748" transform="rotate(-20 241 166)" />
      </g>

      <g class="smoke" opacity="0">
        <circle class="smoke-puff smoke-1" cx="240" cy="160" r="8" fill="#94a3b8" opacity="0.4" />
        <circle class="smoke-puff smoke-2" cx="235" cy="145" r="12" fill="#64748b" opacity="0.25" />
        <circle class="smoke-puff smoke-3" cx="250" cy="130" r="16" fill="#475569" opacity="0.15" />
      </g>

      <text x="240" y="305" text-anchor="middle" class="caption-hint fill-gray-500 dark:fill-cream/40" font-size="11" font-style="italic">
        {{ t("heroes.coffeeHint") }}
      </text>
      <text x="240" y="305" text-anchor="middle" class="caption-text fill-gray-500 dark:fill-cream/40" font-size="11" font-style="italic">
        {{ t("heroes.coffeeActive") }}
      </text>
    </svg>
  </div>
</template>

<style scoped>
.desk-surface {
  fill: #d6cfc0;
}

:global(.dark) .desk-surface {
  fill: #2a2a2a;
}

.coffee-hero--animate svg {
  overflow: visible;
}

.coffee-hero--animate .coffee-cup {
  cursor: pointer;
}

.coffee-hero--animate .cup-hit-area {
  cursor: pointer;
}

.coffee-hero--animate .caption-text {
  opacity: 0;
}

.coffee-hero--animate .caption-hint {
  opacity: 0.55;
  transition: opacity 0.2s;
}

.coffee-hero--animate.coffee-hero--spilling .caption-hint {
  opacity: 0;
}

.coffee-hero--animate.coffee-hero--spilling .caption-text {
  animation: caption-pulse 4s ease-in-out forwards;
}

/* ── All spill animations: one shot while hovering ── */
.coffee-hero--animate.coffee-hero--spilling .cup-tilt {
  transform-origin: 20px 82px;
  animation: cup-tilt 4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes cup-tilt {
  0% { transform: rotate(0deg); }
  12% { transform: rotate(12deg); }
  28%, 100% { transform: rotate(58deg); }
}

.coffee-hero--animate.coffee-hero--spilling .coffee-stream {
  animation: stream-show 4s ease-in-out forwards;
}

.coffee-hero--animate.coffee-hero--spilling .stream-path {
  stroke-dasharray: 120;
  stroke-dashoffset: 120;
  animation: stream-draw 4s ease-in-out forwards;
}

@keyframes stream-show {
  0%, 8% { opacity: 0; }
  14%, 55% { opacity: 1; }
  65%, 100% { opacity: 0; }
}

@keyframes stream-draw {
  0%, 10% { stroke-dashoffset: 120; }
  35%, 55% { stroke-dashoffset: 0; }
  65%, 100% { stroke-dashoffset: 0; opacity: 0; }
}

.coffee-hero--animate.coffee-hero--spilling .drip-1 { animation: drip-fall 4s ease-in forwards; }
.coffee-hero--animate.coffee-hero--spilling .drip-2 { animation: drip-fall 4s ease-in 0.12s forwards; }
.coffee-hero--animate.coffee-hero--spilling .drip-3 { animation: drip-fall 4s ease-in 0.24s forwards; }

@keyframes drip-fall {
  0%, 28% { opacity: 0; transform: translateY(0); }
  32% { opacity: 1; }
  42%, 100% { opacity: 0; transform: translateY(18px); }
}

.coffee-hero--animate.coffee-hero--spilling .coffee-puddle {
  animation: puddle-show 4s ease-out forwards;
}

.coffee-hero--animate.coffee-hero--spilling .coffee-puddle ellipse:nth-child(1) { animation: puddle-grow-1 4s ease-out forwards; }
.coffee-hero--animate.coffee-hero--spilling .coffee-puddle ellipse:nth-child(2) { animation: puddle-grow-2 4s ease-out forwards; }
.coffee-hero--animate.coffee-hero--spilling .coffee-puddle ellipse:nth-child(3) { animation: puddle-grow-3 4s ease-out forwards; }

@keyframes puddle-show {
  0%, 22% { opacity: 0; }
  28%, 70% { opacity: 1; }
  80%, 100% { opacity: 0; }
}

@keyframes puddle-grow-1 {
  0%, 24% { rx: 0; ry: 0; }
  38% { rx: 55; ry: 10; }
  70%, 100% { rx: 70; ry: 14; }
}

@keyframes puddle-grow-2 {
  0%, 26% { rx: 0; ry: 0; }
  40% { rx: 20; ry: 6; }
  70%, 100% { rx: 28; ry: 8; }
}

@keyframes puddle-grow-3 {
  0%, 28% { rx: 0; ry: 0; }
  42% { rx: 18; ry: 5; }
  70%, 100% { rx: 24; ry: 7; }
}

.coffee-hero--animate.coffee-hero--spilling .laptop-shake {
  transform-origin: 240px 180px;
  animation: laptop-shake 4s ease-in-out forwards;
}

@keyframes laptop-shake {
  0%, 52% { transform: translate(0, 0) rotate(0deg); }
  54% { transform: translate(-3px, 1px) rotate(-1deg); }
  56% { transform: translate(4px, -2px) rotate(1.5deg); }
  58% { transform: translate(-5px, 2px) rotate(-2deg); }
  60% { transform: translate(6px, -1px) rotate(2deg); }
  62%, 100% { transform: translate(0, 0) rotate(0deg); }
}

.coffee-hero--animate.coffee-hero--spilling .screen-glitch {
  animation: glitch 4s steps(2) forwards;
}

@keyframes glitch {
  0%, 50% { opacity: 0; }
  52%, 68% { opacity: 1; }
  70%, 100% { opacity: 0; }
}

.coffee-hero--animate.coffee-hero--spilling .laptop-base,
.coffee-hero--animate.coffee-hero--spilling .laptop-screen {
  animation: laptop-vanish 4s ease-in forwards;
}

@keyframes laptop-vanish {
  0%, 58% { opacity: 1; }
  62%, 100% { opacity: 0; }
}

.coffee-hero--animate.coffee-hero--spilling .laptop-fragments {
  animation: fragments-show 4s ease-out forwards;
}

@keyframes fragments-show {
  0%, 58% { opacity: 0; }
  62%, 88% { opacity: 1; }
  100% { opacity: 0; }
}

.coffee-hero--animate.coffee-hero--spilling .frag-1 { animation: frag-fly-1 4s ease-out forwards; transform-origin: 190px 120px; }
.coffee-hero--animate.coffee-hero--spilling .frag-2 { animation: frag-fly-2 4s ease-out forwards; transform-origin: 290px 120px; }
.coffee-hero--animate.coffee-hero--spilling .frag-3 { animation: frag-fly-3 4s ease-out forwards; transform-origin: 180px 230px; }
.coffee-hero--animate.coffee-hero--spilling .frag-4 { animation: frag-fly-4 4s ease-out forwards; transform-origin: 300px 230px; }
.coffee-hero--animate.coffee-hero--spilling .frag-5 { animation: frag-fly-5 4s ease-out forwards; transform-origin: 240px 150px; }

@keyframes frag-fly-1 {
  0%, 58% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
  72% { transform: translate(-60px, -40px) rotate(-35deg); }
  88%, 100% { transform: translate(-80px, -20px) rotate(-50deg); opacity: 0; }
}

@keyframes frag-fly-2 {
  0%, 58% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
  72% { transform: translate(70px, -35px) rotate(40deg); }
  88%, 100% { transform: translate(90px, -10px) rotate(55deg); opacity: 0; }
}

@keyframes frag-fly-3 {
  0%, 58% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
  72% { transform: translate(-50px, 30px) rotate(-25deg); }
  88%, 100% { transform: translate(-65px, 50px) rotate(-40deg); opacity: 0; }
}

@keyframes frag-fly-4 {
  0%, 58% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
  72% { transform: translate(55px, 35px) rotate(30deg); }
  88%, 100% { transform: translate(75px, 55px) rotate(45deg); opacity: 0; }
}

@keyframes frag-fly-5 {
  0%, 58% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 1; }
  72% { transform: translate(0, -55px) rotate(15deg) scale(1.1); }
  88%, 100% { transform: translate(10px, -80px) rotate(25deg) scale(0.8); opacity: 0; }
}

.coffee-hero--animate.coffee-hero--spilling .explosion-flash {
  animation: flash-boom 4s ease-out forwards;
}

@keyframes flash-boom {
  0%, 58% { r: 0; opacity: 0; }
  60% { r: 5; opacity: 0.9; }
  62% { r: 90; opacity: 0.6; }
  66%, 100% { r: 120; opacity: 0; }
}

.coffee-hero--animate.coffee-hero--spilling .explosion-particles {
  animation: sparks-show 4s ease-out forwards;
}

@keyframes sparks-show {
  0%, 58% { opacity: 0; }
  60%, 85% { opacity: 1; }
  100% { opacity: 0; }
}

.coffee-hero--animate.coffee-hero--spilling .spark-1 { animation: spark-fly-1 4s ease-out forwards; }
.coffee-hero--animate.coffee-hero--spilling .spark-2 { animation: spark-fly-2 4s ease-out forwards; }
.coffee-hero--animate.coffee-hero--spilling .spark-3 { animation: spark-fly-3 4s ease-out forwards; }
.coffee-hero--animate.coffee-hero--spilling .spark-4 { animation: spark-fly-4 4s ease-out forwards; }
.coffee-hero--animate.coffee-hero--spilling .spark-5 { animation: spark-fly-5 4s ease-out forwards; }
.coffee-hero--animate.coffee-hero--spilling .spark-6 { animation: spark-fly-6 4s ease-out forwards; }
.coffee-hero--animate.coffee-hero--spilling .spark-7 { animation: spark-fly-7 4s ease-out forwards; }
.coffee-hero--animate.coffee-hero--spilling .spark-8 { animation: spark-fly-8 4s ease-out forwards; }

@keyframes spark-fly-1 {
  0%, 58% { transform: translate(0, 0); opacity: 0; }
  60% { opacity: 1; }
  75% { transform: translate(-80px, -60px); opacity: 0; }
  100% { opacity: 0; }
}

@keyframes spark-fly-2 {
  0%, 58% { transform: translate(0, 0); opacity: 0; }
  60% { opacity: 1; }
  75% { transform: translate(90px, -50px); opacity: 0; }
  100% { opacity: 0; }
}

@keyframes spark-fly-3 {
  0%, 58% { transform: translate(0, 0); opacity: 0; }
  60% { opacity: 1; }
  75% { transform: translate(-40px, 70px); opacity: 0; }
  100% { opacity: 0; }
}

@keyframes spark-fly-4 {
  0%, 58% { transform: translate(0, 0); opacity: 0; }
  60% { opacity: 1; }
  75% { transform: translate(50px, 65px); opacity: 0; }
  100% { opacity: 0; }
}

@keyframes spark-fly-5 {
  0%, 58% { transform: translate(0, 0); opacity: 0; }
  60% { opacity: 1; }
  75% { transform: translate(-100px, 10px); opacity: 0; }
  100% { opacity: 0; }
}

@keyframes spark-fly-6 {
  0%, 58% { transform: translate(0, 0); opacity: 0; }
  60% { opacity: 1; }
  75% { transform: translate(110px, 15px); opacity: 0; }
  100% { opacity: 0; }
}

@keyframes spark-fly-7 {
  0%, 58% { transform: translate(0, 0) rotate(15deg); opacity: 0; }
  60% { opacity: 1; }
  75% { transform: translate(-30px, -90px) rotate(120deg); opacity: 0; }
  100% { opacity: 0; }
}

@keyframes spark-fly-8 {
  0%, 58% { transform: translate(0, 0) rotate(-20deg); opacity: 0; }
  60% { opacity: 1; }
  75% { transform: translate(35px, -85px) rotate(-90deg); opacity: 0; }
  100% { opacity: 0; }
}

.coffee-hero--animate.coffee-hero--spilling .smoke {
  animation: smoke-show 4s ease-out forwards;
}

.coffee-hero--animate.coffee-hero--spilling .smoke-1 { animation: smoke-rise-1 4s ease-out forwards; }
.coffee-hero--animate.coffee-hero--spilling .smoke-2 { animation: smoke-rise-2 4s ease-out forwards; }
.coffee-hero--animate.coffee-hero--spilling .smoke-3 { animation: smoke-rise-3 4s ease-out forwards; }

@keyframes smoke-show {
  0%, 60% { opacity: 0; }
  64%, 88% { opacity: 1; }
  100% { opacity: 0; }
}

@keyframes smoke-rise-1 {
  0%, 60% { transform: translate(0, 0) scale(0.5); opacity: 0; }
  68% { transform: translate(-10px, -20px) scale(1.2); opacity: 0.5; }
  88%, 100% { transform: translate(-20px, -50px) scale(1.8); opacity: 0; }
}

@keyframes smoke-rise-2 {
  0%, 62% { transform: translate(0, 0) scale(0.5); opacity: 0; }
  70% { transform: translate(5px, -30px) scale(1.4); opacity: 0.35; }
  90%, 100% { transform: translate(10px, -70px) scale(2); opacity: 0; }
}

@keyframes smoke-rise-3 {
  0%, 64% { transform: translate(0, 0) scale(0.5); opacity: 0; }
  72% { transform: translate(15px, -25px) scale(1.6); opacity: 0.25; }
  92%, 100% { transform: translate(25px, -60px) scale(2.2); opacity: 0; }
}

.coffee-hero--animate.coffee-hero--spilling .steam {
  animation: steam-show 4s ease-in-out forwards;
}

.coffee-hero--animate.coffee-hero--spilling .steam-1 { animation: steam-wisp 4s ease-in-out forwards; }
.coffee-hero--animate.coffee-hero--spilling .steam-2 { animation: steam-wisp 4s ease-in-out 0.3s forwards; }

@keyframes steam-show {
  0%, 5% { opacity: 0; }
  10%, 35% { opacity: 0.6; }
  45%, 100% { opacity: 0; }
}

@keyframes steam-wisp {
  0% { transform: translateY(0); opacity: 0; }
  15% { opacity: 0.5; }
  100% { transform: translateY(-15px); opacity: 0; }
}

@keyframes caption-pulse {
  0%, 55% { opacity: 0; }
  62% { opacity: 1; fill: #E1AA36; }
  100% { opacity: 0.7; fill: #6b7280; }
}

/* ── Reduced motion ── */
.coffee-hero--static .coffee-stream,
.coffee-hero--static .laptop-fragments,
.coffee-hero--static .explosion-particles,
.coffee-hero--static .smoke {
  display: none;
}

.coffee-hero--static .caption-hint {
  display: none;
}
</style>

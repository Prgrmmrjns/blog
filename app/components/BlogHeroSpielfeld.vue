<script setup lang="ts">
defineProps<{ compact?: boolean }>();

const { t } = useLocale();
const { reducedMotion } = useReducedMotion();
const isPlaying = ref(false);
let playTimer: ReturnType<typeof setTimeout> | null = null;

const uid = useId().replace(/:/g, "");

function startPlay() {
  if (reducedMotion.value) return;
  if (playTimer) {
    clearTimeout(playTimer);
    playTimer = null;
  }
  isPlaying.value = true;
}

function stopPlay() {
  isPlaying.value = false;
  if (playTimer) {
    clearTimeout(playTimer);
    playTimer = null;
  }
}

function handlePlay() {
  startPlay();
  playTimer = setTimeout(stopPlay, 2800);
}
</script>

<template>
  <div
    class="spielfeld-hero relative mx-auto flex h-full w-full items-center justify-center select-none"
    :class="[
      compact ? 'max-h-full p-4' : 'max-w-[560px] p-6',
      {
        'spielfeld-hero--static': reducedMotion,
        'spielfeld-hero--animate': !reducedMotion,
        'spielfeld-hero--playing': isPlaying,
      },
    ]"
    aria-hidden="true"
    @mouseenter="startPlay"
    @mouseleave="stopPlay"
    @click.stop="handlePlay"
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
        <linearGradient :id="`${uid}-pitch`" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#2a7a4a" />
          <stop offset="100%" stop-color="#1a4a32" />
        </linearGradient>
      </defs>

      <rect width="480" height="320" rx="16" :fill="`url(#${uid}-bg)`" />

      <!-- Pitch -->
      <g class="pitch" transform="translate(70, 36)">
        <rect width="340" height="220" rx="10" :fill="`url(#${uid}-pitch)`" />
        <g fill="none" stroke="#d4ff3f" stroke-opacity="0.75" stroke-width="2">
          <rect x="12" y="12" width="316" height="196" rx="4" />
          <line x1="170" y1="12" x2="170" y2="208" />
          <circle cx="170" cy="110" r="28" />
          <circle cx="170" cy="110" r="3.5" fill="#d4ff3f" stroke="none" />
          <rect x="100" y="12" width="140" height="36" />
          <rect x="100" y="172" width="140" height="36" />
        </g>

        <!-- Home XI dots -->
        <g class="xi home-xi" fill="#7ADAA5">
          <circle class="p p1" cx="170" cy="40" r="6" />
          <circle class="p p2" cx="110" cy="72" r="6" />
          <circle class="p p3" cx="170" cy="72" r="6" />
          <circle class="p p4" cx="230" cy="72" r="6" />
          <circle class="p p5" cx="130" cy="108" r="6" />
          <circle class="p p6" cx="210" cy="108" r="6" />
        </g>

        <!-- Away XI dots -->
        <g class="xi away-xi" fill="#E8FF9A">
          <circle class="p p7" cx="130" cy="148" r="6" />
          <circle class="p p8" cx="210" cy="148" r="6" />
          <circle class="p p9" cx="110" cy="178" r="6" />
          <circle class="p p10" cx="170" cy="178" r="6" />
          <circle class="p p11" cx="230" cy="178" r="6" />
          <circle class="p p12" cx="170" cy="200" r="6" />
        </g>

        <!-- Ball -->
        <circle class="ball" cx="200" cy="118" r="7" fill="#d4ff3f" />
      </g>

      <!-- Tip chip -->
      <g class="tip-chip" transform="translate(330, 48)">
        <rect width="72" height="28" rx="8" fill="#239BA7" opacity="0.92" />
        <text
          x="36"
          y="18"
          text-anchor="middle"
          fill="#fff"
          font-size="11"
          font-family="system-ui, sans-serif"
          font-weight="700"
        >
          HOME
        </text>
      </g>

      <!-- Shap bars -->
      <g class="shap-bars" transform="translate(88, 268)">
        <rect class="bar bar-1" x="0" y="0" width="40" height="8" rx="2" fill="#239BA7" opacity="0.35" />
        <rect class="bar bar-2" x="52" y="0" width="70" height="8" rx="2" fill="#7ADAA5" opacity="0.55" />
        <rect class="bar bar-3" x="134" y="0" width="55" height="8" rx="2" fill="#239BA7" opacity="0.45" />
        <rect class="bar bar-4" x="200" y="0" width="90" height="8" rx="2" fill="#d4ff3f" opacity="0.7" />
      </g>
    </svg>

    <p
      class="caption-hint pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-teal/50"
    >
      {{ t("heroes.spielfeldHint") }}
    </p>
    <p
      class="caption-active pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-teal/70 opacity-0"
    >
      {{ t("heroes.spielfeldActive") }}
    </p>
  </div>
</template>

<style scoped>
.spielfeld-hero--animate .caption-hint {
  transition: opacity 0.3s ease;
}
.spielfeld-hero--animate .caption-active {
  transition: opacity 0.3s ease;
}
.spielfeld-hero--animate.spielfeld-hero--playing .caption-hint {
  opacity: 0;
}
.spielfeld-hero--animate.spielfeld-hero--playing .caption-active {
  opacity: 1;
}

.spielfeld-hero--animate .ball {
  transform-origin: 200px 118px;
  transition: transform 0.6s ease;
}
.spielfeld-hero--animate.spielfeld-hero--playing .ball {
  animation: ball-pass 1.4s ease-in-out infinite;
}

.spielfeld-hero--animate .xi .p {
  transition: transform 0.45s ease, opacity 0.3s ease;
}
.spielfeld-hero--animate.spielfeld-hero--playing .p2 {
  animation: swap-left 1.4s ease-in-out infinite;
}
.spielfeld-hero--animate.spielfeld-hero--playing .p4 {
  animation: swap-right 1.4s ease-in-out infinite;
}

.spielfeld-hero--animate .tip-chip {
  transition: transform 0.4s ease, opacity 0.3s ease;
  opacity: 0.85;
}
.spielfeld-hero--animate.spielfeld-hero--playing .tip-chip {
  animation: tip-pulse 1.4s ease-in-out infinite;
}

.spielfeld-hero--animate .bar {
  transform-origin: left center;
  transition: transform 0.5s ease;
}
.spielfeld-hero--animate.spielfeld-hero--playing .bar-1 {
  animation: bar-grow 1.4s ease-in-out infinite;
}
.spielfeld-hero--animate.spielfeld-hero--playing .bar-2 {
  animation: bar-grow 1.4s ease-in-out 0.1s infinite;
}
.spielfeld-hero--animate.spielfeld-hero--playing .bar-3 {
  animation: bar-grow 1.4s ease-in-out 0.2s infinite;
}
.spielfeld-hero--animate.spielfeld-hero--playing .bar-4 {
  animation: bar-grow 1.4s ease-in-out 0.3s infinite;
}

.spielfeld-hero--static .ball,
.spielfeld-hero--static .xi .p {
  animation: none !important;
}

@keyframes ball-pass {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-28px, 22px);
  }
}

@keyframes swap-left {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(18px, 8px);
  }
}

@keyframes swap-right {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-18px, 8px);
  }
}

@keyframes tip-pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.85;
  }
  50% {
    transform: scale(1.06);
    opacity: 1;
  }
}

@keyframes bar-grow {
  0%,
  100% {
    transform: scaleX(1);
  }
  50% {
    transform: scaleX(1.12);
  }
}
</style>

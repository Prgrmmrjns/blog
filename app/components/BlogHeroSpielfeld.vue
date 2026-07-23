<script setup lang="ts">
defineProps<{ compact?: boolean }>();

const { t } = useLocale();
const { reducedMotion } = useReducedMotion();
const isSwapped = ref(false);
let resetTimer: ReturnType<typeof setTimeout> | null = null;

const uid = useId().replace(/:/g, "");

function showSwap() {
  if (reducedMotion.value) return;
  if (resetTimer) clearTimeout(resetTimer);
  isSwapped.value = true;
}

function resetSwap() {
  isSwapped.value = false;
  if (resetTimer) {
    clearTimeout(resetTimer);
    resetTimer = null;
  }
}

function toggleSwap() {
  if (reducedMotion.value) return;
  isSwapped.value = !isSwapped.value;
  if (resetTimer) clearTimeout(resetTimer);
  resetTimer = setTimeout(resetSwap, 3200);
}

onBeforeUnmount(() => {
  if (resetTimer) clearTimeout(resetTimer);
});
</script>

<template>
  <div
    class="spielfeld-hero relative mx-auto flex h-full w-full items-center justify-center select-none"
    :class="[
      compact ? 'max-h-full p-2 sm:p-4' : 'max-w-[720px] p-4 sm:p-7',
      {
        'spielfeld-hero--static': reducedMotion,
        'spielfeld-hero--swapped': isSwapped,
      },
    ]"
    aria-hidden="true"
    @mouseenter="showSwap"
    @mouseleave="resetSwap"
    @click.stop="toggleSwap"
  >
    <svg
      viewBox="0 0 720 400"
      class="h-full w-full max-h-full drop-shadow-2xl"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient :id="`${uid}-frame`" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#0c1812" />
          <stop offset="1" stop-color="#15281e" />
        </linearGradient>
        <linearGradient :id="`${uid}-pitch`" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#2f7a4c" />
          <stop offset="1" stop-color="#1e5738" />
        </linearGradient>
        <linearGradient :id="`${uid}-win`" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#7ADAA5" />
          <stop offset="1" stop-color="#D4FF3F" />
        </linearGradient>
        <filter :id="`${uid}-shadow`" x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#000" flood-opacity=".35" />
        </filter>
        <filter :id="`${uid}-glow`" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect x="5" y="5" width="710" height="390" rx="24" :fill="`url(#${uid}-frame)`" stroke="#355344" />
      <g opacity=".08" stroke="#7ADAA5">
        <path d="M30 55h660M30 105h660M30 155h660M30 205h660M30 255h660M30 305h660M30 355h660" />
        <path d="M70 25v350M130 25v350M190 25v350M250 25v350M310 25v350M370 25v350M430 25v350M490 25v350M550 25v350M610 25v350M670 25v350" />
      </g>

      <!-- Header -->
      <g transform="translate(32 28)">
        <circle cx="13" cy="13" r="13" fill="#D4FF3F" opacity=".16" />
        <path d="M6 7h14v12H6zM13 7v12M6 13h14M9 7v3M17 16v3" fill="none" stroke="#D4FF3F" stroke-width="1.2" />
        <text x="37" y="12" fill="#F3F5ED" font-family="Inter,system-ui,sans-serif" font-size="13" font-weight="800" letter-spacing="1.6">SPIELFELD</text>
        <text x="37" y="29" fill="#7E9A88" font-family="Inter,system-ui,sans-serif" font-size="9" letter-spacing=".8">MATCHDAY LAB · TABPFN</text>
      </g>
      <g transform="translate(575 35)" font-family="Inter,system-ui,sans-serif">
        <rect width="105" height="26" rx="13" fill="#D4FF3F" opacity=".12" />
        <circle cx="15" cy="13" r="4" fill="#D4FF3F" />
        <text x="28" y="17" fill="#D4FF3F" font-size="10" font-weight="700">XI ESTIMATED</text>
      </g>

      <!-- Team line -->
      <g transform="translate(40 82)" font-family="Inter,system-ui,sans-serif">
        <circle cx="20" cy="20" r="20" fill="#e53935" />
        <path d="M11 10h18v20H11zM20 10v20M11 20h18" fill="none" stroke="#fff" stroke-width="1.5" opacity=".8" />
        <text x="52" y="17" fill="#F3F5ED" font-size="17" font-weight="750">Freiburg</text>
        <text x="52" y="35" fill="#7E9A88" font-size="10">HOME</text>
        <text x="170" y="25" text-anchor="middle" fill="#486555" font-size="12" font-weight="700">VS</text>
        <circle cx="320" cy="20" r="20" fill="#159447" />
        <path d="M310 17h20M310 23h20M314 11l12 18M326 11l-12 18" stroke="#fff" stroke-width="1.3" opacity=".8" />
        <text x="288" y="17" text-anchor="end" fill="#F3F5ED" font-size="17" font-weight="750">Bremen</text>
        <text x="288" y="35" text-anchor="end" fill="#7E9A88" font-size="10">AWAY</text>
      </g>

      <!-- Pitch board -->
      <g transform="translate(40 140)" :filter="`url(#${uid}-shadow)`">
        <rect width="350" height="214" rx="14" :fill="`url(#${uid}-pitch)`" />
        <g fill="none" stroke="#D4FF3F" stroke-opacity=".55" stroke-width="1.5">
          <rect x="10" y="10" width="330" height="194" rx="4" />
          <line x1="175" y1="10" x2="175" y2="204" />
          <circle cx="175" cy="107" r="28" />
          <circle cx="175" cy="107" r="2.5" fill="#D4FF3F" />
          <path d="M10 64h42v86H10M340 64h-42v86h42" />
        </g>

        <g class="home-players">
          <g transform="translate(31 107)"><circle r="10" fill="#e53935" stroke="#fff" stroke-width="2" /><text y="4" text-anchor="middle" fill="#fff" font-family="Inter" font-size="8" font-weight="800">1</text></g>
          <g transform="translate(76 48)"><circle r="10" fill="#e53935" stroke="#fff" stroke-width="2" /><text y="4" text-anchor="middle" fill="#fff" font-family="Inter" font-size="8" font-weight="800">3</text></g>
          <g transform="translate(76 107)"><circle r="10" fill="#e53935" stroke="#fff" stroke-width="2" /><text y="4" text-anchor="middle" fill="#fff" font-family="Inter" font-size="8" font-weight="800">4</text></g>
          <g transform="translate(76 166)"><circle r="10" fill="#e53935" stroke="#fff" stroke-width="2" /><text y="4" text-anchor="middle" fill="#fff" font-family="Inter" font-size="8" font-weight="800">5</text></g>
          <g transform="translate(120 68)"><circle r="10" fill="#e53935" stroke="#fff" stroke-width="2" /><text y="4" text-anchor="middle" fill="#fff" font-family="Inter" font-size="8" font-weight="800">8</text></g>
          <g class="swap-player" transform="translate(120 146)">
            <circle class="player-glow" r="16" fill="#D4FF3F" opacity="0" />
            <circle r="10" fill="#e53935" stroke="#fff" stroke-width="2" />
            <text y="4" text-anchor="middle" fill="#fff" font-family="Inter" font-size="8" font-weight="800">10</text>
          </g>
          <g transform="translate(155 107)"><circle r="10" fill="#e53935" stroke="#fff" stroke-width="2" /><text y="4" text-anchor="middle" fill="#fff" font-family="Inter" font-size="8" font-weight="800">9</text></g>
        </g>

        <g class="away-players">
          <g transform="translate(319 107)"><circle r="10" fill="#159447" stroke="#fff" stroke-width="2" /><text y="4" text-anchor="middle" fill="#fff" font-family="Inter" font-size="8" font-weight="800">1</text></g>
          <g transform="translate(274 48)"><circle r="10" fill="#159447" stroke="#fff" stroke-width="2" /><text y="4" text-anchor="middle" fill="#fff" font-family="Inter" font-size="8" font-weight="800">2</text></g>
          <g transform="translate(274 107)"><circle r="10" fill="#159447" stroke="#fff" stroke-width="2" /><text y="4" text-anchor="middle" fill="#fff" font-family="Inter" font-size="8" font-weight="800">4</text></g>
          <g transform="translate(274 166)"><circle r="10" fill="#159447" stroke="#fff" stroke-width="2" /><text y="4" text-anchor="middle" fill="#fff" font-family="Inter" font-size="8" font-weight="800">5</text></g>
          <g transform="translate(230 68)"><circle r="10" fill="#159447" stroke="#fff" stroke-width="2" /><text y="4" text-anchor="middle" fill="#fff" font-family="Inter" font-size="8" font-weight="800">8</text></g>
          <g transform="translate(230 146)"><circle r="10" fill="#159447" stroke="#fff" stroke-width="2" /><text y="4" text-anchor="middle" fill="#fff" font-family="Inter" font-size="8" font-weight="800">10</text></g>
          <g transform="translate(195 107)"><circle r="10" fill="#159447" stroke="#fff" stroke-width="2" /><text y="4" text-anchor="middle" fill="#fff" font-family="Inter" font-size="8" font-weight="800">9</text></g>
        </g>

        <g class="swap-path">
          <path d="M120 146C145 146 142 112 155 107" fill="none" stroke="#D4FF3F" stroke-width="2" stroke-dasharray="5 5" opacity="0" />
          <circle cx="138" cy="130" r="4" fill="#D4FF3F" opacity="0" />
        </g>
      </g>

      <!-- Prediction panel -->
      <g transform="translate(420 92)" font-family="Inter,system-ui,sans-serif">
        <rect width="260" height="262" rx="18" fill="#101f17" stroke="#355344" />
        <text x="20" y="30" fill="#7E9A88" font-size="10" font-weight="700" letter-spacing="1.4">TABPFN PREDICTION</text>
        <text x="20" y="66" fill="#F3F5ED" font-size="19" font-weight="750">Home win</text>

        <g class="probability">
          <text class="prob-base" x="240" y="66" text-anchor="end" fill="#D4FF3F" font-size="27" font-weight="850">53%</text>
          <text class="prob-swapped" x="240" y="66" text-anchor="end" fill="#D4FF3F" font-size="27" font-weight="850" opacity="0">57%</text>
        </g>

        <g transform="translate(20 92)">
          <text y="8" fill="#A9BAAF" font-size="11" font-weight="700">H</text>
          <rect x="25" width="170" height="10" rx="5" fill="#24382d" />
          <rect class="home-bar" x="25" width="90" height="10" rx="5" :fill="`url(#${uid}-win)`" />
          <text x="220" y="9" text-anchor="end" fill="#D4FF3F" font-size="11" font-weight="750">53</text>

          <text y="45" fill="#A9BAAF" font-size="11" font-weight="700">D</text>
          <rect x="25" y="37" width="170" height="10" rx="5" fill="#24382d" />
          <rect x="25" y="37" width="44" height="10" rx="5" fill="#7E9A88" />
          <text x="220" y="46" text-anchor="end" fill="#A9BAAF" font-size="11" font-weight="750">26</text>

          <text y="82" fill="#A9BAAF" font-size="11" font-weight="700">A</text>
          <rect x="25" y="74" width="170" height="10" rx="5" fill="#24382d" />
          <rect x="25" y="74" width="36" height="10" rx="5" fill="#52705f" />
          <text x="220" y="83" text-anchor="end" fill="#A9BAAF" font-size="11" font-weight="750">21</text>
        </g>

        <line x1="20" y1="200" x2="240" y2="200" stroke="#355344" />
        <g transform="translate(20 218)">
          <text fill="#7E9A88" font-size="10" font-weight="700" letter-spacing="1">TOP DRIVERS</text>
          <rect y="14" width="60" height="6" rx="3" fill="#7ADAA5" />
          <rect x="68" y="14" width="42" height="6" rx="3" fill="#D4FF3F" opacity=".8" />
          <rect x="118" y="14" width="31" height="6" rx="3" fill="#ef8b8b" opacity=".8" />
          <text y="39" fill="#A9BAAF" font-size="9">ELO · FORM · XI</text>
          <g class="impact-chip" transform="translate(157 17)" opacity="0">
            <rect width="63" height="22" rx="11" fill="#D4FF3F" opacity=".13" />
            <text x="31.5" y="15" text-anchor="middle" fill="#D4FF3F" font-size="9" font-weight="800">XI +4%</text>
          </g>
        </g>
      </g>
    </svg>

    <p class="caption caption-hint">
      {{ t("heroes.spielfeldHint") }}
    </p>
    <p class="caption caption-active">
      {{ t("heroes.spielfeldActive") }}
    </p>
  </div>
</template>

<style scoped>
.caption {
  pointer-events: none;
  position: absolute;
  bottom: 0.2rem;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 0.625rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgb(35 155 167 / 0.55);
  transition: opacity 0.3s ease;
}

.caption-active {
  color: rgb(35 155 167 / 0.78);
  opacity: 0;
}

.swap-player,
.swap-path path,
.swap-path circle,
.player-glow,
.home-bar,
.prob-base,
.prob-swapped,
.impact-chip {
  transition: 0.55s cubic-bezier(.2, .75, .25, 1);
}

.spielfeld-hero--swapped .caption-hint,
.spielfeld-hero--swapped .prob-base {
  opacity: 0;
}

.spielfeld-hero--swapped .caption-active,
.spielfeld-hero--swapped .prob-swapped,
.spielfeld-hero--swapped .swap-path path,
.spielfeld-hero--swapped .swap-path circle,
.spielfeld-hero--swapped .player-glow,
.spielfeld-hero--swapped .impact-chip {
  opacity: 1;
}

.spielfeld-hero--swapped .swap-player {
  transform: translate(34px, -39px);
}

.spielfeld-hero--swapped .home-bar {
  width: 97px;
}

.spielfeld-hero--static * {
  animation: none !important;
  transition: none !important;
}
</style>

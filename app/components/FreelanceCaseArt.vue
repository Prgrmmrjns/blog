<script setup lang="ts">
import type { FreelanceCaseId } from "~/data/freelance-cases";

defineProps<{
  id: FreelanceCaseId;
  label: string;
}>();

const on = ref(false);
</script>

<template>
  <button
    type="button"
    class="case-art"
    :class="{ 'is-on': on }"
    :data-case="id"
    :aria-pressed="on"
    :aria-label="label"
    @click="on = !on"
  >
    <svg v-if="id === 'belegcheck'" viewBox="0 0 640 360" aria-hidden="true">
      <rect width="640" height="360" fill="#F3F0E6" />
      <ellipse cx="320" cy="312" rx="180" ry="16" fill="#1A1A1A" opacity="0.06" />
      <rect x="168" y="36" width="304" height="288" rx="10" fill="#fff" stroke="#1A1A1A" stroke-width="2" />
      <rect x="168" y="36" width="304" height="48" rx="10" fill="#239BA7" />
      <rect x="168" y="72" width="304" height="12" fill="#239BA7" />
      <rect x="196" y="108" width="120" height="10" rx="5" fill="#1A1A1A" opacity="0.2" />
      <rect x="196" y="156" width="248" height="28" rx="6" fill="#EFECE3" />
      <rect x="196" y="204" width="248" height="28" rx="6" fill="#EFECE3" />
      <rect x="196" y="252" width="248" height="28" rx="6" fill="#EFECE3" />
      <g class="glass">
        <circle cx="500" cy="250" r="34" fill="#F3F0E6" stroke="#239BA7" stroke-width="6" />
        <path d="M524 274 L558 308" stroke="#239BA7" stroke-width="6" stroke-linecap="round" />
      </g>
      <g class="reveal" data-reveal>
        <rect x="196" y="204" width="248" height="28" rx="6" fill="#E1AA36" />
        <circle cx="420" cy="218" r="8" fill="#1A1A1A" />
        <path d="M214 266 l8 8 l16-18" fill="none" stroke="#7ADAA5" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      </g>
    </svg>

    <svg v-else-if="id === 'obsidian'" viewBox="0 0 640 360" aria-hidden="true">
      <rect width="640" height="360" fill="#141414" />
      <g stroke="#3A3A3A" stroke-width="2">
        <path d="M120 190 L230 96" />
        <path d="M120 190 L250 250" />
        <path d="M230 96 L400 130" />
        <path d="M250 250 L400 130" />
        <path d="M400 130 L520 86" />
        <path d="M400 130 L540 220" />
        <path d="M250 250 L540 220" />
      </g>
      <path
        class="vault-path reveal"
        data-reveal
        d="M120 190 L230 96 L400 130 L540 220"
        fill="none"
        stroke="#7ADAA5"
        stroke-width="4"
        stroke-linecap="round"
      />
      <g fill="#F3F0E6">
        <circle cx="120" cy="190" r="16" />
        <circle cx="230" cy="96" r="14" />
        <circle cx="250" cy="250" r="12" />
        <circle cx="520" cy="86" r="11" />
      </g>
      <circle cx="400" cy="130" r="22" fill="#E1AA36" />
      <circle class="hub" cx="540" cy="220" r="18" fill="#239BA7" />
    </svg>

    <svg v-else-if="id === 'website'" viewBox="0 0 640 360" aria-hidden="true">
      <rect width="640" height="360" fill="#F3F0E6" />
      <rect x="70" y="40" width="500" height="280" rx="16" fill="#fff" stroke="#1A1A1A" stroke-width="2" />
      <circle cx="98" cy="68" r="6" fill="#E1AA36" />
      <circle cx="118" cy="68" r="6" fill="#239BA7" />
      <circle cx="138" cy="68" r="6" fill="#7ADAA5" />
      <g class="bar">
        <rect x="96" y="96" width="448" height="36" rx="8" fill="#239BA7" />
      </g>
      <g class="card-a">
        <rect x="96" y="152" width="210" height="130" rx="12" fill="#EFECE3" stroke="#1A1A1A" stroke-width="1.5" />
      </g>
      <g class="card-b">
        <rect x="324" y="152" width="220" height="78" rx="12" fill="#fff" stroke="#1A1A1A" stroke-width="1.5" />
      </g>
      <g class="reveal cta" data-reveal>
        <rect x="324" y="246" width="120" height="36" rx="18" fill="#E1AA36" />
      </g>
    </svg>

    <svg v-else-if="id === 'excel'" viewBox="0 0 640 360" aria-hidden="true">
      <rect width="640" height="360" fill="#F7F4EC" />
      <rect x="48" y="36" width="544" height="288" rx="12" fill="#fff" stroke="#1A1A1A" stroke-width="2" />
      <g stroke="#E4E0D4">
        <path d="M48 96 H592 M48 156 H592 M48 216 H592 M48 276 H324 M184 36 V324 M320 36 V324 M456 36 V324" stroke-width="1.5" />
      </g>
      <rect x="48" y="36" width="544" height="60" fill="#239BA7" />
      <g class="cells">
        <rect x="196" y="168" width="112" height="40" fill="#239BA7" />
        <rect x="332" y="168" width="112" height="40" fill="#7ADAA5" />
      </g>
      <g class="reveal" data-reveal>
        <rect x="468" y="228" width="112" height="48" fill="#E1AA36" />
        <path d="M400 188 H450 L440 180 M450 188 L440 196" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      </g>
    </svg>

    <svg v-else-if="id === 'images'" viewBox="0 0 640 360" aria-hidden="true">
      <rect width="640" height="360" fill="#F3F0E6" />
      <g class="plate mint">
        <rect x="150" y="70" width="280" height="180" rx="8" fill="#7ADAA5" />
      </g>
      <g class="plate gold">
        <rect x="170" y="86" width="280" height="180" rx="8" fill="#E1AA36" />
      </g>
      <g class="plate teal">
        <rect x="190" y="102" width="280" height="180" rx="8" fill="#239BA7" />
        <circle cx="280" cy="170" r="28" fill="#F3F0E6" />
        <path d="M230 240 L300 190 L360 250 L430 200 L470 250 V282 H230 Z" fill="#F3F0E6" opacity="0.85" />
      </g>
      <g class="reveal crop" data-reveal fill="none" stroke="#1A1A1A" stroke-width="3">
        <path d="M188 100 H210 M188 100 V122 M472 100 H450 M472 100 V122 M188 284 H210 M188 284 V262 M472 284 H450 M472 284 V262" stroke-linecap="square" />
      </g>
    </svg>

    <svg v-else-if="id === 'inbox'" viewBox="0 0 640 360" aria-hidden="true">
      <rect width="640" height="360" fill="#F3F0E6" />
      <g>
        <rect x="48" y="230" width="150" height="78" rx="12" fill="#239BA7" opacity="0.25" />
        <rect x="245" y="230" width="150" height="78" rx="12" fill="#E1AA36" opacity="0.3" />
        <rect x="442" y="230" width="150" height="78" rx="12" fill="#7ADAA5" opacity="0.35" />
      </g>
      <g class="env a">
        <rect x="250" y="48" width="140" height="92" rx="8" fill="#fff" stroke="#1A1A1A" stroke-width="2" />
        <path d="M250 48 L320 100 L390 48" fill="none" stroke="#239BA7" stroke-width="2" />
      </g>
      <g class="env b">
        <rect x="266" y="70" width="140" height="92" rx="8" fill="#fff" stroke="#1A1A1A" stroke-width="2" />
        <path d="M266 70 L336 122 L406 70" fill="none" stroke="#E1AA36" stroke-width="2" />
      </g>
      <g class="env c reveal" data-reveal>
        <rect x="282" y="92" width="140" height="92" rx="8" fill="#fff" stroke="#1A1A1A" stroke-width="2" />
        <path d="M282 92 L352 144 L422 92" fill="none" stroke="#7ADAA5" stroke-width="2" />
      </g>
    </svg>

    <svg v-else-if="id === 'meetings'" viewBox="0 0 640 360" aria-hidden="true">
      <rect width="640" height="360" fill="#F3F0E6" />
      <ellipse cx="210" cy="230" rx="130" ry="46" fill="#fff" stroke="#1A1A1A" stroke-width="2" />
      <g class="bubbles">
        <rect x="70" y="48" width="120" height="64" rx="16" fill="#239BA7" />
        <rect x="210" y="36" width="110" height="58" rx="16" fill="#E1AA36" />
        <rect x="150" y="120" width="100" height="52" rx="16" fill="#7ADAA5" />
      </g>
      <g class="reveal list" data-reveal>
        <rect x="390" y="70" width="190" height="210" rx="14" fill="#fff" stroke="#1A1A1A" stroke-width="2" />
        <g fill="none" stroke="#239BA7" stroke-width="3" stroke-linecap="round">
          <rect x="414" y="104" width="22" height="22" rx="4" />
          <rect x="414" y="156" width="22" height="22" rx="4" />
          <rect x="414" y="208" width="22" height="22" rx="4" />
          <path d="M418 116 l5 5 l10-12 M418 168 l5 5 l10-12 M418 220 l5 5 l10-12" />
        </g>
        <g fill="#1A1A1A" opacity="0.25">
          <rect x="450" y="110" width="100" height="8" rx="4" />
          <rect x="450" y="162" width="80" height="8" rx="4" />
          <rect x="450" y="214" width="90" height="8" rx="4" />
        </g>
      </g>
    </svg>

    <svg v-else-if="id === 'chatbot'" viewBox="0 0 640 360" aria-hidden="true">
      <rect width="640" height="360" fill="#F3F0E6" />
      <rect x="36" y="28" width="420" height="304" rx="14" fill="#fff" stroke="#1A1A1A" stroke-width="2" />
      <rect x="60" y="56" width="200" height="18" rx="6" fill="#239BA7" />
      <rect x="60" y="92" width="300" height="10" rx="5" fill="#1A1A1A" opacity="0.12" />
      <rect x="60" y="114" width="260" height="10" rx="5" fill="#1A1A1A" opacity="0.12" />
      <rect x="60" y="154" width="160" height="120" rx="10" fill="#EFECE3" />
      <rect x="236" y="154" width="180" height="54" rx="10" fill="#EFECE3" />
      <rect x="236" y="220" width="180" height="54" rx="10" fill="#EFECE3" />
      <g class="dock reveal" data-reveal>
        <rect x="400" y="150" width="210" height="170" rx="16" fill="#161616" />
        <rect x="418" y="176" width="120" height="28" rx="14" fill="#239BA7" />
        <rect x="470" y="216" width="120" height="28" rx="14" fill="#E1AA36" />
        <rect x="418" y="268" width="174" height="28" rx="14" fill="#2A2A2A" />
      </g>
    </svg>

    <svg v-else-if="id === 'search'" viewBox="0 0 640 360" aria-hidden="true">
      <rect width="640" height="360" fill="#1A1A1A" />
      <g fill="#2C2C2C">
        <rect x="70" y="40" width="150" height="200" rx="6" />
        <rect x="240" y="70" width="150" height="220" rx="6" />
        <rect x="410" y="36" width="160" height="240" rx="6" />
      </g>
      <g class="beam reveal" data-reveal>
        <polygon points="80,0 200,0 470,200 390,200" fill="#E1AA36" opacity="0.35" />
        <rect x="430" y="150" width="120" height="16" rx="3" fill="#7ADAA5" />
      </g>
      <circle cx="96" cy="300" r="22" fill="none" stroke="#239BA7" stroke-width="6" />
      <path d="M112 316 L140 344" stroke="#239BA7" stroke-width="6" stroke-linecap="round" />
    </svg>

    <svg v-else-if="id === 'papers'" viewBox="0 0 640 360" aria-hidden="true">
      <rect width="640" height="360" fill="#F3F0E6" />
      <rect x="48" y="32" width="200" height="296" rx="8" fill="#fff" stroke="#1A1A1A" stroke-width="2" />
      <g fill="#1A1A1A" opacity="0.15">
        <rect x="72" y="60" width="150" height="10" rx="4" />
        <rect x="72" y="84" width="120" height="8" rx="4" />
        <rect x="72" y="110" width="152" height="8" rx="4" />
        <rect x="72" y="128" width="140" height="8" rx="4" />
        <rect x="72" y="146" width="100" height="8" rx="4" />
        <rect x="72" y="180" width="152" height="70" rx="6" />
      </g>
      <path class="arrow" d="M270 180 H330" fill="none" stroke="#E1AA36" stroke-width="4" stroke-linecap="round" />
      <path class="arrow head" d="M322 170 L340 180 L322 190" fill="none" stroke="#E1AA36" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <g class="reveal note" data-reveal>
        <rect x="360" y="70" width="220" height="150" rx="12" fill="#fff" stroke="#239BA7" stroke-width="2" />
        <rect x="384" y="98" width="90" height="8" rx="4" fill="#239BA7" />
        <rect x="384" y="120" width="160" height="8" rx="4" fill="#1A1A1A" opacity="0.2" />
        <rect x="384" y="140" width="140" height="8" rx="4" fill="#1A1A1A" opacity="0.2" />
        <circle cx="400" cy="250" r="8" fill="#E1AA36" />
        <circle cx="450" cy="230" r="8" fill="#7ADAA5" />
        <circle cx="510" cy="260" r="8" fill="#239BA7" />
        <path d="M400 250 L450 230 L510 260" fill="none" stroke="#1A1A1A" stroke-width="2" />
        <path d="M500 158 c0 -18 26 -18 26 2 c0 12 -13 14 -13 26" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" />
        <circle cx="513" cy="200" r="3.5" fill="#1A1A1A" />
      </g>
    </svg>
  </button>
</template>

<style scoped>
.case-art {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.case-art:focus-visible {
  outline: 2px solid #239ba7;
  outline-offset: -6px;
}

.case-art svg {
  display: block;
  width: 100%;
  height: 100%;
}

.reveal,
.glass,
.bar,
.card-a,
.card-b,
.cells,
.plate,
.env,
.bubbles,
.dock,
.arrow,
.hub,
.vault-path {
  transition:
    transform 0.45s ease,
    opacity 0.35s ease,
    stroke-dashoffset 0.6s ease;
}

.reveal {
  opacity: 0;
}

.case-art:hover .reveal,
.case-art.is-on .reveal {
  opacity: 1;
}

.glass {
  transform: translate(0, 0);
}

.case-art:hover .glass,
.case-art.is-on .glass {
  transform: translate(-150px, -28px);
}

.vault-path {
  stroke-dasharray: 820;
  stroke-dashoffset: 820;
}

.case-art:hover .vault-path,
.case-art.is-on .vault-path {
  stroke-dashoffset: 0;
}

.hub {
  transform: scale(1);
  transform-box: fill-box;
  transform-origin: center;
}

.case-art:hover .hub,
.case-art.is-on .hub {
  transform: scale(1.25);
}

.bar {
  transform: translate(-36px, -20px);
}

.card-a {
  transform: translate(-28px, 24px);
}

.card-b {
  transform: translate(32px, 18px);
}

.case-art:hover .bar,
.case-art:hover .card-a,
.case-art:hover .card-b,
.case-art.is-on .bar,
.case-art.is-on .card-a,
.case-art.is-on .card-b {
  transform: translate(0, 0);
}

.cells {
  opacity: 0.25;
}

.case-art:hover .cells,
.case-art.is-on .cells {
  opacity: 1;
}

.plate.mint,
.plate.gold,
.plate.teal {
  transform: translate(0, 0);
}

.case-art:hover .plate.mint,
.case-art.is-on .plate.mint {
  transform: translate(-56px, -16px);
}

.case-art:hover .plate.gold,
.case-art.is-on .plate.gold {
  transform: translate(8px, 8px);
}

.case-art:hover .plate.teal,
.case-art.is-on .plate.teal {
  transform: translate(64px, 28px);
}

.env.a,
.env.b,
.env.c {
  transform: translate(0, 0);
}

.case-art:hover .env.a,
.case-art.is-on .env.a {
  transform: translate(-188px, 150px);
}

.case-art:hover .env.b,
.case-art.is-on .env.b {
  transform: translate(-8px, 128px);
}

.case-art:hover .env.c,
.case-art.is-on .env.c {
  transform: translate(150px, 108px);
}

.bubbles {
  opacity: 1;
}

.case-art:hover .bubbles,
.case-art.is-on .bubbles {
  opacity: 0.15;
}

.dock {
  transform: translate(24px, 28px);
}

.case-art:hover .dock,
.case-art.is-on .dock {
  transform: translate(0, 0);
}

.arrow {
  stroke-dasharray: 90;
  stroke-dashoffset: 90;
}

.case-art:hover .arrow,
.case-art.is-on .arrow {
  stroke-dashoffset: 0;
}

@media (prefers-reduced-motion: reduce) {
  .case-art * {
    transition: none;
  }
}
</style>

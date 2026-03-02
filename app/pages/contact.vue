<script setup lang="ts">
useHead({
  title: "Contact — Jonas Wolber",
  meta: [{ name: "description", content: "Get in touch with Jonas Wolber." }],
});

const links = [
  { href: "https://www.linkedin.com/in/jonas-wolber/", label: "LinkedIn", desc: "Connect professionally" },
  { href: "https://github.com/Prgrmmrjns", label: "GitHub", desc: "Code & projects" },
  { href: "https://www.researchgate.net/profile/Jonas-Wolber-4", label: "ResearchGate", desc: "Publications" },
  { href: "https://www.ukaachen.de/kliniken-institute/institut-fuer-digitale-allgemeinmedizin/ueber-uns/team/jonas-wolber/", label: "Uniklinikum RWTH Aachen", desc: "Institute profile" },
];
</script>

<template>
  <div class="min-h-screen bg-[#f5f3eb] dark:bg-[#0e0e0e]">
    <header class="py-24 px-6 text-center">
      <h1 class="text-4xl font-extrabold text-gray-900 dark:text-cream sm:text-5xl">
        Contact
      </h1>
      <p class="mt-4 text-lg text-gray-600 dark:text-cream/60">
        Get in touch
      </p>
    </header>

    <main class="mx-auto max-w-2xl px-6 pb-32">
      <div class="space-y-6">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="flex flex-col gap-1 rounded-2xl border border-gray-200 bg-white p-6 shadow transition-colors hover:border-teal/50 hover:shadow-md dark:border-white/10 dark:bg-[#161616] dark:hover:border-mint/30 dark:hover:bg-[#1a1a1a]"
        >
          <span class="font-semibold text-gray-900 dark:text-cream">{{ link.label }}</span>
          <span class="text-sm text-gray-600 dark:text-cream/50">{{ link.desc }}</span>
        </a>
      </div>
    </main>

    <footer class="border-t border-gray-200 py-12 text-center text-xs text-gray-500 dark:border-white/5 dark:text-cream/30">
      Jonas Wolber · Curiosity is all you need.
    </footer>
  </div>
</template>

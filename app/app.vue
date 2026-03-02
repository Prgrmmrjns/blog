<script setup lang="ts">
useHead({
  script: [
    {
      innerHTML: `(function(){var t=localStorage.getItem('theme');var d=!(t==='light'||(t!=='dark'&&!window.matchMedia('(prefers-color-scheme: dark)').matches));document.documentElement.classList.toggle('dark',d);})();`,
      tagPosition: "head",
    },
  ],
});
</script>

<template>
  <div>
    <Navbar />
    <main class="pt-16">
      <NuxtPage />
    </main>
  </div>
</template>

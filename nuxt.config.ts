export default defineNuxtConfig({
  compatibilityDate: "2025-05-10",
  future: {
    compatibilityVersion: 4,
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts", "@nuxt/content", "@nuxtjs/supabase"],
  supabase: {
    redirect: false,
  },
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config.ts",
  },
  googleFonts: {
    families: {
      "Playfair Display": [400, 500, 600, 700, 800, 900],
      Inter: [300, 400, 500, 600, 700],
    },
    display: "swap",
  },
  app: {
    head: {
      title: "Jonas Wolber — Science, AI, Programming, Medicine, Health & Fitness",
      meta: [
        {
          name: "description",
          content:
            "Curiosity is all you need. Personal blog on science, AI, programming, medicine, health and fitness. Doctoral student in Computational Biomedicine at RWTH Aachen.",
        },
      ],
    },
  },
});

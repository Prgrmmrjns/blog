// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxt/ui', '@nuxtjs/supabase'],
  routeRules: {
    '/': { prerender: true }
  },
  supabase: {
    redirect: false,
    redirectOptions: {
      login: '',
      callback: '',
      exclude: ['/*'],
      global: false
    }
  }
})
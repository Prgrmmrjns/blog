// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [    
        '@nuxtjs/tailwindcss',
        '@nuxt/content',
    ],
    components: {global: true,
        dirs: ['~/components']    
    }, 
})

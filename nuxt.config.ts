// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [    
        '@nuxtjs/tailwindcss',
        '@nuxt/content',
        '@nuxt/image-edge'
    ],
    components: {
        global: true,
        dirs: ['~/components']    
    },
})

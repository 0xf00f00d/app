// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  build: {
    transpile: ['vuetify'],
  },
  ssr: true,
  modules: ['@pinia/nuxt', 'nuxt-windicss', '@kevinmarrec/nuxt-pwa'],
  pwa: {
    workbox: {
      enabled: true,
    },
  },
  nitro: {
    preset: 'vercel',
  },
})

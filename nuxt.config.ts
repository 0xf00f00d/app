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
  modules: [
    '@pinia/nuxt',
    'nuxt-windicss',
    '@kevinmarrec/nuxt-pwa',
    '@nuxtjs/apollo',
  ],
  pwa: {
    workbox: {
      enabled: true,
    },
  },
  nitro: {
    preset: 'vercel',
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: process.env.NODE_ENV === 'production' ? 'https://edvtkshmocpxjwjlxyck.hasura.ap-southeast-1.nhost.run/v1/graphql' : 'http://localhost:1337/v1/graphql'
      }
    },
  },
})

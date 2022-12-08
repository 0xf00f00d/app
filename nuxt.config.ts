// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  build: {
    transpile: ['vuetify', '@vue/apollo-composable'],
  },
  ssr: true,
  modules: [
    '@pinia/nuxt',
    'nuxt-windicss',
    '@kevinmarrec/nuxt-pwa',
    '@nuxtjs/apollo',
    '@vueuse/nuxt',
  ],
  apollo: {
    clients: {
      default: {
        httpEndpoint: process.env.NODE_ENV === 'production' ? 'https://edvtkshmocpxjwjlxyck.hasura.ap-southeast-1.nhost.run/v1/graphql' : 'http://localhost:8080/v1/graphql',
      }
    },
  },
  pwa: {
    workbox: {
      enabled: true,
    },
  },
  nitro: {
    preset: 'vercel',
  },
  runtimeConfig: {
    public: {
      backendUrl: process.env.NODE_ENV === 'production' ? 'https://edvtkshmocpxjwjlxyck.hasura.ap-southeast-1.nhost.run/v1/graphql' : 'http://localhost:8080/v1/graphql',
      subdomain: process.env.NODE_ENV === 'production' ? 'edvtkshmocpxjwjlxyck' : 'localhost',
      region: process.env.NODE_ENV === 'production' ? 'ap-southeast-1' : '',
      env: process.env.NODE_ENV,
    },
  },
  experimental: {
    reactivityTransform: true,
    inlineSSRStyles: false,
  },
})

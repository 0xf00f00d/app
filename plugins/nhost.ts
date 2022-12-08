import { createApolloClient } from '@nhost/apollo'
import { NhostClient } from '@nhost/vue'
import { DefaultApolloClient } from '@vue/apollo-composable'

export default defineNuxtPlugin(nuxt => {
    const nhost = new NhostClient({
        subdomain: 'localhost',
        region: ''
    })
      
    const apolloClient = createApolloClient({ nhost })

    nuxt.vueApp.provide(DefaultApolloClient, apolloClient).use(nhost)
})
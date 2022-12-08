import { createApolloClient } from '@nhost/apollo'
import { NhostClient } from '@nhost/vue'
import * as apolloComposable from '@vue/apollo-composable'

export default defineNuxtPlugin(nuxt => {
  const config = useRuntimeConfig()
  const nhost = new NhostClient({
    subdomain: config.public.subdomain,
    region: config.public.region,
  })
    
  const apolloClient = createApolloClient({ nhost })

  nuxt.vueApp.provide(apolloComposable.DefaultApolloClient, apolloClient).use(nhost)
})
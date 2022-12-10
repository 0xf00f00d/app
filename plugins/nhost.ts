import { createApolloClient } from '@nhost/apollo'
import { DefaultNhostClient, NhostClient, useAuthenticated, useNhostClient } from '@nhost/vue'
import * as apolloComposable from '@vue/apollo-composable'
import { useNhostStore } from '~~/stores/nhost'

export default defineNuxtPlugin(nuxt => {
  console.log('[defineNuxtPlugin:nhost]')
  
  const config = useRuntimeConfig()
  const nhost = new NhostClient({
    subdomain: config.public.subdomain,
    region: config.public.region,
  })
  const apolloClient = createApolloClient({ nhost })
  nuxt.vueApp.provide(apolloComposable.DefaultApolloClient, apolloClient).use(nhost)

  nuxt.hooks.hook('app:mounted', (v) => {
    console.log('[app:mounted]');
    
    // const { nhost } = useNhostClient()
  })

  addRouteMiddleware('nhost', () => {
    const { nhost } = useNhostClient()
    const authenticated = useAuthenticated()
    console.log('[middleware:nhost]: ', authenticated);
    
  })
})
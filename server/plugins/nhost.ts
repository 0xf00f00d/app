import { createApolloClient } from '@nhost/apollo'
import { DefaultNhostClient, NhostClient } from '@nhost/vue'
import * as apolloComposable from '@vue/apollo-composable'
import { useNhostStore } from '~~/stores/nhost'

export default defineNitroPlugin(nitro => {
  console.log('[nhost:defineNitroPlugin]')
  
  const config = useRuntimeConfig()
  const nhost = new NhostClient({
    subdomain: config.public.subdomain,
    region: config.public.region,
  })

  nitro.hooks.hook('render:html', () => {})
})
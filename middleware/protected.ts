import { DefaultNhostClient, NhostClient, useAuthenticated, useNhostClient } from '@nhost/vue'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxt = useNuxtApp()
  //nuxt.vueApp.provide(Symbol('default-nhost-client', ))
  
  nuxt.hooks.hook('page:start', (v) => {
    console.log('[page:start]')
    
    const authenticated = useAuthenticated()
    // const { nhost } = useNhostClient()
  })
  
  console.log('[defineNuxtRouteMiddleware:protected]')
  
  const { subdomain, region } = useRuntimeConfig().public
  const nhost = new NhostClient({
    subdomain,
    region,
  })
  const authenticated = await nhost.auth.isAuthenticatedAsync()
  console.log('[nhost:auth]: ', authenticated, process.server)
  
  nuxt.vueApp.provide(DefaultNhostClient, nhost)
  
  // const { nhost: client } = useNhostClient()
  const guest = useState<boolean>('guest')
  console.log('[guest]: ', guest.value, authenticated)
  
  if (guest.value) {
    console.log('you are a guest')
    
    return navigateTo('/auth/login')
  }
})
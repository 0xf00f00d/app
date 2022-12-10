import { DefaultNhostClient, NhostClient, useAuthenticated } from '@nhost/vue'

export default defineNuxtRouteMiddleware((to, from) => {
  const nuxt = useNuxtApp()
  
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
  const authenticated = nhost.auth.isAuthenticated()
  console.log('[nhost:auth]: ', authenticated)
  
  nuxt.vueApp.provide(DefaultNhostClient, nhost)
  
  // const { nhost: client } = useNhostClient()
  const guest = useState<boolean>('guest')
  console.log('[guest]: ', guest.value, authenticated)
  
  if (guest.value) {
    console.log('you are a guest')
    
    return navigateTo('/auth/login')
  }
})
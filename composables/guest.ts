import { useAuthenticated, useUserRoles } from '@nhost/vue'

export const useGuest = () => {
  const roles = useUserRoles()
  const authenticated = useAuthenticated()
  return useState('guest', () => roles.value.includes('anonymous'))
}
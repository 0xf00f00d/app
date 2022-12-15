import { useAuthenticated, useUserDefaultRole } from '@nhost/vue'

export const useGuest = () => {
  const role = useUserDefaultRole()
  const authenticated = useAuthenticated()
  return useState('guest', () => role.value === 'anonymous')
}
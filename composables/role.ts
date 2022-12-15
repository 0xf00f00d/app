import { useUserDefaultRole } from '@nhost/vue';


export const useIsEmployer = () => {
  const defaultRole = useUserDefaultRole()
  return defaultRole.value === 'employer'
}

export const useIsSeeker = () => {
  const defaultRole = useUserDefaultRole()
  return defaultRole.value === 'seeker'
}

export const useIsGuest = () => {
  const defaultRole = useUserDefaultRole()
  return defaultRole.value === 'anonymous'
}

export const useIsDefaultUser = () => {
  const defaultRole = useUserDefaultRole()
  return defaultRole.value === 'user'
}
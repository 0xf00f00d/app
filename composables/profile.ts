import { Profile } from './../models/graphql';
import { useNhostClient, useUserId } from '@nhost/vue';


export const useProfile = () => {
  const { nhost } = useNhostClient()
  const userId = useUserId()
  const profile = ref<Profile>()
  const QUERY = gql`
    query Profile {
      createMyProfile(userId: userId) {
        name
        email
      }
    }
  `
  return useState('profile', () => profile)
}
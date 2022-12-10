import { NhostClient } from '@nhost/vue';

/* export const useNhost = () => {
  const nhost = useState<NhostClient>('__nhostClient__')
  const { region, subdomain } = useRuntimeConfig().public
  if (!nhost) {
    const __nhost = new NhostClient({
      region,
      subdomain,
    })

    defineNhost(__nhost)
  }

  return nhost
} */

export const defineNhost = (instance: NhostClient) => {
  useState('__nhostClient__', () => instance)
}
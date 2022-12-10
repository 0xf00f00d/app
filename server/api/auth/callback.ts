import { useNhostClient } from '@nhost/vue';

export default defineEventHandler(async (e) => {
  const { nhost } = useNhostClient()
  console.log('[req]: ', e.node.req);
  return {
    api: 'works',
  }
})
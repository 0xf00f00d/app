import { NhostClient } from "@nhost/vue"

const config = useRuntimeConfig()
const nhost = new NhostClient({
  subdomain: config.public.subdomain,
  region: config.public.region,
})
const config = useRuntimeConfig()

export const useEnv = () => config.public.env

export const useProd = () => config.public.env === 'production'
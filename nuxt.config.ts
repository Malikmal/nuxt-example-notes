// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-headlessui',
  ],
  runtimeConfig: {
    public: {
      api_url: process.env.API_URL
    }
  }
})

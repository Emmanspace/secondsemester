// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@pinia/nuxt',
  ],
  runtimeConfig:{
    public:{
      apiBase: process.env.NUXT_API_BASE,
      apiLocale: process.env.NUXT_API_BASE_URL,
      nuxt_django: process.env.NUXT_API_DJANGO,
      HELLO: process.env.HELLO
    },
  },
})
 
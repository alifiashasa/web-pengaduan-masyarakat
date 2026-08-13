// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/i18n', '@vee-validate/nuxt'],
  css: ['~/assets/css/main.css', '~/assets/scss/main.scss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  i18n: {
    defaultLocale: 'id',
    detectBrowserLanguage: false,
    locales: [
      {
        code: 'en',
        name: 'English',
      },
      {
        code: 'id',
        name: 'Bahasa Indonesia',
      },
    ],
    strategy: 'prefix_except_default',
    vueI18n: './i18n.config.ts',
  },
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.VITE_APP_API_URL,
      apiKey: process.env.VITE_APP_API_KEY,
      baseUrl: process.env.VITE_APP_BASE_URL,
    },
  },
});

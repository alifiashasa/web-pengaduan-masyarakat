// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/i18n', '@vee-validate/nuxt', '@pinia/nuxt'],
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
      apiUrl:
        process.env.VITE_APP_API_URL || 'https://backoffice-pengaduan-masyarakat.can.co.id/api',
      apiKey: process.env.VITE_APP_API_KEY || '',
      baseUrl: process.env.VITE_APP_BASE_URL || 'https://backoffice-pengaduan-masyarakat.can.co.id',
      firebaseApiKey: process.env.VITE_FIREBASE_API_KEY || '',
      firebaseAuthDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || '',
      firebaseProjectId: process.env.VITE_FIREBASE_PROJECT_ID || '',
      firebaseStorageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || '',
      firebaseMessagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
      firebaseAppId: process.env.VITE_FIREBASE_APP_ID || '',
      firebaseMeasurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID || '',
    },
  },
});

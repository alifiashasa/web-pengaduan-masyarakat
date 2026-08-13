/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
    },
    extend: {
      colors: {
        brand: {
          orange: '#F05323',
          'orange-hover': '#D44317',
          'orange-light': '#FFF2EE',
          dark: '#181818',
          'dark-card': '#1E1E1E',
          gray: '#6B7280',
          'gray-light': '#F9FAFB',
          border: '#E5E7EB',
        },
        status: {
          pending: {
            bg: '#FFF7ED',
            text: '#EA580C',
            border: '#FFEDD5',
          },
          proses: {
            bg: '#EFF6FF',
            text: '#2563EB',
            border: '#DBEAFE',
          },
          selesai: {
            bg: '#ECFDF5',
            text: '#059669',
            border: '#A7F3D0',
          },
          ditolak: {
            bg: '#FEF2F2',
            text: '#DC2626',
            border: '#FECACA',
          },
        },
      },
      fontFamily: {
        sans: ['Geist', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
        geist: ['Geist', 'sans-serif'],
        urbanist: ['Urbanist', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        card: '0px 4px 20px rgba(0, 0, 0, 0.05)',
        modal: '0px 10px 40px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light'],
  },
};

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  app: {
    baseURL: '/tpc-yonmartinez.github.io/'
  },

  modules: [
    '@nuxtjs/i18n',
  ],

  ssr: true,
  nitro: {
    preset: 'static',
    output: {
      publicDir: 'docs',
    },
  },

  i18n: {
    defaultLocale: 'en',
    langDir: 'lang',
    baseUrl: '/tpc-yonmartinez.github.io/',
    locales: [{
      code: 'en',
      iso: 'en-US',
      file: 'en.json',
      name: 'English'
    }, {
      code: 'es',
      iso: 'es-MX',
      file: 'es.json',
      name: 'Español'
    }],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: false,
      cookieCrossOrigin: true
    }
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/_variables.scss" as *;'
        }
      }
    }
  },

  css: ['~/assets/css/main.css', '~/assets/base.scss'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  components: {
    global: true,
    dirs: [
      '~/components',
      {
        path: '~/components/group',
        prefix: 'group'
      }
    ]
  },

  experimental: {
    defaults: {
      nuxtLink: {
        externalRelAttribute: 'referrer'
      }
    }
  },

  devtools: { enabled: true }
})
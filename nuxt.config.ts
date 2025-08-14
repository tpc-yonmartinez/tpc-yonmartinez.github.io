// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  app: {
    head: {
      script: [
        { src: '//js.hsforms.net/forms/v2.js', type: 'text/javascript', defer: true }
      ]
    }
  },

  modules: [
    '@nuxtjs/i18n',
  ],
    ssr: true,
    target: 'static',
    nitro: {
      preset: 'static',
      output: {
        publicDir: 'docs',
      },
    },
  i18n: {
    defaultLocale: 'en',
    lazy: true,
    seo: false,
    legacy: false,
    langDir: 'lang',
    baseUrl: 'https://www.thepalacecompany.com/',
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
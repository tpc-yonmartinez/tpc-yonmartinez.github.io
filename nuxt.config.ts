// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  app: {
    head: {
      title: 'PR Gloabal Static',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/assets/img/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/assets/img/favicon-32x32.png' },
        { rel: 'apple-touch-icon', type: 'image/png', sizes: '180x180', href: '/assets/img/apple-touch-icon.png' }
      ],
      script: [
        { src: '//js.hsforms.net/forms/v2.js', type: 'text/javascript', defer: true }
      ]
    }
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
    locales: [
      {code: 'en', iso: 'en-US', file: 'en.json', name: 'English'},
      {code: 'es', iso: 'es-MX', file: 'es.json', name: 'Español'}
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    langDir: 'lang',
    baseUrl: 'https://www.thepalacecompany.com/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: false,
      cookieCrossOrigin: true
    },
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
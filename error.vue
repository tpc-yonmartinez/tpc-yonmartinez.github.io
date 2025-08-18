<script setup lang="ts">
import type { NuxtError } from '#app'
import { ref } from 'vue'
import useParseText from '@/composables/useParseText'
import { LazyTitle } from '#components'

const props = defineProps({
  error: Object as () => NuxtError,
  text404: {
    type: String,
    default: ''
  },

})

const { locale, t } = useI18n(),
      loading = ref({ bool: false, request: false }),
      nuxtApp = useNuxtApp(),
      modal = useState('modal')

useState('hero', () => true)

useHead({
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/assets/img/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/assets/img/favicon-96x96.png' },
    { rel: 'apple-touch-icon', type: 'image/png', sizes: '180x180', href: '/assets/img/apple-touch-icon.png' }
  ],
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  script: [
    { src: '//js.hsforms.net/forms/v2.js', type: 'text/javascript', defer: true },
    { src: 'https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js', 'data-cfasync': false, defer: true }
  ]
})

const errorPage = props.error?.data ? JSON.parse(props.error.data) : props.error

nuxtApp.hook('page:start', () => {
  loading.value = { bool: true, request: false }
})
nuxtApp.hook('page:finish', () => {
  loading.value = { bool: false, request: false }
})

const titleFormatted = (text) => (useParseText(text))?.replace(/\*{1,2}(.*?)\*{1,2}/g, '<strong>$1</strong>')
</script>

<template>
    <div class="app">
      <Transition name="page-palace">
        <LazyLoading v-if="loading.bool" />
      </Transition>
      <LazyHeader v-if="error.statusCode >= 400 && error.statusCode <= 500"/>
      <div class="error py-[50px] md:px-[10vw] md:py-[60px] 2xl:py-[100px]">
        <div class="content-align md:flex md:items-start md:flex-row-reverse md:gap-[50px] xl:justify-center xl:gap-[10vw]">
          <div class="error_media h-[96vw] md:h-[30vw] md:w-[40vw]">
            <LazyImageStrapi :image="errorPage?.media || {url: '/assets/img/500.jpg'}" fit borderRadius  class="h-full w-full" />
          </div>
          <div class="error_content flex flex-col gap-[30px] px-[20px] pt-[40px] md:flex-[1_0_0] md:self-stretch  md:gap-[20px] md:p-[0] xl:justify-center xl:gap-[40px]">
            <LazyTitleLine/>
            <LazyBodyText wrapper="h2" class="error_content__message" :html="titleFormatted('Oops!')" />
            <LazyBodyText wrapper="h2" class="error_content__message" :html="titleFormatted(props?.text404 || `${error.statusCode}`)" />
            <LazyBodyText wrapper="p" class="error_content__description lg:!text-[20px]" :html=" error.statusMessage || t('error.description.404')" v-if="error.statusCode >= 400 && error.statusCode <= 500" />
            <LazyBodyText wrapper="p" class="error_content__description lg:!text-[20px]" :html=" error.statusMessage || t('error.description.500')" v-else />
            <div class="error-page">
                <div v-if="error?.statusCode === 404">
                    <NuxtLink to="/" class="text-[--btn-link] underline-offset-2 underline decoration-1">Volver al inicio</NuxtLink>
                </div>
                <div v-else>
                    <h1>Error {{ error?.statusCode }}</h1>
                    <NuxtLink to="/"  class="text-[--btn-link] underline-offset-2 underline decoration-1">Volver al inicio</NuxtLink>
                </div>
            </div>
        </div>
        </div>
      </div>
      <Transition name="modal" :duration="{ enter: 800, leave: 1000 }">
        <LazyModal v-if="!!modal?.data && error.statusCode >= 400 && error.statusCode <= 500"
                   :data="modal.data" :type="modal.type"
                   :current="modal.current" :position="modal.position" />
      </Transition>
      <LazyFooter v-if="error.statusCode >= 400 && error.statusCode <= 500"/>
    </div>
  </template>
  
  <style lang="scss">
  body {
  &:has( > div > .error) {
      overflow-y: auto;
    }
  }
  </style>
  <style lang="scss" scoped>
  .page-palace-enter-active,
  .page-palace-leave-active {
    transition: opacity 0.5s ease;
  }
  .page-palace-enter-from,
  .page-palace-leave-to {
    opacity: 0;
  }
  .error {
    &_content {
      h2 {
        font-size: 24px;
        @media screen and (min-width: $lg) {
          font-size: 32px;
        }
        :deep() {
          strong {
            font-size: 30px;
            font-weight: 300;
            @media screen and (min-width: $md) {
              font-size: 32px;
            }
            @media screen and (min-width: $lg) {
              font-size: 45px;
            }
          }
        }
      }
    }
  }
  </style>
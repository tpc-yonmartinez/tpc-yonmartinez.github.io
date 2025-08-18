<script setup>
import { ref } from 'vue'
import { scalejs } from '@/composables/scale'

const { locale } = useI18n()
const animation = ref(null),
      nuxtApp = useNuxtApp()

const { animationinit, cleanup } = scalejs()

nuxtApp.hook('page:finish', () => {
  animation.value = setTimeout(() => {
    animationinit()
  }, 600)
})

const menu = ref({
  en: [
    { title: 'About Us', link: '/about', localizations: 'sobre-nosotros' },
    { title: 'Our Destinations', link: '/destination', localizations: 'destinos' },
    { title: 'Contact', link: '/contact', localizations: 'contacto' },
    { title: 'Legal', link: '/legal', localizations: 'legal' }
  ],
  es: [
    { title: 'Sobre Nosotros', link: '/sobre-nosotros', localizations: 'about' },
    { title: 'Destinos', link: '/destinos', localizations: 'destination' },
    { title: 'Contacto', link: '/contacto', localizations: 'contact' },
    { title: 'Legal', link: '/legal', localizations: 'legal' }
  ]
})

onUnmounted(() => {
  cleanup()
  clearTimeout(animation.value)
})
</script>

<template>
  <div class="relative">
    <NuxtRouteAnnouncer>
      <template #default="{ message }">
        <p>{{ message }} was loaded.</p>
      </template>
    </NuxtRouteAnnouncer>
    <nav-side phone="800-262-0000" :options="menu[locale]" />
    <NuxtPage />
    <Footer />
  </div>
</template>

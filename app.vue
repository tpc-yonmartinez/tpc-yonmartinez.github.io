<script setup>
import { scalejs } from '@/composables/scale'

const animation = ref(null),
      nuxtApp = useNuxtApp()

const { animationinit, cleanup } = scalejs()

nuxtApp.hook('page:finish', () => {
  animation.value = setTimeout(() => {
    animationinit()
  }, 600)
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
    <Header phone="800-262-0008" :options="[{ title: 'About Us', link: '/about' }, { title: 'Our Destinations', link: '/destination' }, { title: 'Contact', link: '/contact' }, { title: 'Legal', link: '/legal' }]" />
    <NuxtPage />
    <Footer />
  </div>
</template>

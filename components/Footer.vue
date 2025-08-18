<script setup lang="ts">
  const { locales, locale, defaultLocale }= useI18n()

  export interface FooterProps {
    options?: Array<{ title: string; link: string, localizations: string, target?: string | '_self' }>;
  }

  const props = withDefaults(defineProps<FooterProps>(), {
    options: () => [],
  });
  const route = useRoute()

  const data = {
    en: {
      address: "Cancun - Chetumal Km 340, Riviera Maya, 77500 Cancun, Q.R., Mexico",
      phone: "+52 (998) 193 02 85",
      copyright: "PR Global - All Rights Reserved."
    },
    es: {
      address: "Cancun - Chetumal Km 340, Riviera Maya, 77500 Cancun, Q.R., Mexico",
      phone: "+52 (998) 193 02 85",
      copyright: "PR Global - Todos los derechos reservados."
    }
  }

  const changeLocale = (lang) => {
    if (lang === locale.value) return

    let path = route.path.replace(/^\/(es|fr)/, '')

    if (path !== '/' && path.endsWith('/')) {
      path = path.replace(/\/$/, '')
    }

    const localizations = props.options.filter(m => m.link === path)[0]?.localizations || ''

    navigateTo(`${defaultLocale !== lang ? '/' + lang : ''}${localizations ? '/' + localizations : ''}`, { replace: true })
  }
</script>

<template>
  <footer class="bg-[--footer-bg] py-[50px] md:pt-[100px] md:pb-[40px]">
    <div class="flex justify-center items-center">
      <Icon variant="prglobal-col" class="h-[140px] w-[140px]" />
    </div>
    <div class="px-[20px] py-[50px] flex flex-col justify-center items-center gap-[20px] text-center md:px-[10vw] 2xl:px-[192px]">
      <div class="flex flex-row gap-[16px] items-center">
        <Icon variant="marker" class="h-[16px] w-[16px]" />
        <span class="note"> {{ data[locale].address }} </span>
      </div>
      <div class="flex flex-row gap-[16px] items-center">
        <Icon variant="phone" class="h-[16px] w-[16px]" />
        <span class="note"> {{ data[locale].phone }} </span>
      </div>
    </div>
    <div class="extra relative flex flex-col gap-[20px] px-[20px] md:px-[10vw] md:flex-row justify-center md:justify-between items-center md:pt-[40px] 2xl:px-[192px]">
      <span class="note"> {{ data[locale].copyright }} </span>
      <div class="flex">
        <ul class="flex flex-row gap-[30px]">
          <li v-for="lang in locales" :key="lang.code">
            <button @click="changeLocale(lang.code)" class="note">
              {{ lang.name }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
  .extra::before {
    @media screen and (min-width: $md) {
      content: "";
      background: $footer-border;
      height: 1px;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
    }
  }
</style>
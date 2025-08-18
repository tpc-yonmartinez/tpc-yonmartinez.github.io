<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  const route = useRoute()
  const router = useRouter()
  const localePath = useLocalePath()
  const { locales, locale, setLocale, defaultLocale }= useI18n()

  export interface HeaderProps {
    phone?: string;
    options?: Array<{ title: string; link: string, target?: string | '_self' }>;
  }

  const props = withDefaults(defineProps<HeaderProps>(), {
    phone: '',
    options: () => [],
  });

  const openNav = ref(false);

  const changeLocale = (lang) => {
    if (lang === locale.value) return

    const path = route.path.replace(/^\/(es|fr)/, '')
    const localizations = props.options.filter(m => m.link === path)[0]?.localizations || ''
    openNav.value = false
    console.log(`Localization for ${lang}: ${localizations}`)

    navigateTo(`${defaultLocale !== lang ? '/' + lang : ''}${localizations ? '/' + localizations : ''}`, { replace: true })
  }

  const HamburgerOpen = () => openNav.value = !openNav.value

  onMounted(() => {
    addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        openNav.value = false;
      }
    });
  });

  onUnmounted(() => {
    removeEventListener('resize', () => {
      if (window.innerWidth > 768) {
        openNav.value = false;
      }
    });
  });
</script>

<template>
  <header class="absolute top-0 left-0 right-0 z-[1] px-[20px] md:px-[10vw] 2xl:px-[192px] py-[20px] md:pb-0 max-h-[138px] flex flex-col md:gap-[20px] border-b-[#f7f6f14d] border-b-[1px] text-white" >
    <div class="cursor-pointer flex flex-row justify-between items-center [&_.icon-container_svg_path:is(.fill)]:fill-[--btn-text-dark] [&_.icon-container_svg_rect:is(.fill)]:fill-[--btn-text-dark]" >
      <NuxtLink :to="localePath('/')">
        <Icon variant="prglobal-large" class="h-[40px] w-[165px] md:h-[70px] md:w-[290px]" />
      </NuxtLink>
      <div class="flex flex-row gap-[20px] md:gap-[30px] items-center" >
        <div class="hidden md:flex body-small" >
          <ul class="flex flex-row gap-[10px]">
            <li v-for="lang in locales" :key="lang.code" class="relative [&:not(:last-child)]:after:content-[''] [&:not(:last-child)]:after:absolute [&:not(:last-child)]:after:-right-[5px] [&:not(:last-child)]:after:top-0 [&:not(:last-child)]:after:h-full [&:not(:last-child)]:after:w-[1px] [&:not(:last-child)]:after:bg-white">
              <button @click="changeLocale(lang.code)">
                {{ lang.code.toUpperCase() }}
              </button>
            </li>
          </ul>
        </div>
        <div class="flex flex-row gap-[10px] items-center cursor-pointer">
          <Icon variant="phone" class="h-[24px] w-[24px] md:h-[16px] md:w-[16px]" />
          <span class="hidden md:block body-small" > {{ phone }} </span>
        </div>
        <div class="block md:hidden cursor-pointer" >
          <Icon variant="nav-toggle" @click="HamburgerOpen" class="h-[24px] w-[24px]" />
        </div>
      </div>
    </div>
    <nav class="hidden md:flex flex-row gap-[40px] mb-[9px]">
      <NuxtLink v-for="(option, index) in options" :key="index" :to="localePath(option.link)" :target="option.target" class="body-small cursor-pointer" > {{ option.title }} </NuxtLink>
    </nav>
    <Transition name="menu-fade" mode="out-in">
      <div v-if="openNav" :class="['md:hidden', {'menu_open bg-[#1C1C1C] p-[40px] h-[100svh] w-[100svw] fixed top-0 left-0': openNav}]" >
        <div class="flex items-center justify-end mb-[20px]" >
          <Icon variant="close" @click="openNav = !openNav" class="h-[24px] w-[24px] [&_svg_path]:!fill-[--btn-text-dark] cursor-pointer" />
        </div>
        <div class="flex flex-col gap-[40px] overflow-y-auto" >
          <div class="flex flex-col gap-[24px]" >
            <NuxtLink v-for="(option, index) in options" :key="index" :to="localePath(option.link)" :target="option.target" class="body-medium cursor-pointer" > {{ option.title }} </NuxtLink>
          </div>
          <Button variant="primary-ghost" icon="phone"> {{ phone }} </Button>
          <div class="flex body-small cursor-pointer" >
            <ul class="flex flex-row gap-[10px]">
              <li v-for="lang in locales" :key="lang.code" class="relative [&:not(:last-child)]:after:content-[''] [&:not(:last-child)]:after:absolute [&:not(:last-child)]:after:-right-[5px] [&:not(:last-child)]:after:top-0 [&:not(:last-child)]:after:h-full [&:not(:last-child)]:after:w-[1px] [&:not(:last-child)]:after:bg-white">
                <button @click="changeLocale(lang.code)">
                  {{ lang.code.toUpperCase() }}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style lang="scss" scoped>
.menu-fade-enter-active{
  transition: all 500ms ease-out;
}
.menu-fade-leave-active {
  transition: all 300ms cubic-bezier(1, 0.5, 0.8, 1);
}
.menu-fade-enter-from,
.menu-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
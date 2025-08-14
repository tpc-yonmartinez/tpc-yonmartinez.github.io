<script setup lang="ts">
export interface HeaderProps {
  phone?: string;
  options?: Array<{ title: string; link: string, target?: string | '_self' }>;
}

withDefaults(defineProps<HeaderProps>(), {
  phone: '',
  options: () => [],
});
</script>

<template>
  <header class="absolute top-0 left-0 right-0 z-[1] px-[20px] md:px-[10vw] 2xl:px-[192px] py-[20px] md:pb-0 max-h-[138px] flex flex-col md:gap-[20px] border-b-[#f7f6f14d] border-b-[1px] text-white">
    <div class="flex flex-row justify-between items-center">
      <a href="/">
        <Icon variant="prglobal-large" class="h-[40px] w-[165px] md:h-[70px] md:w-[290px]" />
      </a>
      <div class="flex flex-row gap-[20px] md:gap-[30px] items-center">
        <div class="hidden md:flex">
          EN | ES
        </div>
        <div class="flex flex-row gap-[10px] items-center">
          <Icon variant="phone" class="h-[24px] w-[24px] md:h-[16px] md:w-[16px]" />
          <span class="hidden md:block body-small"> {{ phone }} </span>
        </div>
        <div class="block md:hidden">
          <Icon variant="nav-toggle" class="h-[24px] w-[24px]" />
        </div>
      </div>
    </div>
    <nav class="hidden md:flex flex-row gap-[40px]">
      <NuxtLink v-for="(option, index) in options" :key="index" :to="option.link" :target="option.target" class="body-small">{{ option.title }}</NuxtLink>
    </nav>
  </header>
</template>
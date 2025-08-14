<template>
  <footer class="bg-[--footer-bg] py-[50px] md:pt-[100px] md:pb-[40px] px-[20px] md:px-[10vw] 2xl:px-[192px]">
    <div class="flex justify-center items-center">
      <Icon variant="prglobal-col" class="h-[140px] w-[140px]" />
    </div>
    <div class="py-[50px] flex flex-col justify-center items-center gap-[20px] text-center">
      <div class="flex flex-row gap-[16px] items-center">
        <Icon variant="marker" class="h-[16px] w-[16px]" />
        <span class="note"> Cancun - Chetumal Km 340, Riviera Maya, 77500 Cancun, Q.R., Mexico </span>
      </div>
      <div class="flex flex-row gap-[16px] items-center">
        <Icon variant="phone" class="h-[16px] w-[16px]" />
        <span class="note"> +52 (998) 193 02 85 </span>
      </div>
    </div>
    <div class="extra relative flex flex-col md:flex-row justify-center md:justify-between items-center md:pt-[40px]">
      <span class="note"> PR Global - All Rights Reserved. </span>
      <div class="flex gap-[30px]">
        <span class="note"> English </span>
        <span class="note"> Español </span>
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
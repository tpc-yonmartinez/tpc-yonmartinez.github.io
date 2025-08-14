<script setup>
import { defineAsyncComponent } from 'vue'

// const Fade = defineAsyncComponent(() => import('./animations/Fade.client.vue'))
const CardContentInfo = defineAsyncComponent(() => import('./CardContentInfo.vue'))

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  infoText: {
    type: Array,
    default: null
  },
  decorativeLine: {
    type: Boolean,
    default: true
  },
  bgColor: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div :class="['content-info flex flex-col items-start gap-[40px] lg:gap-[60px] py-[50px] md:py-[60px] xl:py-[5vw] 2xl:py-[100px]',
               {'bg-[--component-bg-alt] -mx-[20px] px-[20px] md:-mx-[10vw] md:px-[10vw]': bgColor}]">
    <div v-if="title" class="content-info__content flex flex-col gap-[30px] md:w-full md:gap-[40px] xl:w-[50vw] xl:m-auto">
      <div>
        <h2 class="text-center"> {{ title }} </h2>
      </div>
    </div>
    <div :class="['content-info__items w-full grid gap-[40px] md:gap-y-[60px] md:grid-cols-2 xl:grid-cols-3', { '2xl:grid-cols-4': infoText?.length >= 4 }]">
      <CardContentInfo v-for="card in infoText"
                       :key="card.id"
                       :title="card.title"
                       :description="card.description"
                       :btntext="card.btntext"
                       :btnexternal="card.btnexternal"
                       :btninternal="card.btninternal"
                       :btnmodal="card.btnmodal" />
    </div>
  </div>
</template>
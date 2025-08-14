<script setup>
import { defineAsyncComponent, ref } from 'vue'
import useParseText from '../composables/useParseText'

// const Fade = defineAsyncComponent(() => import('./animations/Fade.client.vue'))
const Button = defineAsyncComponent(() => import('./Button.vue'))
const Timer = defineAsyncComponent(() => import('./Timer.vue'))

const visibleTimer = ref(true)

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  btnltext: {
    type: String,
    default: ''
  },
  btnlinternal: {
    type: Object,
    default: null
  },
  btnlexternal: {
    type: String,
    default: ''
  },
  btnlmodal: {
    type: Object,
    default: null
  },
  btnrtext: {
    type: String,
    default: ''
  },
  btnrinternal: {
    type: Object,
    default: null
  },
  btnrexternal: {
    type: String,
    default: ''
  },
  btnrmodal: {
    type: Object,
    default: null
  },
  decorativeLine: {
    type: Boolean,
    default: true
  },
  tagH: {
    type: String,
    default: 'h2'
  },
  removepaddingbottom: {
    type: Boolean,
    default: false
  },
  timerdatetime: {
    type: String,
    default: ''
  },
  timertext: {
    type: String,
    default: ''
  },
  themetimer: {
    type: String,
    default: ''
  },
  sizetimer: {
    type: String,
    default: ''
  },
  bgcolor: {
    type: Boolean,
    default: true
  },
  uppercase: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
<div :class="['content-intro py-[50px] md:py-[60px] xl:py-[5vw] 2xl:py-[100px] overflow-hidden h-auto flex flex-col items-center gap-[30px] md:gap-[40px]',
             removepaddingbottom ? '!pb-0' : '',
             {'bg-[--color-base-alt] px-[20px] md:px-[10vw]': bgcolor}]">
  <div v-if="timerdatetime">
    <Timer :date="timerdatetime" :text="timertext" @visibility="visibleTimer" :theme="themetimer" :size="sizetimer"/>
  </div>
  <div v-if="title || description" class="xl:w-[50vw] xl:m-auto flex flex-col items-center gap-[30px] md:gap-[40px] text-center">
    <div v-if="title">
      <component :is="tagH" :class="['overflow-hidden', {'uppercase': uppercase}]"> {{ title }} </component>
    </div>
    <div v-if="description">
      <p class="description-capital" v-html="useParseText(description)" />
    </div>
  </div>
  <div v-if="btnltext || btnrtext" class="w-full md:!w-auto">
    <div class="content-intro__buttons flex flex-col w-full gap-[30px] md:gap-[20px] md:flex-row md:justify-center">
      <Button v-if="btnltext"
              variant="secondary"
              :buttonInternalLink="btnlinternal"
              :buttonExternalLink="btnlexternal"
              class="w-full md:w-auto"
              :buttonModal="btnlmodal">{{ btnltext }}</Button>
      <Button v-if="btnrtext"
              variant="primary"
              :buttonInternalLink="btnrinternal"
              :buttonExternalLink="btnrexternal"
              :buttonModal="btnrmodal"
              class="w-full md:w-auto">{{ btnrtext }}</Button>
    </div>
  </div>
</div>
</template>
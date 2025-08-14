<script setup>
import { defineAsyncComponent } from 'vue'
import useParseText from '../composables/useParseText'

const Button = defineAsyncComponent(() => import('./Button.vue'))

const props= defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  btntext: {
    type: String,
    default: ''
  },
  btnexternal: {
    type: String,
    default: ''
  },
  btninternal: {
    type: Object,
    default: null
  },
  btnmodal: {
    type: Object,
    default: null
  }
})
</script>

<template>
  <div v-if="title || description" class="card-content-info flex flex-col gap-[24px] md:gap-[20px] lg:gap-[24px] lg:pl-[64px]">
    <div class="card-content-info__line h-[1px] block w-[65px] bg-[--color-base]"></div>
    <div class="card-content-info__title flex flex-col items-start gap-[8px]">
      <label v-if="title" class="strong-capital"> {{ title }} </label>
      <p v-if="description" v-html="useParseText(description)" />
      <Button v-if="btntext"
              class="!justify-start"
              variant="text"
              :buttonInternalLink="btninternal"
              :buttonExternalLink="btnexternal"
              :buttonModal="btnmodal">{{ btntext }}</Button>
    </div>
  </div>
</template>
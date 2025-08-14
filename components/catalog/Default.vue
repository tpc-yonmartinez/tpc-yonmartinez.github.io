<script setup>
import { defineAsyncComponent } from 'vue'
import useParseText from '../../composables/useParseText'
 
const BodyText = defineAsyncComponent(() => import("../BodyText.vue")) 
const ImageStrapi = defineAsyncComponent(() => import('../ImageStrapi.vue'))
 
const props = defineProps({
  media: {
    type: Array,
    default: null
  },
  tag: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
})
</script>
 
<template>
  <div class="catalog_content__card relative flex flex-col h-full cursor-pointer">
    <div class="catalog_content__card_media relative rounded-[10px_10px_0_0] overflow-hidden w-full h-auto aspect-[5/3]">
      <ImageStrapi :image="media?.[0]" class="catalog_content__card_media_img h-full w-full" />
    </div>
    <div class="catalog_content__card__info flex flex-col gap-[10px] flex-1 bg-[--bg-box] rounded-[0_0_10px_10px] px-[20px] pt-[20px] pb-[40px] border-[1px] border-solid border-[--border-color] border-t-0">
      <div class="flex flex-col gap-[10px]" v-if="tag || title">
        <label v-if="tag" class="capital text-[--decorative-color]"> {{ tag }} </label>
        <h3 v-if="title" class="text-[--title-alt]"> {{ title }} </h3>
      </div>
      <BodyText v-if="description" wrapper="p" :html="useParseText(description)"></BodyText>
    </div>
  </div>
</template>
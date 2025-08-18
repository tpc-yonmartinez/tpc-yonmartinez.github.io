<script setup>
import { defineAsyncComponent } from 'vue'
import useParseText from '../../composables/useParseText'

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
  },
  btntext: {
    type: String,
    default: ''
  },
  internal: {
    type: Object,
    default: null
  },
  external: {
    type: String,
    default: ''
  },
  modal: {
    type: Object,
    default: null
  }
})
</script>
 
<template>
  <div :class="['catalog_content__card relative flex flex-col h-full',{'cursor-pointer' : modal || external || internal }]">
    <NuxtLink class="absolute h-full w-full z-[1]"
              v-if="!modal && (external || internal)"
              :to="external"
              target="_blank"
              :aria-label="title" />
    <div class="catalog_content__card_media relative rounded-t-[--border-m] overflow-hidden w-full h-auto aspect-[5/6]">
      <ImageStrapi :image="media?.[0]" class="catalog_content__card_media_img h-full w-full" />
      <div v-if="btntext" class="catalog_content__card_media_button">
        <Button variant="text"> {{ btntext }} </Button>
      </div>
    </div>
    <div class="catalog_content__card__info flex flex-col gap-[10px] flex-1 bg-transparent rounded-b-[--border-m] px-0 py-[20px] border-0">
      <div class="flex flex-col gap-[10px]" v-if="tag || title">
        <label v-if="tag" class="capital text-[--color-base]"> {{ tag }} </label>
        <h3 v-if="title" class="!text-[--color-base]"> {{ title }} </h3>
      </div>
      <p v-if="description" v-html="useParseText(description)"></p>
    </div>
  </div>
</template>
 
<style lang="scss" scoped>
.catalog_content__card {
  &_media {
    &_button {
      position: absolute;
      height: 100%;
      width: 100%;
      bottom: 0;
      left: 0;
      .button {
        transition: all 400ms ease-in-out;
        align-items: flex-end;
        color: $white;
        height: 100%;
        width: 100%;
        opacity: 1;
        padding-bottom: 40px;
        @media screen and (min-width: $lg) {
          padding-bottom: 0;
          opacity: 0;
        }
      }
    }
  }
  @media screen and (min-width: $lg) {
    &:hover {
      .button {
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 50%, rgba(0, 0, 0, 0.80) 100%);
        opacity: 1;
        padding-bottom: 40px;
      }
    }
  }
}
</style>
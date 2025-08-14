<script setup>
import { defineAsyncComponent } from 'vue'

const Button = defineAsyncComponent(() => import('./Button.vue'))
const ImageStrapi = defineAsyncComponent(() => import('./ImageStrapi.vue'))
const VideoStrapi = defineAsyncComponent(() => import('./VideoStrapi.vue'))

const props = defineProps({
  media: {
    type: Object,
    default: null
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  btnText: {
    type: String,
    default: ''
  },
  btninternal: {
    type: Object,
    default: null
  },
  btnExternal: {
    type: String,
    default: ''
  },
  btnmodal: {
    type: Object,
    default: null
  },
  investcontent: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
<div class="content-center h-auto py-[50px] md:py-[60px] xl:py-[5vw] 2xl:py-[100px] flex flex-col gap-[40px] lg:gap-[60px]">
  <div :class="[{'order-2': investcontent}, 'scrollme']">
    <div :class="['md:max-w-[80vw]', {'animateme': !investcontent}]" data-when="enter" data-from="0.9" data-to="0" data-scalex="1.3" data-scaley="1.2">
      <ImageStrapi v-if="media?.mime?.includes('image')" :image="media" fit :class="['content-center__image', {'scale_init': !investcontent}]" />
      <div v-else class="content-center__image video scale_init">
        <VideoStrapi :video="media" />
      </div>
    </div>
  </div>
  <div v-if="title || description || btnText" class="content-center__text flex flex-col items-center gap-[30px] md:gap-[40px] text-center xl:w-[50vw] xl:m-auto">
    <h2 v-if="title" class="content-center__text__title"> {{ title }} </h2>
    <p v-if="description" class="content-center__text__description description-capital"> {{ description }} </p>
    <div v-if="btnText" class="content-center__text__buttons">
      <Button variant="secondary"
              :buttonInternalLink="btninternal"
              :buttonExternalLink="btnExternal"
              :buttonModal="btnmodal">{{ btnText }}</Button>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.content-center {
  &__image {
    transform-origin: center;
    will-change: transform;
    height: 320px;
    max-width: 100vw;
    margin: 0 calc($padding-container-s * -1);
    @media screen and (min-width: $md) {
      max-width: 80vw;
      margin: 0 auto;
      height: 34.28vw;
      :deep() {
        img {
          border-radius: $border-radius-m;
          @media screen and (min-width: $md) {
            height: 34.28vw;
            width: 80vw;
            margin: auto;
          }
          @media screen and (min-width: $lg) {
            height: 30vw;
            width: 70vw;
          }
        }
      }
    }
    @media screen and (min-width: $lg){
      height: 30vw;
    }
  }
  .video {
    :deep() {
      video {
        object-fit: cover;
        height: 320px;
        max-width: 100vw;
        width: 100%;
        @media screen and (min-width: $md) {
          border-radius: $border-radius-m;
          height: 34.28vw;
          width: 80vw;
          margin: auto;
        }
        @media screen and (min-width: $lg) {
          height: 30vw;
          width: 70vw;
        }
      }
    }
  }
  &__text {
    &__buttons {
      :deep(.button) {
        width: 100%;
        @media screen and (min-width: $md) {
          width: auto;
        }
      }
    }
  }
}
.scale_init {
  @media screen and (min-width: $md){
    transform: scale(1.3, 1.2);
  }
}
</style>
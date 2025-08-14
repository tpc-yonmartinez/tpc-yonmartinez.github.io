<script setup>
import { defineAsyncComponent, computed } from 'vue'
import { useI18n } from '#imports'
// import { useNuxtApp } from '#app'
import moment from 'moment'
import 'moment/dist/locale/es'
// import { openModalButton } from '../composables/utils.js'
import useParseText from '../composables/useParseText'

const ImageStrapi = defineAsyncComponent(() => import('./ImageStrapi.vue'))
const Button = defineAsyncComponent(() => import('./Button.vue'))
const VideoStrapi = defineAsyncComponent(() => import('./VideoStrapi.vue'))

// const { $goTo: goTo } = useNuxtApp(),
const { locale } = useI18n()

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  disclaimer: {
    type: String,
    default: ''
  },
  tag: {
    type: String,
    default: ''
  },
  date: {
    type: String,
    default: ''
  },
  media: {
    type: Object,
    default: null
  },
  btnText: {
    type: String,
    default: ''
  },
  btnInternal: {
    type: Object,
    default: null
  },
  btnExternal: {
    type: String,
    default: ''
  },
  btnModal: {
    type: Object,
    default: null
  },
  cols: {
    type: Number,
    default: 2
  }
})

const onClick = () => alert('Click Modal')

const formatDate = computed(() => {
  moment.locale(locale.value)
  const dateValue = moment(props.date).format('MMMM DD, YYYY')
  return dateValue
})

const CardContentColumCSS = computed( () => {
  const css = {
    'card-content-col w-full flex flex-col gap-[30px] md:gap-[20px] lg:gap-[40px] items-center': true,
    'text-center': props.cols === 2,
    'card-content-col--3': props.cols > 2
  }
  return css
})
const linkCSS = computed(() => {
  const css = {
    'w-full': true,
    'pointer-events-none': props.btnText
  }
  return css
})
const mediaContainerCSS = computed(() => {
  const css = {
    'card-content-col__images relative overflow-hidden w-full': true,
    'h-[66vw] md:h-[25vw]': props.cols === 2,
    'h-[59vw] md:h-[15vw]': props.cols > 2,
    'cursor-pointer': !props.btnText && (props.btnModal || props.btnInternal || props.btnExternal),
    'pointer-events-none': props.btnText
  }
  return css
})
const mediaCSS = computed(() => {
  const css  = {
    'card-content-col__images-img relative h-full w-full': true,
  }
  return css
})
const contentCSS = computed(() => {
  const css = {
    'card-content-col__content w-full flex flex-col gap-[30px] md:gap-[20px]': true,
    'w-[80%]': props.cols === 2,
    'justify-start': props.cols > 2
  }
  return css
})
const buttonContainerCSS = computed(() => {
  const css = {
    'card-content-col__button flex flex-col gap-[20px]': true,
    'items-center': props.cols === 2
  }
  return css
})
</script>

<template>
  <div :class="CardContentColumCSS">
    <NuxtLink v-if="(btnInternal || btnExternal) && !btnText"
              :to="btnInternal"
              :target="btnInternal ? '_self' : '_blank'"
              :class="linkCSS">
      <div :class="mediaContainerCSS">
        <ImageStrapi v-if="media?.mime?.includes('image')"
                     :fit="true"
                     :image="media"
                     borderRadius
                     :class="mediaCSS"></ImageStrapi>
        <VideoStrapi v-else
                     :video="media"
                     :class="mediaCSS"></VideoStrapi>
      </div>
    </NuxtLink>
    <div v-else @click="onClick" :class="mediaContainerCSS">
      <ImageStrapi v-if="media?.mime?.includes('image')"
                   :fit="true"
                   :image="media"
                   borderRadius
                   :class="mediaCSS"></ImageStrapi>
      <VideoStrapi v-else
                   :video="media"
                   :class="mediaCSS"></VideoStrapi>
    </div>
    <div :class="contentCSS">
      <div class="flex flex-col item-center gap-[16px]">
        <div v-if="date || tag && cols < 3" class="flex gap-2.5 justify-center text-center">
          <label v-if="tag && cols < 3" class="card-content-col__tag text-center"> {{ tag }} </label>
          <p v-if="date" class="note card-content-col__date capitalize"> {{ formatDate }} </p>
        </div>
        <h3 v-if="title" class="card-content-col__title !text-[--title-principal]"> {{ title }} </h3>
        <p v-if="description"
                  class="card-content-col__description"
                  v-html="useParseText(description)" />
      </div>
      <div v-if="btnText" :class="buttonContainerCSS">
        <Button :variant="cols > 2 ? 'text' : 'secondary'"
                :buttonInternalLink="btnInternal"
                :buttonExternalLink="btnExternal"
                :buttonModal="btnModal"
                class="w-fit">{{ btnText }}</Button>
        <p v-if="disclaimer && cols === 2"
                  class="card-content-col__disclaimer"
                  v-html="useParseText(disclaimer)" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-content-col__images-img {
  height: 100%;
  position: relative;
  object-fit: cover;
  border-radius: $border-radius-m;
  :deep() {
    video {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
    }
    img {
      border-radius: $border-radius-m;
    }
  }
}
</style>
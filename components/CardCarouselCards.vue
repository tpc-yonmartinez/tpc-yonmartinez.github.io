<script setup>
import { defineAsyncComponent, computed, ref } from 'vue'
// import { useNuxtApp } from '#app'
import { useI18n } from '#imports'
// import { openModalButton } from '../composables/utils.js'
import moment from 'moment'
import 'moment/dist/locale/es'
import useParseText from '../composables/useParseText'

const Button = defineAsyncComponent(() => import('./Button.vue'))
const ImageStrapi = defineAsyncComponent(() => import('./ImageStrapi.vue'))
const VideoStrapi = defineAsyncComponent(() => import('./VideoStrapi.vue'))

// const { $goTo: goTo } = useNuxtApp(),
const { locale } = useI18n(),
      hover = ref(false)

const props = defineProps({
  playvideo: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  tag: {
    trype: String,
    default: ''
  },
  media: {
    type: Object,
    default: null
  },
  urlExternal: {
    type: String,
    default: ''
  },
  urlinternal: {
    type: Object,
    default: null
  },
  modal: {
    type: Object,
    default: null
  },
  date: {
    type: String,
    default: ''
  },
  imageaspec: {
    type: String,
    default: ''
  },
  roundstyle: {
    type: Boolean,
    default: false
  },
  disclaimer: {
    type: String,
    default: ''
  },
  btnltext: {
    type: String,
    default: ''
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
  }
})

const onClick = () => alert('Click Modal')

const format_date = computed(() => {
  moment.locale(locale.value)
  return moment(props.date).format('MMMM DD, YYYY')
})

const mouseHover = () => {
  if(!props.playvideo) hover.value = true
}

const mouseRemoveHover = () => {
  if(!props.playvideo) hover.value = false
}
const videoCSS = computed(() => {
  const css = {
    'w-[80vw] md:w-[40vw] xl:w-[25vw] h-[80vw] md:h-[40vw] xl:h-[25vw] rounded-[10px] object-cover': true,
    'h-[100vw] md:h-[50vw] xl:!h-[31.25vw]': props.imageaspec === 'aspec4-5',
    'xl:!h-[20vw]': props.imageaspec === 'ourteam',
    'rounded-full': props.roundstyle
  }
  return css
})
const imageCSS = computed(() => {
  const css = {
    'card-carousel-card__image': true,
    'aspec-team': props.imageaspec === 'ourteam',
    'aspec-ratio-4-5': props.imageaspec === 'aspec4-5',
    'round-full': props.roundstyle
  }
  return css
})
</script>

<template>
  <div @mouseover="mouseHover" @mouseleave="mouseRemoveHover" :class="{'card-carousel-card md:w-full': true, 'cursor-pointer': !btnltext && !btnrtext && (urlExternal || urlinternal || modal)}">
    <div v-if="btnltext || btnrtext" class="card-carousel-card-inner">
      <VideoStrapi v-if="media?.mime?.includes('video')"
                   :video="media"
                   :autoplay="playvideo"
                   :initplay="hover"
                   :class="videoCSS" />
      <ImageStrapi v-else :class="imageCSS" :image="media" :fit="true" />
      <div class="flex flex-col gap-[20px] text-block py-[20px] md:py-[30px]">
        <div v-if="date || tag" class="card-carousel-card-date flex flex-col gap-[10px]">
          <p v-if="date" class="note capital capitalize"> {{ format_date }} </p>
          <label v-if="tag"> {{ tag }} </label>
        </div>
        <h3> {{ title }} </h3>
        <p v-html="useParseText(description)"></p>
        <div :class="{'card-carousel-card-button flex flex-row gap-[20px]': true, 'half-size': btnltext && btnrtext}">
          <Button v-if="btnltext"
                  variant="secondary"
                  :buttonExternalLink="urlExternal"
                  :buttonInternalLink="urlinternal"
                  :buttonModal="modal" class="button-primary">{{ btnltext }}</Button>
          <Button v-if="btnrtext"
                  variant="primary"
                  :buttonExternalLink="btnrexternal"
                  :buttonInternalLink="btnrinternal"
                  :buttonModal="btnrmodal">{{ btnrtext }}</Button>
        </div>
        <p v-if="disclaimer">{{ disclaimer }}</p>
      </div>
    </div>
    <NuxtLink v-else
              :to="urlinternal"
              :target="urlinternal ? '_self' : '_blank'"
              @click="(!urlExternal && !urlinternal) ? onClick() : null">
      <VideoStrapi v-if="media?.mime?.includes('video')"
                   :video="media"
                   :autoplay="playvideo"
                   :initplay="hover"
                   :class="videoCSS" />
      <ImageStrapi v-else :class="imageCSS" :image="media" :fit="true" />
      <div class="flex flex-col gap-[20px] text-block py-[20px] md:py-[30px]">
        <div v-if="date || tag" class="card-carousel-card-date flex flex-col gap-[10px]">
          <label v-if="date" class="note capital capitalize"> {{ format_date }} </label>
          <label v-if="tag"> {{ tag }} </label>
        </div>
        <h3> {{ title }} </h3>
        <p v-html="useParseText(description)"></p>
        <p v-if="disclaimer"> {{ disclaimer }} </p>
      </div>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.card-carousel-card {
  &__image {
    :deep(img) {
      border-radius: $border-radius-m;
      height: 80vw;
      width: 80vw;
      @media screen and (min-width: $md) {
        height: 40vw;
        width: 40vw;
      }
      @media screen and (min-width: $xl) {
        height: 25vw;
        width: 25vw;
      }
    }
    &.round-full {
      :deep(img) {
        border-radius: 50%;
      }
    }
    &.aspec-team {
      :deep(img) {
        @media screen and (min-width: $xl) {
          height: 20vw;
          width: 20vw;
        }
      }
    }
    &.aspec-ratio-4-5 {
      :deep(img) {
        height: 100vw;
        @media screen and (min-width: $md) {
          height: 50vw;
        }
        @media screen and (min-width: $xl) {
          height: 31.25vw;
        }
      }
    }
  }
  &-#{button} {
    &.half-size {
      .button {
        flex-basis: 50%;
      }
    }
    :deep(.button) {
      padding-left: 16px;
      padding-right: 16px;
    }
  }
}
</style>
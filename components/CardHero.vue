<script setup>
import { computed, defineAsyncComponent, ref, defineExpose } from 'vue'
// import { openModalButton } from '../composables/utils.js'
// import { useMediaQuery } from '@vueuse/core'
// import { useNuxtApp } from '#app'

const ImageStrapi = defineAsyncComponent(() => import('./ImageStrapi.vue'))
const VideoStrapi = defineAsyncComponent(() => import('./VideoStrapi.vue'))
const Timer = defineAsyncComponent(() => import('./Timer.vue'))
const Icon = defineAsyncComponent(() => import('./Icon.vue'))

// const { $goTo: goTo } = useNuxtApp(),
const visibleTimer = ref(true),
      isDesktop = true,
      hasAudio = ref(false),
      muted = ref(true)
// isDesktop = useMediaQuery('(min-width: 768px)'),

const props = defineProps({
  media: {
    type: Object,
    default: null
  },
  mediaMobile: {
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
  timerText: {
    type: String,
    default: ''
  },
  timerDatetime: {
    type: String,
    default: ''
  },
  btnExternal: {
    type: String,
    default: ''
  },
  btnInternal: {
    type: Object,
    default: null
  },
  btnModal: {
    type: Object,
    default: null
  },
  btnText: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'max'
  },
  iframe: {
    type: String,
    default: ''
  },
  titleUpper: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    default: ''
  }
})

defineExpose({
  muted
})

const onClick = () => alert('Click Modal')

const mutedVideo = () => muted.value = !muted.value

const titleFormatted = computed(() => props.title?.replace(/\*{1,2}(.*?)\*{1,2}/g, '<strong>$1</strong>'))

const heroSlideCSS = computed(() => ({
  'hero-slide relative justify-center h-[100%] w-full px-[20px] md:py-[12%] md:px-[15%] xl:px-[25%] xl:py-[5%] block flex flex-col gap-[60px] md:gap-[40px] xl:gap-[45px] xl:h-[45vw] ': true,
  'active-min' : props.size == 'min',
  'cursor-pointer' : props.btnExternal || props.btnInternal || props.btnModal,
  '!cursor-default' : props.btnText
}))
const heroSlideTextCSS = computed(() => ({
  'hero-slide__text relative flex flex-col gap-[40px] md:gap-[20px] xl:gap-[40px] z-[1]': true,
  'text-center': props.size !== 'min',
  'hidden' : props.size == 'min'
}))
const heroSlideMediaCSS = computed(() => ({
  'hero-slide__media absolute top-0 left-0 w-full z-[-1] h-[100%]': true
}))
const timerContainerCSS = computed(() => ({
  'hero-slide__timer absolute left-[50%] translate-x-[-50%] bottom-[10%] lg:bottom-[15%]': true
}))
</script>

<template>
  <div class="relative w-full h-full">
    <div v-if="hasAudio" @click="mutedVideo" class="hero__video-audio cursor-pointer h-[32px] w-[32px] rounded-[10px] bg-[rgba(0,0,0,0.4)] md:h-[36px] md:w-[36px] xl:h-[52px] xl:w-[52px] flex justify-center items-center absolute bottom-[16px] right-[20px] z-[5] md:bottom-[138px] xl:bottom-[40px]">
      <Icon :variant="muted ? 'sound_off' : 'sound_on'" class="[&_svg_path]:!fill-[--white] w-[16px] h-[12px] md:h-[16px] md:w-[16px] xl:h-[32px] xl:w-[32px]" />
    </div>
    <div v-if="btnText" :class="heroSlideCSS">
      <div v-if="title || description" :class="heroSlideTextCSS">
        <p v-if="title && size !== 'min'" v-html="titleFormatted" :class="['hero-title', {'uppercase': titleUpper}]"></p>
        <p v-if="description && !btnText" class="description-capital"> {{ description }} </p>
        <div v-if="btnText" class="hero-slide__button flex items-center justify-center">
          <Button :buttonInternalLink="btnInternal" :buttonExternalLink="btnExternal" :buttonModal="btnModal" >{{ btnText }}</Button>
        </div>
      </div>
      <div class="hidden md:block"></div>
      <div v-if="timerDatetime && size !== 'min'" :class="timerContainerCSS">
        <Timer :date="timerDatetime" :text="timerText" @visibility="visibleTimer" />
      </div>
      <div  v-if="media && isDesktop" :class="heroSlideMediaCSS">
        <VideoStrapi v-if="media && media.mime.includes('video')" :video="media" class="hero-slide__video" :muted="muted" check-audio @hasaudio="hasAudio = $event" />
        <ImageStrapi v-else :omitformat="true" :image="media" fit class="hero-slide__image" />
      </div>
      <div v-else-if="mediaMobile && !isDesktop" :class="heroSlideMediaCSS">
        <VideoStrapi v-if="mediaMobile && mediaMobile.mime.includes('video')" :video="mediaMobile" class="hero-slide__video" :muted="muted" check-audio @hasaudio="hasAudio = $event" />
        <ImageStrapi v-else :omitformat="true" :image="mediaMobile" fit class="hero-slide__image" />
      </div>
      <div v-else :class="heroSlideMediaCSS">
        <VideoStrapi v-if="media && media.mime.includes('video') || mediaMobile && mediaMobile.mime.includes('video')" :video="media || mediaMobile" class="hero-slide__video" :muted="muted" check-audio @hasaudio="hasAudio = $event" />
        <ImageStrapi v-else :omitformat="true" :image="media || mediaMobile" fit class="hero-slide__image" />
      </div>
    </div>
    <NuxtLink v-else-if="btnInternal || btnExternal"
              :to="btnInternal"
              :target="btnInternal ? '_self' : '_blank'"
              :class="heroSlideCSS"
              :id="id">
      <div v-if="title || description" :class="heroSlideTextCSS">
        <p v-if="title && size !== 'min'" v-html="titleFormatted" :class="['h2', {'uppercase': titleUpper}]"></p>
        <p v-if="description" class="description-capital"> {{ description }} </p>
      </div>
      <div v-if="timerDatetime && size !== 'min'" :class="timerContainerCSS">
        <Timer :date="timerDatetime" :text="timerText" @visibility="visibleTimer" />
      </div>
      <div v-if="media && isDesktop" :class="heroSlideMediaCSS">
        <VideoStrapi v-if="media && media.mime.includes('video')" :video="media" class="hero-slide__video" :muted="muted" check-audio @hasaudio="hasAudio = $event" />
        <ImageStrapi v-else :omitformat="true" :image="media" fit class="hero-slide__image" />
      </div>
      <div v-else-if="iframe && isDesktop" :class="heroSlideMediaCSS">
        <div v-html="iframe" ref="vmIframe" class="hero-slide__iframe"></div>
      </div>
      <div v-else-if="mediaMobile && !isDesktop" :class="heroSlideMediaCSS">
        <VideoStrapi v-if="mediaMobile && mediaMobile.mime.includes('video')" :video="mediaMobile" class="hero-slide__video" :muted="muted" check-audio @hasaudio="hasAudio = $event" />
        <ImageStrapi v-else :omitformat="true" :image="mediaMobile" fit class="hero-slide__image" />
      </div>
      <div v-else :class="heroSlideMediaCSS">
        <VideoStrapi v-if="media && media.mime.includes('video') || mediaMobile && mediaMobile.mime.includes('video')" :video="media || mediaMobile" class="hero-slide__video" :muted="muted" check-audio @hasaudio="hasAudio = $event" />
        <ImageStrapi v-else :omitformat="true" :image="media || mediaMobile" fit class="hero-slide__image" />
      </div>
    </NuxtLink>
    <div v-else @click="onClick" :class="heroSlideCSS" :id="id">
      <div v-if="title || description" :class="heroSlideTextCSS">
        <p v-if="title && size !== 'min'" v-html="titleFormatted" :class="['h2', {'uppercase': titleUpper}]"></p>
        <p v-if="description" class="description-capital"> {{ description }} </p>
      </div>
      <div v-if="timerDatetime && size !== 'min'" :class="timerContainerCSS">
        <Timer :date="timerDatetime" :text="timerText" @visibility="visibleTimer" />
      </div>
      <div v-if="media && isDesktop" :class="heroSlideMediaCSS">
        <VideoStrapi v-if="media && media.mime.includes('video')" :video="media" class="hero-slide__video" :muted="muted" check-audio @hasaudio="hasAudio = $event" />
        <ImageStrapi v-else :omitformat="true" :image="media" fit class="hero-slide__image" />
      </div>
      <div v-else-if="iframe && isDesktop" :class="heroSlideMediaCSS">
        <div v-html="iframe" ref="vmIframe" class="hero-slide__iframe"></div>
      </div>
      <div v-else-if="mediaMobile && !isDesktop" :class="heroSlideMediaCSS">
        <VideoStrapi v-if="mediaMobile && mediaMobile.mime.includes('video')" :video="mediaMobile" class="hero-slide__video" :muted="muted" check-audio @hasaudio="hasAudio = $event" />
        <ImageStrapi v-else :omitformat="true" :image="mediaMobile" fit class="hero-slide__image" />
      </div>
      <div v-else :class="heroSlideMediaCSS">
        <VideoStrapi v-if="media && media.mime.includes('video') || mediaMobile && mediaMobile.mime.includes('video')" :video="media || mediaMobile" class="hero-slide__video" :muted="muted" check-audio @hasaudio="hasAudio = $event" />
        <ImageStrapi v-else :omitformat="true" :image="media || mediaMobile" fit class="hero-slide__image" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.active-min {
  height: 66.66666666vw;
  @media screen and (min-width: $md) {
    height: 28vw;
  }
  & > .hero-slide__media {
    &::after {
      background: linear-gradient(180deg, rgb(0 0 0 / 50%) 0%, rgba(0, 0, 0, 0) 100%);
    }
  }
}
.hero-slide {
  background-color: white;
  &__media {
    :deep() {
      .image-strapi,
      video {
        height: 100%;
        width: 100%;
      }
      video {
        object-fit: cover;
      }
    }
  }
  &__text {
    text-align: center;
    p {
      text-shadow: 3px 1px 5px rgba(0, 0, 0, 0.50);
    }
    :deep(strong) {
      color: $hero-bold;
      font-weight: $font-weight-bold;
    }
  }
  &__iframe {
    height: 100%;
    width: 100%;
    :deep(iframe) {
      width: 100%;
      height: 650px;
      transform: scale(1.3);
      @media screen and (min-width: $md) {
        height: 55vw;
      }
      @media screen and (min-width: $xl) {
        height: 45vw;
      }
    }
  }
}
</style>
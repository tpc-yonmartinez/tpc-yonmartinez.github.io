<script setup>
import { defineAsyncComponent, computed, ref, onBeforeUnmount } from 'vue'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import { showDatesRanged } from '../composables/utils.js'
import '@splidejs/vue-splide/css'

const CardHero = defineAsyncComponent(() => import('./CardHero.vue'))

const defaultCard = [{
  title: null,
  description: null,
  timerText: null,
  timerDateTime: null,
  startDate: null,
  endDate: null,
  btnExternal: null,
  media: {
    url: '/assets/img/default.png',
    mime: 'image/png'
  },
  btninternal: null,
  btnmodal: null,
  popup: null,
  mediam: null
}],
splide = ref(),
cardsHero = ref([])

let iObserver = null

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  cards: {
    type: Array,
    default: () => ([])
  },
  size: {
    type: String,
    default: 'max'
  },
  uppercase: {
    type: Boolean,
    default: false
  },
  transitiontime: {
    type: Number,
    default: 1
  },
  overlay: {
    type: String,
    default: 'partial'
  },
  soundonscroll: {
    type: Boolean,
    default: false
  }
})

const cssHero = {
  overlay: {
    class: `after:content-[''] after:absolute after:left-0 after:top-0 after:h-full after:w-full after:pointer-events-none`,
    full: 'overlay-full after:bg-[linear-gradient(180deg,rgba(0,0,0,0.50)_0%,rgba(0,0,0,0.00)_25%,rgba(0,0,0,0.00)_60%,rgba(0,0,0,0.80)_100%)]',
    partial: 'overlay-partial after:bg-[linear-gradient(180deg,rgba(0,0,0,0.50)_0%,rgba(0,0,0,0.00)_25%)]'
  }
}

const filteredCards = computed(() => {
  const cards = props.cards.filter(card => showDatesRanged(card.startDate, card.endDate))

  return cards?.length ? cards : defaultCard
})

const splideOptions = {
  type: filteredCards.value?.length > 1 ? 'loop' : 'fade',
  arrows: false,
  pagination: filteredCards.value?.length > 1,
  autoplay: true,
  speed: props.transitiontime * 1000 || 500,
  height: '100%',
  padding: '0px 20px',
  preloadPages: 1,
  arrowPath: 'M10.9091 40C10.6818 40 10.4545 39.9047 10.2727 39.7143C9.90909 39.3333 9.90909 38.7619 10.2727 38.381L27.8182 20L10.2727 1.61905C9.90909 1.23809 9.90909 0.666665 10.2727 0.285714C10.6363 -0.0952381 11.1818 -0.0952381 11.5454 0.285714L29.7272 19.3333C30.0909 19.7143 30.0909 20.2857 29.7272 20.6667L11.5454 39.7143C11.3636 39.9047 11.1363 40 10.9091 40Z',
  interval: (filteredCards.value[0]?.timecard * 1000) || 5000
}

const onMounted = () => {
  let videos = splide.value.root.querySelectorAll('.splide__list video')

  videos.forEach((video) => {
    if (!video.muted) {
      video.muted = true
    }
  })

  const config = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  }

  iObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting && props?.soundonscroll) {
        videos.forEach((video) => {
          if (!video.muted) {
            video.muted = true
          }
        })

        cardsHero.value.forEach((card) => {
          card.muted = true
        })
      }
    })
  }, config)

  iObserver.observe(splide.value.root)
}

const onInactive = (Slide) => {
  cardsHero.value.forEach((card) => {
    card.muted = true
  })
}

onBeforeUnmount(() => {
  if (iObserver) {
    iObserver.disconnect()
    iObserver = null
  }
})
</script>

<template>
  <div :class="[
        `hero h-[650px] md:h-[55vw] xl:h-[45vw] relative`,
        overlay !== 'hidden' ? `${cssHero.overlay['class']} ${cssHero.overlay[overlay || 'partial']}` : '',
        size === 'min' ? 'active-min' : ''
       ]">
    <Splide ref="splide" :options="splideOptions" @splide:mounted="onMounted" @splide:inactive="onInactive">
      <SplideSlide v-for="(card, i) in filteredCards" :key="i" :data-splide-interval="card?.timecard * 1000">
        <CardHero ref="cardsHero"
                  :media="card.media ? card.media : null"
                  :mediaMobile="card.mediam ? card.mediam : null"
                  :title="card.title"
                  :titleUpper="uppercase"
                  :description="card.description"
                  :timerText="card.timerText"
                  :timerDatetime="card.timerDateTime"
                  :btnInternal="card.btninternal"
                  :btnExternal="card.btnExternal"
                  :btnModal="card.btnmodal"
                  :btnText="card.btnText"
                  :size="size"
                  :iframe="card.iframe"
                  :id="card.idcard" />
      </SplideSlide>
    </Splide>
  </div>
</template>

<style lang="scss" scoped>
.active-min {
  height: 66.66666666vw;
  @media screen and (min-width: $md) {
    height: 28vw;
  }
}
.hero {
  margin: 0 calc($padding-container-s * -1);
  @media screen and (min-width: $sm) {
    margin: 0 calc($padding-container-m * -1);
  }
  :deep(.splide) {
    height: 100%;
    .splide__arrows {
      display: none;
      @media screen and (min-width: $md) {
        display: block;
      }
      .splide__arrow {
        background: transparent;
        svg{
          fill: $white;
          width: 40px;
          height: 40px;
          @media screen and (min-width: $lg) {
            width: 64px;
            height: 64px; 
          }
        }
      }
    }
    .splide__track {
      height: 100%;
    }
    .splide__pagination {
      gap: 10px;
      bottom: 1em;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(28, 28, 28, 0.40);
      width: fit-content;
      height: 20px;
      border-radius: $border-radius-m;
      @media screen and (min-width: $lg) {
        gap: 15px;
        bottom: 10%;
      }
      button {
        background: $white;
        opacity: 0.8;
        &.is-active {
          background: $white;
          opacity: 1;
        }
      }
      li {
        line-height: 0;
      }
    }
  }
}
</style>
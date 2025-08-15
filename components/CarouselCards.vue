<script setup>
import { defineAsyncComponent } from 'vue'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'
// import { useMediaQuery } from '@vueuse/core'
import '@splidejs/vue-splide/css'

// const Fade = defineAsyncComponent(() => import('./animations/Fade.client.vue'))
const CardCarouselCards = defineAsyncComponent(() => import('./CardCarouselCards.vue'))
const Button = defineAsyncComponent(() => import('./Button.vue'))
// const MediaQuery = useMediaQuery('(min-width: 1024px)')
const MediaQuery = true

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  cards: {
    type: Array,
    default: null
  },
  btnText: {
    type: String,
    default: ''
  },
  btnExternal: {
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
  },
  decorativeLine: {
    type: Boolean,
    default: true
  },
  bgColor: {
    type: Boolean,
    default: false
  },
  imageaspec: {
    type: String,
    default: ''
  },
  autoscroll: {
    type: Boolean,
    default: false
  },
  chevron: {
    type: Boolean,
    default: false
  }
})

const extensions = { AutoScroll }
const splideOptions = {
  mediaQuery: 'min',
  type: props.autoscroll && props.cards?.length > 3 ? 'loop' : 'slide',
  padding: '20px',
  pagination: false,
  arrows: false,
  autoWidth: true,
  breakpoints: {
    768: {
      padding: '10vw',
      drag: props.cards?.length > 2,
      arrows: props.chevron && props.cards?.length > 4,
      arrowPath: 'M10.9091 40C10.6818 40 10.4545 39.9048 10.2727 39.7143C9.90909 39.3333 9.90909 38.7619 10.2727 38.381L27.8182 20L10.2727 1.61905C9.90909 1.2381 9.90909 0.666667 10.2727 0.285714C10.6364 -0.0952381 11.1818 -0.0952381 11.5455 0.285714L29.7273 19.3333C30.0909 19.7143 30.0909 20.2857 29.7273 20.6667L11.5455 39.7143C11.3636 39.9048 11.1364 40 10.9091 40Z',
      autoScroll: {
        speed: 0.9
      }
    },
    1280: {
      padding: '5vw',
    },
  }
}
</script>

<template>
  <div :class="['carousel-cards flex flex-col gap-[40px] xl:gap-[50px] py-[25px] md:py-[30px] xl:py-[50px]', {'bg-active bg-[--color-base-alt]': bgColor}]">
    <div v-if="title || description" class="carousel-cards-header md:w-[80vw] xl:w-[50vw] flex flex-col gap-[30px] px-[20px] md:gap-[40px] md:m-auto md:p-0">
      <div v-if="title">
        <h2 class="text-center">{{ title }}</h2>
      </div>
      <div v-if="description">
        <p class="description-capital text-center">{{ description }}</p>
      </div>
    </div>
    <ClientOnly>
      <Splide :class="['carousel-cards__slide', `carousel-cards__slide-${imageaspec}`, cards?.length > 3 ? '' : 'center_content flex justify-center']"
              :options="splideOptions" :extensions="autoscroll && cards?.length > 3 ? extensions : {}">
        <SplideSlide v-for="(card, index) in cards" :key="index">
          <CardCarouselCards :modal="card.modal"
                             :urlinternal="card.urlinternal"
                             :urlExternal="card.urlExternal"
                             :title="card.title"
                             :playvideo="MediaQuery ? card.playvideo : true"
                             :tag="card.tag"
                             :media="card.media ? card.media : null"
                             :description="card.description"
                             :date="card.date"
                             :imageaspec="imageaspec || 'default'"
                             :btnltext="card.btnltext"
                             :btnrtext="card.btnrtext"
                             :btnrinternal="card.btnrinternal"
                             :btnrexternal="card.btnrexternal"
                             :btnrmodal="card.btnrmodal"
                             :disclaimer="card.disclaimer" />
        </SplideSlide>
      </Splide>
    </ClientOnly>
    <div v-if="btnText" class="flex justify-center px-[20px] md:px-0">
      <Button class="max-md:w-full"
              variant="secondary"
              :buttonInternalLink="btninternal"
              :buttonExternalLink="btnExternal"
              :buttonModal="btnmodal">{{ btnText }}</Button>
    </div>
  </div>
</template>
  
<style lang="scss" scoped>
.carousel-cards__slide {
  :deep() {
    .splide__track {
      .splide__list {
        gap: 20px;
        @media screen and (min-width: $md) {
          gap: 30px;
        }
        @media screen and (min-width: $xl) {
          gap: 2.6vw;
        }
        .splide__slide {
          width: 80vw;
          @media screen and (min-width: $md) {
            width: 40vw;
          }
          @media screen and (min-width: $xl) {
            width: 25vw;
          }
        }
      }
    }
    .splide__arrows {
      .splide__arrow {
        border: 1px solid $arrow;
        background: $page-bg;
        border-radius: 50%;
        height: 64px;
        width: 64px;
        transition: border 0.3s linear;
        &:not(:disabled) {
          opacity: 1;
        }
        &::after,
        &::before {
          box-sizing: border-box;
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
        &::before {
          border: 1px solid transparent;
          transition: border-top-color 0.15s linear,
          border-right-color 0.15s linear 0.1s,
          border-bottom-color 0.15s linear 0.2s;
        }
        &::after {
          border: 0 solid transparent;
          transition: transform 0.4s linear 0s, border-left-width 0s linear 0.35s,
          transform 0.4s linear 0s;
        }
        &:hover:not(:disabled) {
          border: 1px solid rgba($arrow-hover, 0.09);
          &::before {
            border-top-color: $arrow-hover;
            border-right-color: $arrow-hover;
            border-bottom-color: $arrow-hover;
          }
          &::after {
            border-top: 1px solid $arrow-hover;
            border-left-width: 1px;
            border-right-width: 1px;
            transform: rotate(270deg);
          }
          svg {
            animation: movesvg .7s linear forwards;
          }
          &:first-child {
            svg {
              animation: movesvgreverse .7s linear forwards;
            }
          }
          path {
            fill: $arrow-hover;
          }
        }
        svg{
          width: 24px;
          height: 24px;
        }
        path {
          fill: $arrow;
        }
      }
    }
  }
  &-ourteam {
    :deep() {
      .splide__track {
        .splide__list {
          .splide__slide {
            @media screen and (min-width: $xl) {
              width: 20vw !important;
            }
          }
        }
      }
    }
  }
}
[data-theme='dark'] {
  .carousel-cards.bg-active {
    background: $black;
  }
  .carousel-cards__slide {
    :deep(.splide__arrows .splide__arrow) {
      background: $black;
    }
  }
}
</style>
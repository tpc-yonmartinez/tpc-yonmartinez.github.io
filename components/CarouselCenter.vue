<script setup>
import { defineAsyncComponent, ref, reactive, onMounted, onUnmounted } from 'vue'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css'

// const Fade = defineAsyncComponent(() => import('./animations/Fade.client.vue'))
const CardCarouselCenter = defineAsyncComponent(() => import('./CardCarouselCenter.vue'))
const Button = defineAsyncComponent(() => import('./Button.vue'))

const splideCenter = ref(null)
const splideOptionsCenter = ref(null)

const props = defineProps({
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
  cards: {
    type: Array,
    default: null
  },
  decorativeLine: {
    type: Boolean,
    default: true
  },
  bgColor: {
    type: Boolean,
    default: false
  }
})

const splideOptions = reactive({
  mediaQuery: 'min',
  type: props.cards?.length > 1 ? 'loop' : 'slide',
  arrows: false,
  drag: props.cards?.length > 1,
  pagination: true,
  lazyLoad: 'nearby',
  preloadPages: 1,
  focus: 'center',
  perPage: 1,
  gap: 20,
  padding: 20,
  fixedWidth : '80vw',
  arrowPath: 'M10.9091 40C10.6818 40 10.4545 39.9048 10.2727 39.7143C9.90909 39.3333 9.90909 38.7619 10.2727 38.381L27.8182 20L10.2727 1.61905C9.90909 1.2381 9.90909 0.666667 10.2727 0.285714C10.6364 -0.0952381 11.1818 -0.0952381 11.5455 0.285714L29.7273 19.3333C30.0909 19.7143 30.0909 20.2857 29.7273 20.6667L11.5455 39.7143C11.3636 39.9048 11.1364 40 10.9091 40Z',
  breakpoints: {
    768: {
      gap: 40,
      padding: '5rem',
      fixedWidth : '80vw',
      fixedHeight: '40vw',
      arrows: props.cards?.length > 1
    },
    1280: {
      gap: '5rem',
      padding: '7rem'
    }
  }
})

onMounted(() => {
  splideOptionsCenter.value = setTimeout(() => {
    if ( splideCenter.value && splideCenter.value.splide ) {
      splideCenter.value.splide.refresh()
    }
  }, 600)
})
onUnmounted(() => {
  clearTimeout(splideOptionsCenter.value)
})
</script>

<template>
<div :class="['carousel-center flex flex-col my-[25px] py-[25px] md:my-[30px] md:py-[30px] xl:my-[2.5vw] xl:py-[2.5vw] 2xl:my-[50px] 2xl:py-[50px] gap-[40px] xl:gap-[60px]', {'bg-[--color-base-alt]': bgColor}]">
  <div v-if="title || description || btnText" class="carousel-center__content items-center flex flex-col px-[20px] gap-[30px] md:px-[15vw] md:gap-[40px] xl:w-[50vw] xl:mx-[auto] xl:px-[0px]">
    <div v-if="title">
      <h2> {{ title }} </h2>
    </div>
    <div v-if="description">
      <p class="description-capital"> {{ description }} </p>
    </div>
    <div v-if="btnText" class="h-[30px] flex justify-center items-center">
      <Button variant="text"
              :buttonInternalLink="btninternal" 
              :buttonExternalLink="btnExternal" 
              :buttonModal="btnmodal">{{ btnText }}</Button>
    </div>
  </div>
  <div class="carousel-center__sliders">
    <ClientOnly>
      <Splide ref="splideCenter" :options="splideOptions" class="carousel-center__sliders__carousel">
        <SplideSlide v-for="(card, index) in cards" :key="index" class="carousel-center__sliders__item">
          <CardCarouselCenter :title= "card.title"
                              :description= "card.description"
                              :btnText= "card.btnText"
                              :backgroundcolor= "bgColor"
                              :tag= "card.tag"
                              :urlinternal= "card.urlinternal"
                              :urlExternal= "card.urlExternal"
                              :modal= "card.modal"
                              :media="card?.media"/>
        </SplideSlide>
      </Splide>
    </ClientOnly>
  </div>
</div>
</template>

<style lang="scss" scoped>
.carousel-center {
  &__content {
    text-align: center;
  }
  &__sliders {
    overflow: hidden;
    position: relative;
    display: block;
    height: auto;
    &__carousel {
      display: flex;
      flex-direction: column;
      :deep() {
        ul.splide__list {
          align-items: stretch;
        }
        ul.splide__pagination {
          position: static;
          margin: 40px auto 0;
          gap: 30px;
          li {
            button {
              background: $color-base;
              height: 5px;
              opacity: 1;
              width: 5px;
              &.is-active {
                transform: scale(2);
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
            svg {
              width: 24px;
              height: 24px;
            }
            path {
              fill: $arrow;
            }
            &--next {
              right: 3vw;
              @media screen and (min-width: $lg) {
                right: calc(3vw + 64px);
              }
              @media screen and (min-width: $xxl) {
                right: 3vw;
              }
            }
            &--prev {
              left: 3vw;
              @media screen and (min-width: $lg) {
                left: calc(3vw + 64px);
              }
              @media screen and (min-width: $xxl) {
                left: 3vw;
              }
            }
          }
        }
        .splide__track {
          position: static;
        }
      }
    }
  }
}
</style>
<script setup>
import { defineAsyncComponent } from 'vue'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css'

// const Fade = defineAsyncComponent(() => import('./animations/Fade.client.vue'))
const ImageStrapi = defineAsyncComponent(() => import('./ImageStrapi.vue'))

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
  decorativeLine: {
    type: Boolean,
    default: true
  },
  htag: {
    type: String,
    default: 'h2'
  },
  roundedStyle: {
    type: Boolean,
    default: false
  }
})

const splideOptions = {
  mediaQuery: 'min',
  type: 'slide',
  lazyLoad: 'nearby',
  arrows: false,
  preloadPages: 1,
  focus: 0,
  height: 'auto',
  gap: 30,
  padding: 20,
  fixedWidth: 192,
  fixedHeight: 192,
  breakpoints: {
    768: {
      gap: 24,
      fixedHeight: 120,
      fixedWidth : 120,
      padding: 0,
    },
    1280: {
      gap: 32,
      fixedWidth : 192,
      fixedHeight: 192,
    },
  }
}
</script>

<template>
  <div class="carousel-badges flex flex-col gap-[30px] md:gap-[40px] xl:gap-[60px] text-center overflow-hidden w-auto py-[50px] md:py-[60px] xl:py-[5vw] 2xl:py-[100px]">
    <div v-if="title || description" class="carousel-badges__content flex gap-[30px] flex-col px-[20px] md:px-[100px] md:gap-[40px] xl:w-[50vw] xl:px-0 xl:mx-auto">
      <div v-if="title">
        <component :is="htag"> {{ title }} </component>
      </div>
      <div v-if="description">
        <p class="description-capital"> {{ description }} </p>
      </div>
    </div>
    <div class="carousel-badges__cards md:flex md:items-center md:justify-center" v-if="cards && cards?.length > 0">
      <ClientOnly>
        <Splide :options="splideOptions">
          <SplideSlide :class="['carousel-badges__slide', {'rounded-full': roundedStyle }]" v-for="(item, index) in cards" :key="index">
            <NuxtLink :to="item.urlexternal"
                      target="_blank"
                      class="h-full w-full flex justify-center items-center">
              <ImageStrapi :image="item.media" />
            </NuxtLink>
          </SplideSlide>
        </Splide>
      </ClientOnly>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.carousel-badges {
  &__cards {
    &:has(.splide.is-overflow) {
      margin-bottom: 40px;
    }
    :deep() {
      ul.splide__pagination {
        bottom: -40px;
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
    }
  }
  &__slide {
    display: flex;
    background: $bg-box;
    align-items: center;
    justify-content: center;
    .image-strapi {
      :deep() {
        img {
          width: 130px;
          height: 96px;
          object-fit: contain;
          @media screen and (min-width: $md) {
            width: 100px;
            height: 70px;
          }
          @media screen and (min-width: $xl) {
            width: 130px;
            height: 96px;
          }
        }
      }
    }
  }
}
</style>
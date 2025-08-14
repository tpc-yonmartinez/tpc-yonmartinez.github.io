<script setup>
import { defineAsyncComponent, onMounted, ref, onUnmounted, onUpdated, nextTick, reactive, computed, watch } from 'vue'
//import { Splide, SplideSlide } from '@splidejs/vue-splide'
//import { useMediaQuery } from '@vueuse/core'
import '@splidejs/vue-splide/css'

const BodyText = defineAsyncComponent(() => import('./BodyText.vue'))
const Icon = defineAsyncComponent(() => import('./Icon.vue'))

const emit = defineEmits(['onFilter', 'onSubfilter'])
const slider_primary = ref(null)
const slider_secondary = ref(null)
const splideOne = ref(null)
const splideTwo = ref(null)
let intervalId = 0

const props = defineProps({
    categories: {
      type: Array,
      default: null
    },
    currentCategory: {
      type: Object,
      default: null
    },
    currentSubcategory: {
      type: Object,
      default: null
    },
    subcategories: {
      type: Array,
      default: null
    },
    all: {
      type: String,
      default: ''
    },
    suball: {
      type: String,
      default: ''
    },
    stylefilter: {
      type: String,
      default: 'Default'
    },
    refresh: {
      type: Boolean,
      default: false
    },
    showiconall: {
      type: Boolean,
      default: false
    }
  })

const current_category = ref(props.currentCategory ? props.currentCategory : null)
const current_subcategory = ref(props.currentSubcategory? props.currentSubcategory : null)

const optionsSplideOne = reactive({
    arrowPath: 'M10.9091 40C10.6818 40 10.4545 39.9048 10.2727 39.7143C9.90909 39.3333 9.90909 38.7619 10.2727 38.381L27.8182 20L10.2727 1.61905C9.90909 1.2381 9.90909 0.666667 10.2727 0.285714C10.6364 -0.0952381 11.1818 -0.0952381 11.5455 0.285714L29.7273 19.3333C30.0909 19.7143 30.0909 20.2857 29.7273 20.6667L11.5455 39.7143C11.3636 39.9048 11.1364 40 10.9091 40Z',
    arrows: false,
    autoWidth: true,
    padding: '20px',
    pagination: false,
  })

const optionsSplideTwo = reactive({
    arrowPath: 'M10.9091 40C10.6818 40 10.4545 39.9048 10.2727 39.7143C9.90909 39.3333 9.90909 38.7619 10.2727 38.381L27.8182 20L10.2727 1.61905C9.90909 1.2381 9.90909 0.666667 10.2727 0.285714C10.6364 -0.0952381 11.1818 -0.0952381 11.5455 0.285714L29.7273 19.3333C30.0909 19.7143 30.0909 20.2857 29.7273 20.6667L11.5455 39.7143C11.3636 39.9048 11.1364 40 10.9091 40Z',
    arrows: false,
    autoWidth: true,
    padding: '20px',
    pagination: false,
  })

const onFilter = (category, index) => {
    current_category.value = category
    splideOne.value.go(index)
    emit('onFilter', category)
  }

const onSubfilter = (category, index) => {
    current_subcategory.value = category
    splideTwo.value.go(index)
    emit('onSubfilter', category)
  }

onMounted(() => {
    if (!props.all) { emit('onFilter', props.categories[0]) }

    window.addEventListener('resize', arrowsEnabled)
    window.addEventListener('orientationchange', arrowsEnabled)

    nextTick(() => {
      window.clearInterval(intervalId)
      intervalId = window.setInterval(arrowsEnabled, 500)
    })
  })

onUpdated(() => {
    window.clearInterval(intervalId)
    intervalId = window.setInterval(arrowsEnabled, 500)
  })

onUnmounted(() => {
    window.removeEventListener('resize', arrowsEnabled)
    window.removeEventListener('orientationchange', arrowsEnabled)
    window.clearInterval(intervalId)
    intervalId = 0
  })

const arrowsEnabled = () => {
    let widthSplideOne = 0
    let widthSplideTwo = 0

    if (splideOne.value?.root && splideOne.value.root.clientWidth > 0 && props.stylefilter !== 'Simple') {
      window.clearInterval(intervalId)
      splideOne.value.splide.Components.Elements.slides.forEach(elm => {
        widthSplideOne += elm.clientWidth + ((useMediaQuery('(min-width: 1280px)').value) ? 32 : 30)
      })

      optionsSplideOne.arrows = widthSplideOne > (splideOne.value.root.clientWidth + 10)
      optionsSplideOne.drag   = widthSplideOne > (splideOne.value.root.clientWidth + 10)

      if (splideTwo.value?.root && splideTwo.value?.root.clientWidth > 0) {
        splideTwo.value.splide.Components.Elements.slides.forEach(elm => {
          widthSplideTwo += elm.clientWidth + ((useMediaQuery('(min-width: 1280px)').value) ? 30 : 40)
        })

        optionsSplideTwo.arrows = widthSplideTwo > (splideTwo.value.root.clientWidth + 10)
        optionsSplideTwo.drag   = widthSplideTwo > (splideTwo.value.root.clientWidth + 10)
      }
    }
  }
  const reduceIcon = computed(() => {
    if (props.categories && props.categories.length > 0) {
      return props.categories.some(item => item.customicon)
    }
    return false
  })
watch(() => props.refresh, (newValue) => { if (newValue) onFilter(null, 0) })
</script>

<template>
  <div :class="['filters bg-[--filter-second] rounded-[22px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] md:mx-auto md:w-[50vw] xl:rounded-[27px]', {'filters--Simple shadow-none': stylefilter === 'Simple'}, {'filters--Custom shadow-none md:w-[55vw]': stylefilter === 'Full'}]">
    <div :class="{'filters__primary_bg': categories && categories.length > 0, 'relative px-[60px] bg-[--filter-first] rounded-[22px] has-[+.filters-secondary]:shadow-[0px_4px_20px_0px_rgba(0,0,0,0.20)] md:px-[60px] md:z-[1] xl:rounded-[27px] xl:px-[146px]': true, 'deactive-arrows': !optionsSplideOne.arrows}" v-if="categories && categories.length > 0" ref="slider_primary">
      <Splide :options="optionsSplideOne" :class="['filters__slider-primary [&_ul]:gap-[30px] [&_ul]:!py-[10px] [&_ul]:xl:gap-[32px] [&_ul]:xl:!py-[15px]', {'Simple [&_ul]:!py-[16px]': stylefilter === 'Simple'}, {'Custom [&_ul]:!py-[16px]': stylefilter === 'Full'}]" ref="splideOne" :key="'splide_primary'">
        <SplideSlide :class="['item_primary filters__all', {'px-[24px] pb-[16px] pt-[10px]': stylefilter === 'Simple'}, {'px-[2px] pb-[6px]': stylefilter === 'Full'}]">
          <BodyText wrapper="label" type="capital" :class="[{'cursor-pointer flex flex-col items-center justify-end h-full gap-[2px]': stylefilter !== 'Default'}, !current_category ? 'current-selected text-[--decorative-color]' : null]" @click.prevent="onFilter(null, 0)">
            <Icon v-if="stylefilter !== 'Default' && reduceIcon" variant="tpc" :class="['h-[24px] w-[24px]', {'[&_svg_path:is(.fill)]:!fill-[--decorative-color] [&_svg_path:is(.stroke)]:!stroke-[--decorative-color]': !current_category}]" />
            {{ all }}
          </BodyText>
        </SplideSlide>
        <SplideSlide v-for="(item, index) in categories" :key="index" :class="['item_primary filters__items', {'px-[24px] pb-[16px] pt-[10px]': stylefilter === 'Simple'}, {'px-[2px] pb-[6px]': stylefilter === 'Full'}]">
          <BodyText wrapper="label" type="capital" :class="[{'cursor-pointer flex flex-col items-center justify-end h-full gap-[2px]': stylefilter !== 'Default'}, current_category?.id && item.id === current_category.id ? 'current-selected text-[--decorative-color]' : null]" @click.prevent="onFilter(item, (index + 1))">
            <Icon v-if="item.customicon && stylefilter !== 'Default'" :variant="item.customicon" :class="['h-[24px] w-[24px]', current_category?.id && item.id === current_category.id ? '[&_svg_path:is(.fill)]:!fill-[--decorative-color] [&_svg_path:is(.stroke)]:!stroke-[--decorative-color]' : null]" />
            {{ item.category }}
          </BodyText>
        </SplideSlide>
      </Splide>
    </div>
    <div v-if="categories && subcategories && subcategories.length > 0" ref="slider_secondary" :class="{'filters__secondary_bg filters-secondary': subcategories && subcategories.length > 0, 'px-[44px] md:px-[80px] xl:px-[167px]': true, 'deactive-arrows': !optionsSplideTwo.arrows}">
      <Splide :options="optionsSplideTwo" class="filters__slider-secondary" ref="splideTwo"  :key="'splide_secondary'">
        <SplideSlide class="item_secondary filters__all">
          <BodyText wrapper="p" type="note capital" :class="!current_subcategory ? 'text-[--decorative-color]' : null" @click.prevent="onSubfilter(null, 0)">
            {{ suball }}
          </BodyText>
        </SplideSlide>
        <SplideSlide v-for="(item, index) in subcategories" :key="index" class="item_secondary filters__items">
          <BodyText wrapper="p" type="note" :class="current_subcategory?.category_id && item.category_id === current_subcategory.category_id ? 'text-[--decorative-color]' : null" @click.prevent="onSubfilter(item, (index + 1))">
            {{ item.category }}
          </BodyText>
        </SplideSlide>
      </Splide>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filters {
  &__slider {
    &-primary,
    &-secondary {
      :deep() {
        .splide {
          &__arrows {
            .splide__arrow {
              background: transparent;
              border-radius: 0;
              height: 44px;
              @media screen and (min-width: $xl) {
                height: 54px;
              }
              path {
                fill: $color-base;
              }
            }
          }
          &__track {
            &:after,
            &:before {
              content: '';
              height: 100%;
              position: absolute;
              top: 0;
              width: 25px;
              z-index: -1;
            }
            &:after {
              right: 0;
            }
            &:before {
              left: 0;
            }
          }
          &__list {
            .splide__slide {
              cursor: pointer;
              transition: all .2s ease-in-out;
              svg path {
                transition: all .2s ease-in-out;
              }
              &:hover {
                color: $decorative-color;
                svg path:is(.fill) {
                  fill: $decorative-color;
                }
                svg path:is(.stroke) {
                  stroke: $decorative-color;
                }
              }
            }
          }
        }
      }
    }
    &-primary {
      :deep() {
        .splide {
          &__arrows {
            .splide__arrow--prev {
              left: -2em;
              @media screen and (min-width: $md) {
                left: -3em;
              }
              @media screen and (min-width: $xl) {
                left: -8.5em;
              }
            }
            .splide__arrow--next {
              right: -2em;
              @media screen and (min-width: $md) {
                right: -3em;
              }
              @media screen and (min-width: $xl) {
                right: -8.5em;
              }
            }
          }
        }
      }
      &.Simple,
      &.Custom {
        .splide__list {
          li {
            &:before {
              content: '';
              height: 1px;
              position: absolute;
              background: transparent;
              bottom: 0;
              width: 100%;
              left: 0;
              z-index: -1;
              transition: background 300ms ease-in-out;
            }
            &:has( > label.current-selected) {
              &:before {
                background: $decorative-color;
              }
            }
          }
        }
      }
    }
    &-secondary {
      :deep() {
        .splide {
          &__arrows {
            .splide__arrow--prev {
              left: -2em;
              @media screen and (min-width: $md) {
                left: -4.25em;
              }
              @media screen and (min-width: $xl) {
                left: -9.8em;
              }
            }
            .splide__arrow--next {
              right: -2em;
              @media screen and (min-width: $md) {
                right: -4.25em;
              }
              @media screen and (min-width: $xl) {
                right: -9.85em;
              }
            }
          }
          &__track {
            &:after {
              right: 0;
            }
            &:before {
              left: 0;
            }
          }
        }
        .splide__list {
          gap: 40px;
          padding-bottom: 13px!important;
          padding-top: 13px!important;
          @media screen and (min-width: $xl) {
            gap: 30px;
            padding-bottom: 16px!important;
            padding-top: 16px!important;
          }
        }
      }
    }
  }
  &__primary_bg,
  &__secondary_bg {
    &.deactive-arrows {
      :deep() {
        .splide__list {
          justify-content: center;
        }
      }
    }
  }
  &--Simple {
    background: transparent;
    .filters__primary_bg {
      background: transparent;
      border-radius: 0;
      padding: 0;
      :deep() {
        .splide__track {
          padding: 0 !important;
          &:after, &:before {
            display: none;
          }
          .splide__list {
            gap: 30px 0;
            flex-wrap: wrap;
            transform: none !important;
          }
        }
      }
    }
  }
  &--Custom {
    background: $filter-first;
    width: auto;
    margin: 0 -20px;
    @media screen and (min-width: $md) {
      margin: 0 -10vw;
    }
    .filters__primary_bg {
      background: $filter-first;
      border-radius: 0;
      padding: 0 52px;
      border-bottom: 1px solid $border-color;
      @media screen and (min-width: $xl) {
        padding: 0;
      }
      :deep() {
        .splide__track {
          .splide__list {
            gap: 30px;
            @media screen and (min-width: $xl) {
              gap: 40px;
            }
          }
        }
        .splide__arrows {
          .splide__arrow {
            height: 32px;
            width: 32px;
            svg {
              width: 32px;
              height: 32px;
              path {
                fill: $color-base;
              }
            }
          }
        }
      }
    }
  }
}
</style>
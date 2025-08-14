<script setup>
import { defineAsyncComponent, computed, ref, onMounted, watch } from 'vue'
import { useState, useRuntimeConfig } from '#app'
import { useI18n } from '#imports'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css'
import useFindGeolocatedItem from '@/composables/useFindGeolocatedItem'
import useParseText from '../../composables/useParseText'
 
const BodyText = defineAsyncComponent(() => import('../BodyText.vue'))
const ImageStrapi = defineAsyncComponent(() => import('../ImageStrapi.vue'))
const Button = defineAsyncComponent(() => import('../Button.vue'))
const Icon = defineAsyncComponent(() => import('../Icon.vue'))

const { t } = useI18n(),
      widgetResort = useState('sendResortCatalog'),
      PriceResult = ref(null),
      sppiner = ref(false),
      Config = useRuntimeConfig()

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
  },
  titlebenefits: {
    type: String,
    default: ''
  },
  listbenefit: {
    type: String,
    default: ''
  },
  remaining: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    default: 0.0
  },
  disclaimer: {
    type: String,
    default: ''
  },
  price: {
    type: Array,
    default: null
  },
  coderesort: {
    type: String,
    default: ''
  },
  titleurlexternal: {
    type: String,
    default: ''
  }
})

const splideOptions = {
  mediaQuery: 'min',
  type: 'slide',
  lazyLoad: 'nearby',
  arrows: false,
  preloadPages: 1,
  perPage: 1,
  focus: 'center',
  arrows: true,
  arrowPath: 'M10.9091 40C10.6818 40 10.4545 39.9048 10.2727 39.7143C9.90909 39.3333 9.90909 38.7619 10.2727 38.381L27.8182 20L10.2727 1.61905C9.90909 1.2381 9.90909 0.666667 10.2727 0.285714C10.6364 -0.0952381 11.1818 -0.0952381 11.5455 0.285714L29.7273 19.3333C30.0909 19.7143 30.0909 20.2857 29.7273 20.6667L11.5455 39.7143C11.3636 39.9048 11.1364 40 10.9091 40Z',
  classes: {
    prev  : 'splide__arrow--prev disabled:hidden',
    next  : 'splide__arrow--next disabled:hidden',
  }
}

const benefit = computed(() => props.listbenefit ? props.listbenefit.split('\n') : [] )

const circleStyles = computed(() => {
  const fullCircles = Math.floor(props.rating);
  const partialCircle = props.rating - fullCircles;
  const styles = []

  for (let i = 0; i < 5; i++) {
    if (i < fullCircles) {
      styles.push({ fill: 'var(--btn-primary)' })
    } else if (i === fullCircles && partialCircle > 0) {
      styles.push({ fill: `url(#half-fill-${i})` })
    } else {
      styles.push({ fill: 'none' })
    }
  }

  return styles;
})

const filterpriceSimple = () => {
  const priceConfig = props.price ? useFindGeolocatedItem(props.price) : null
  if (priceConfig?.currency && priceConfig?.price) {
    PriceResult.value = {
      average: priceConfig.price,
      currency: priceConfig.currency
    }
  }
}

const filterPrice = async (priceConfig, codeResort, dateStart, dateEnd) => {
  sppiner.value = true
  let priceAvg = null
  const paramsGet = priceConfig ? useFindGeolocatedItem(priceConfig) : null
  const paramsGetCountry = useState('countryCode').value?.alpha2 || 'US'

  if (paramsGet?.currency && codeResort) {
    priceAvg = await $fetch(`${Config.public.averageUrl}/api/v2/public/rates/property/get/${codeResort+'/'+paramsGetCountry+'/'+paramsGet.currency}`, {
      headers: {
        'api-key': Config.public.keyaverage
      },
      params: {
        date_start: dateStart,
        date_end: dateEnd
      }
    })
    .then(res => {
      if (!res.Error) {
        const finalPrice = new Intl.NumberFormat({ style: "currency", currency: paramsGet.currency }).format(res.data.avg_total)
        return `$${finalPrice}`
      }
    })
    .catch(err => {
      console.error('Error: ', err)
      return { data: [] }
    })
  }

  sppiner.value = false
  return {
    average: priceAvg || paramsGet?.price,
    currency: paramsGet?.currency
  }
}

onMounted(() => {
  if (props.price && widgetResort.value) {
    filterPrice(props.price, props.coderesort, widgetResort.value.checkin, widgetResort.value.checkout).then(res => {
      PriceResult.value = res
    }).catch(err => {
      PriceResult.value = null
      console.error('Error: ', err)
    })
  }
  else {
    filterpriceSimple()
  }
})

watch(() => widgetResort.value, (nv) => {
  if (nv && props.price) {
    filterPrice(props.price, props.coderesort, nv.checkin, nv.checkout).then(res => {
      PriceResult.value = res
    }).catch(err => {
      PriceResult.value = null
      console.error('Error: ', err)
    })
  }
  else {
    filterpriceSimple()
  }
}, {deep: true})
</script>
 
<template>
  <div class="catalog_content__card relative flex flex-col h-full">
    <div class="catalog_content__card_media relative rounded-t-[--border-m] overflow-hidden w-full h-auto aspect-[4/3]">
      <div v-if="rating || remaining" class="pointer-events-none absolute z-[2] top-[20px] w-full px-[10px] lg:px-[20px] flex justify-between items-start">
        <div v-if="rating" class="note flex flex-col bg-[--bg-box] px-[12px] py-[4px] rounded-[--radius-s]">
          <div class="flex gap-[5px] items-center">
            <Icon variant="owl" class="[&_svg_path]:!fill-[--btn-primary] h-[16px] w-[16px]" />
            <div class="bullet-rating relative flex gap-[1px] flex-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="44" height="8" viewBox="0 0 44 8" fill="none">
                <defs>
                  <linearGradient id="half-fill-0" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="50%" style="stop-color:var(--btn-primary); stop-opacity:1" />
                    <stop offset="50%" style="stop-color:transparent; stop-opacity:1" />
                  </linearGradient>
                  <linearGradient id="half-fill-1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="50%" style="stop-color:var(--btn-primary); stop-opacity:1" />
                    <stop offset="50%" style="stop-color:transparent; stop-opacity:1" />
                  </linearGradient>
                  <linearGradient id="half-fill-2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="50%" style="stop-color:var(--btn-primary); stop-opacity:1" />
                    <stop offset="50%" style="stop-color:transparent; stop-opacity:1" />
                  </linearGradient>
                  <linearGradient id="half-fill-3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="50%" style="stop-color:var(--btn-primary); stop-opacity:1" />
                    <stop offset="50%" style="stop-color:transparent; stop-opacity:1" />
                  </linearGradient>
                  <linearGradient id="half-fill-4" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="50%" style="stop-color:var(--btn-primary); stop-opacity:1" />
                    <stop offset="50%" style="stop-color:transparent; stop-opacity:1" />
                  </linearGradient>
                </defs>
                <circle v-for="(style, index) in circleStyles" :key="index" :cx="4 + index * 9" cy="4" r="3.5" stroke="--btn-primary" :fill="style.fill" />
              </svg>
            </div>
          </div>
          {{ rating }} {{ t('catalog.rating') }}
        </div>
        <p v-if="remaining" class="note capital only:ml-auto bg-[--bg-alt] text-[--color-base-alt] px-[12px] py-[4px] rounded-[--radius-s]">
          {{ remaining }}
        </p>
      </div>
      <Splide :options="splideOptions">
        <SplideSlide v-for="(item, index) in media" :key="index" class="h-auto aspect-[4/3]">
          <ImageStrapi :image="item" class="catalog_content__card_media_img h-full w-full" />
        </SplideSlide>
      </Splide>
    </div>
    <div class="catalog_content__card__info flex flex-col gap-[20px] justify-between flex-1 bg-[--bg-box] rounded-b-[--border-m] p-[20px]">
      <div class="flex flex-col gap-[10px]">
        <div class="flex flex-col" v-if="tag || title || description">
          <label v-if="tag"> {{ tag }} </label>
          <NuxtLink v-if="title"
                    target="_blank"
                    :to="titleurlexternal"
                    class="h3">
            {{ title }}
          </NuxtLink>
          <BodyText v-if="description" wrapper="p" :html="useParseText(description)" />
        </div>
        <div v-if="titlebenefits || benefit.length > 0" class="py-[6px] px-[12px] bg-[--page-bg] rounded-[--border-s]">
          <label> {{ titlebenefits }} </label>
          <div v-for="(item, i) in benefit" class="flex gap-[10px]">
            <Icon variant="check" class="h-[16px] w-[16px] [&_svg_path]:!fill-[--decorative-color]" />
            <label> {{ item }} </label>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-[10px] xl:gap-0 xl:flex-row xl:justify-between xl:items-end">
        <div class="flex flex-col items-center xl:items-start">
          <div v-if="sppiner" class="sppiner"></div>
          <div v-else-if="PriceResult && PriceResult?.average && !sppiner">
            <label class="hidden xl:block"> {{ t('from') }} </label>
            <div class="catalog_content__card__price flex gap-[6px] items-baseline">
              <label class="block xl:hidden"> {{ t('from') }} </label>
              <span class="h2 !text-[30px] !text-[--title-alt]"> {{ PriceResult.average }} </span>
              <label> {{ PriceResult.currency }} </label>
            </div>
            <label class="note capital"> {{ disclaimer || t('night') }} </label>
          </div>
        </div>
        <div v-if="btntext" class="xl:only:justify-end xl:only:flex xl:only:w-full">
          <Button variant="primary"
                  :buttonExternalLink="external"
                  :buttonInternalLink="internal"
                  :buttonModal="modal"> {{ btntext }} </Button>
        </div>
      </div>
    </div>
  </div>
</template>
 
<style lang="scss" scoped>
.catalog_content__card {
  &_media {
    :deep() {
      ul.splide__pagination {
        gap: 6px;
        bottom: 10px;
        @media screen and (min-width: $lg) {
          bottom: 20px;
        }
        li {
          button {
            background: rgba($white, 0.4);
            height: 6px;
            width: 6px;
            opacity: 1;
            &.is-active {
              background: $white;
              transform: scale(2);
            }
          }
        }
      }
      .splide__arrows {
        .splide__arrow {
          position: absolute;
          transform: translateY(-50%);
          top: 50%;
          border: none;
          background: transparent;
          height: 32px;
          width: 32px;
          svg {
            width: 32px;
            height: 32px;
            path {
              fill: $white;
            }
          }
        }
      }
    }
  }
  @media screen and (min-width: $lg) {
    &:hover {
      box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
    }
  }
}
.sppiner {
  width: 40px;
  padding: 5px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: $btn-primary;
  -webkit-mask: conic-gradient(#0000 10%,#000), linear-gradient(#000 0 0) content-box;;
  mask: conic-gradient(#0000 10%,#000), linear-gradient(#000 0 0) content-box;;
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: spin 1s infinite linear;
}
@keyframes spin { to { transform: rotate(1turn) } }
</style>
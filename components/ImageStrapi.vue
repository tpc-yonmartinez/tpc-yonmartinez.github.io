<script setup>
import { computed } from 'vue'
// import Parallaxy from '@lucien144/vue3-parallaxy'

const regex = /\(\D*(\d+)px\D*\)/
const orderFormats = ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', 'xxxlarge']
const sizeFormats = [576, 768, 992, 1200, 1400, 1920, 2400]
const toPxSizes = {
    xsmall: '(max-width: 576px) 320px',
    small: '(max-width: 768px) 573px',
    medium: '(max-width: 992px) 768px',
    large: '(max-width: 1200px) 992px',
    xlarge: '(max-width: 1400px) 1200px',
    xxlarge: '(max-width: 1920px) 1400px',
    xxxlarge: '(max-width: 2400px) 1920px, 2400px',
  }
const toWSizes = orderFormats.reduce((a, v) =>
                    toPxSizes[v].match(regex) ?
                      { ...a, [v]: `${toPxSizes[v].match(regex)[1]}w` } : a, {}
                  )

const props = defineProps({
    image: {
      type: Object,
      default: () => ({})
    },
    type: {
      type: String,
      default: 'img'
    },
    fit: {
      type: Boolean,
      default: false
    },
    parallax: {
      type: Boolean,
      default: false
    },
    borderRadius: {
      type: Boolean,
      default: false
    },
    omitformat: {
      type: Boolean,
      default: false
    }
  })

const url = computed(() => {
    return props.image?.url || '/assets/img/default.png'
  })
const alt = computed(() => {
    return props.image?.alternativeText || ''
  })
const title = computed(() => {
    return props.image?.caption || props.image?.alternativeText || ''
  })
const sizes = computed(() =>
    orderFormats.reduce((a, v) =>
        props.image.imageformats[v] ? `${a?.length ? `${a}, `: ''}${toPxSizes[v]}` : a,
        ''
      )
  )
const srcset = computed(() =>
    orderFormats.reduce((a, v) =>
        props.image.imageformats[v] ?
            `${a?.length ? `${a}, `: ''}${props.image.imageformats[v].url} ${toWSizes[v]}` : a,
        ''
      )
  )
const media = computed(() => {
    let breakpoints;
    orderFormats.forEach((v, i) => {
        if (props.image.imageformats[v]) {
          breakpoints = sizeFormats[i]
        }
      })
    return `(width <= ${breakpoints}px)`
  })
const imageStrapiCSS = computed(() => {
    const css = {
      'image-strapi': true,
      'image-strapi--fit': props.fit
    }
    return css
  })
const imgCSS = computed(() => {
    const css = {
      'img': true,
      'border-radius': props.borderRadius
    }
    return css
  })
</script>

<template>
  <div :class="imageStrapiCSS">
    <picture v-if="image && image?.imageformats && Object.keys(image.imageformats)?.length > 1 && !omitformat"
             :title="title"
             :class="imgCSS">
      <source type="image/webp"
              :sizes="sizes"
              :media="media"
              :srcset="srcset">
      <img :src="url"
           :alt="alt"
           loading="lazy">
    </picture>

    <img v-else
         :src="url"
         :srcset="`${url} 2x`"
         :alt="alt"
         :title="title"
         loading="lazy"
         width="100%"
         height="100%"
         :class="imgCSS" />
  </div>
</template>

<style lang="scss" scoped>
:deep() {
  img,
  picture,
  picture img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  picture,
  img {
    &.border-radius {
      @media screen and (min-width: $md){
        border-radius: $border-radius-m;
      }
      img { 
        @media screen and (min-width: $md){
          border-radius: $border-radius-m;
        }
      }
    }
  }
}
</style>
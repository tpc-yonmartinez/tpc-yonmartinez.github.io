<script setup>
import { defineAsyncComponent, ref } from 'vue'
//import { useI18n } from '#imports'
//import useParseText from '../../composables/useParseText'
//import { useMediaQuery } from '@vueuse/core'
//import moment from 'moment'
//import 'moment/dist/locale/es'

const ImageStrapi = defineAsyncComponent(() => import('../ImageStrapi.vue'))
const VideoStrapi = defineAsyncComponent(() => import('../VideoStrapi.vue'))
const BodyText = defineAsyncComponent(() => import('../BodyText.vue'))
const Button = defineAsyncComponent(() => import('../Button.vue'))
const Icon = defineAsyncComponent(() => import('../Icon.vue'))

// const { t, locale } = useI18n(),
// isDesktop = useMediaQuery('(min-width: 1024px)'),
// hover = ref(false)

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  tag: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  media: {
    type: Object,
    default: null
  },
  textbook: {
    type: String,
    default: ''
  },
  booktextstart: {
    type: String,
    default: ''
  },
  bookfrom: {
    type: String,
    default: ''
  },
  booktextend: {
    type: String,
    default: ''
  },
  bookto: {
    type: String,
    default: ''
  },
  textstay: {
    type: String,
    default: ''
  },
  staytextstart: {
    type: String,
    default: ''
  },
  stayfrom: {
    type: String,
    default: ''
  },
  staytextend: {
    type: String,
    default: ''
  },
  stayto: {
    type: String,
    default: ''
  },
  btnltext: {
    type: String,
    default: ''
  },
  btnlinternal: {
    type: Object,
    default: null
  },
  btnlexternal: {
    type: String,
    default: ''
  },
  btnlmodal: {
    type: Object,
    default: null
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
  },
  disclaimer: {
    type: String,
    default: ''
  },
  decorativeline: {
    type: Boolean,
    default: true
  },
  totalcards: {
    type: Number,
    default: 0
  },
  playvideo: {
    type: Boolean,
    default: true
  },
  align: {
    type: String,
    default: 'left'
  },
  enableicon: {
    type: Boolean,
    default: false
  }
})

// const formatDate = (dateFrom, dateTo, textStart, textEnd) => {
//   moment.locale(locale.value)
//   return (dateFrom && dateTo) || (textStart && dateTo) || (dateFrom && textEnd) || (textStart && textEnd) ? `${(textStart || (moment(dateFrom).format('ll') + ' -') || '') } ${ !textStart || !textEnd ? '' : '' } ${(textEnd || moment(dateTo).format('ll') || '') }` : false
// }

const mouseHover = () => {
  //isDesktop.value && !props.playvideo && (hover.value = true)
}
const mouseRemoveHover = () => {
  //isDesktop.value && !props.playvideo && (hover.value = false)
}
</script>

<template>
  <div @mouseenter="mouseHover" @mouseleave="mouseRemoveHover"
  :class="[
    'card-group-colum flex flex-col group-[.column-one]:flex-col group-[.column-one]:md:flex-row group-[.column-three]:md:flex-row group-[.column-three]:lg:flex-col'
  ]">
    <div :class="[
      'card-group-colum__media overflow-hidden w-full aspect-[3/2] group-[.column-one]:md:h-[26.2vw] group-[.column-one]:md:w-[39.3vw] group-[.column-one]:lg:h-[20.4vw] group-[.column-one]:lg:w-[30.6vw] group-[.column-three]:md:h-[26.2vw] group-[.column-three]:md:w-[39.3vw] group-[.column-three]:lg:h-auto group-[.column-three]:lg:w-auto group-[.column-three]:lg:aspect-[1/1] group-[.column-three]:[&_img]:lg:aspect-[1/1]',
    ]">
      <ClientOnly>
        <ImageStrapi v-if="media?.mime?.includes('image')" class="h-full w-full" fit :image="media" />
        <VideoStrapi v-else class="h-full w-full object-cover" :video="media" :autoplay="isDesktop ? playvideo : true" :initplay="hover" />
      </ClientOnly>
    </div>
    <div :class="[
      'flex flex-col justify-center gap-[24px] p-[20px] group-[.column-two]:md:pr-[40px] group-[.column-two]:lg:pr-[60px] group-[.column-one]:md:pl-[40px] group-[.column-one]:lg:px-[60px]',
      {
        'flex-1 xl:!py-[20px]': totalcards > 2 || totalcards <= 1,
        'md:pl-[40px] lg:pl-[20px] lg:pr-[40px]': totalcards > 2
      }
    ]">
      <div v-if="title || tag" :class="['flex flex-col gap-[10px]']">
        <BodyText v-if="tag" wrapper="label" type="strong"> {{ tag }} </BodyText>
        <BodyText v-if="title" wrapper="p" :class="{'pb-[10px]': decorativeline, 'description': true}"> {{ title }} </BodyText>
      </div>
      <BodyText v-if="description" wrapper="p" :html="useParseText(description)" />
        <!-- <div v-if="(formatDate(bookfrom, bookto, booktextstart, booktextend) || formatDate(stayfrom, stayto, staytextstart, staytextend))" class="flex flex-row flex-wrap gap-[0px_40px]">
          <BodyText v-if="formatDate(bookfrom, bookto, booktextstart, booktextend)" wrapper="p" type="capital" class="flex items-center gap-[6px]" >
            <Icon v-if="enableicon" variant="calendar" class="w-[16px] h-[16px]" />
            <span id="dates">{{ textbook || t('book') }}</span> <span>{{ formatDate(bookfrom, bookto, booktextstart, booktextend) }}</span>
          </BodyText>
          <BodyText v-if="formatDate(stayfrom, stayto, staytextstart, staytextend)" wrapper="p" type="capital" class="flex items-center gap-[6px]" >
            <Icon v-if="enableicon" variant="calendar" class="w-[16px] h-[16px]" />
            <span id="dates">{{ textstay || t('stay') }}</span> <span>{{ formatDate(stayfrom, stayto, staytextstart, staytextend) }}</span>
          </BodyText>
        </div> -->
      <BodyText wrapper="p" type="note capital" :html="useParseText(disclaimer)" />
      <div v-if="btnltext || btnrtext" class="flex flex-row items-start content-start gap-[40px]">
        <Button v-if="btnltext"
                variant="txt-link" class="md:w-auto"
                :buttonInternalLink="btnlinternal"
                :buttonExternalLink="btnlexternal"
                :buttonModal="btnlmodal"> {{ btnltext }} </Button>
        <Button v-if="btnrtext"
                variant="btn-link" class="md:w-auto"
                :buttonInternalLink="btnrinternal"
                :buttonExternalLink="btnrexternal"
                :buttonModal="btnrmodal"> {{ btnrtext }} </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'
// import { useI18n } from '#imports'
// import useParseText from '../../composables/useParseText'
// import { useMediaQuery } from '@vueuse/core'
// import moment from 'moment'
// import 'moment/dist/locale/es'

const ImageStrapi = defineAsyncComponent(() => import('../ImageStrapi.vue'))
const VideoStrapi = defineAsyncComponent(() => import('../VideoStrapi.vue'))
const BodyText = defineAsyncComponent(() => import('../BodyText.vue'))
const Button = defineAsyncComponent(() => import('../Button.vue'))
const Icon = defineAsyncComponent(() => import('../Icon.vue'))

const { t, locale } = useI18n(),
isDesktop = useMediaQuery('(min-width: 1024px)'),
isDesktopXl = useMediaQuery('(min-width: 1280px)'),
hover = ref(false)

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

const formatDate = (dateFrom, dateTo, textStart, textEnd) => {
  moment.locale(locale.value)
  return (dateFrom && dateTo) || (textStart && dateTo) || (dateFrom && textEnd) || (textStart && textEnd) ? `${(textStart || (moment(dateFrom).format('ll') + ' -') || '') } ${ !textStart || !textEnd ? '' : '' } ${(textEnd || moment(dateTo).format('ll') || '') }` : false
}

const mouseHover = () => {
  isDesktop.value && !props.playvideo && (hover.value = true)
}
const mouseRemoveHover = () => {
  isDesktop.value && !props.playvideo && (hover.value = false)
}
</script>

<template>
  <div @mouseenter="mouseHover" @mouseleave="mouseRemoveHover" class="flex flex-col md:flex-row md:items-start md:self-stretch lg:items-center">
    <div class="card-group-list__media overflow-hidden aspect-[4/3] md:h-[29.03vw] md:w-[38.70vw] [&_img]:md:!h-[unset] [&_img]:md:!w-[unset] [&_img]:md:aspect-[4/3] lg:h-[15vw] lg:w-[20vw]">
      <ClientOnly>
        <ImageStrapi v-if="media?.mime?.includes('image')" class="h-full w-full" fit :image="media" />
        <VideoStrapi v-else class="h-full w-full object-cover" :video="media" :autoplay="isDesktop ? playvideo : true" :initplay="hover" />
      </ClientOnly>
    </div>
    <div class="card-group-list__content overflow-hidden flex flex-col gap-[20px] p-[20px] md:justify-center md:self-stretch md:flex-1 md:pl-[40px] lg:pl-[60px]">
      <div v-if="title || tag" class="flex flex-col gap-[4px]">
        <BodyText v-if="tag" wrapper="label" type="strong"> {{ tag }} </BodyText>
        <BodyText v-if="title" wrapper="p" class="description"> {{ title }} </BodyText>
      </div>
      <BodyText v-if="description" wrapper="p" :html="useParseText(description)" />
      <div v-if="(formatDate(bookfrom, bookto, booktextstart, booktextend) || formatDate(stayfrom, stayto, staytextstart, staytextend))" class="flex flex-row flex-wrap gap-[0px_40px]">
        <BodyText v-if="formatDate(bookfrom, bookto, booktextstart, booktextend)" wrapper="p" type="capital" class="flex items-center gap-[6px]" >
          <Icon v-if="enableicon" variant="calendar" class="w-[16px] h-[16px]" />
          <span id="dates">{{ textbook || t('book') }}</span> <span>{{ formatDate(bookfrom, bookto, booktextstart, booktextend) }}</span>
        </BodyText>
        <BodyText v-if="formatDate(stayfrom, stayto, staytextstart, staytextend)" wrapper="p" type="capital" class="flex items-center gap-[6px]" >
          <Icon v-if="enableicon" variant="calendar" class="w-[16px] h-[16px]" />
          <span id="dates">{{ textstay || t('stay') }}</span> <span>{{ formatDate(stayfrom, stayto, staytextstart, staytextend) }}</span>
        </BodyText>
      </div>
      <BodyText v-if="disclaimer" wrapper="p" type="note capital" :html="useParseText(disclaimer)" />
      <div v-if="(btnltext || btnrtext)" class="flex flex-row items-start content-start gap-[40px]">
        <Button v-if="btnltext"
                variant="txt-link" class="w-auto"
                :buttonInternalLink="btnlinternal"
                :buttonExternalLink="btnlexternal"
                :buttonModal="btnlmodal"> {{ btnltext }} </Button>
        <Button v-if="btnrtext"
                variant="btn-link" class="w-auto"
                :buttonInternalLink="btnrinternal"
                :buttonExternalLink="btnrexternal"
                :buttonModal="btnrmodal"> {{ btnrtext }} </Button>
      </div>
    </div>
  </div>
</template>

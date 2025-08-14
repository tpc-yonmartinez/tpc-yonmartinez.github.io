<script setup>
import { ref, defineAsyncComponent, computed, onMounted, onUnmounted } from 'vue'
import { showDatesRanged } from '../composables/utils.js'
import { useI18n } from '#imports'
import { useState } from '#app';
import moment from 'moment'
import 'moment/dist/locale/es'
import useParseText from '../composables/useParseText'

// const Fade = defineAsyncComponent(() => import('./animations/Fade.client.vue'))
const Button = defineAsyncComponent(() => import('./Button.vue'))
const Icon = defineAsyncComponent(() => import('./Icon.vue'))
const ImageStrapi = defineAsyncComponent(() => import('./ImageStrapi.vue'))
const VideoStrapi = defineAsyncComponent(() => import('./VideoStrapi.vue'))

const props = defineProps({
  align: {
    type: String,
    default: 'left'
  },
  textbook: {
    type: String,
    default: ''
  },
  bookstart: {
    type: String,
    default: ''
  },
  bookfrom: {
    type: String,
    default: ''
  },
  textbookto: {
    type: String,
    default: ''
  },
  bookto: {
    type: String,
    default: ''
  },
  btnlexternal: {
    type: String,
    default: ''
  },
  btnlinternal: {
    type: Object,
    default: null
  },
  btnlmodal: {
    type: Object,
    default: null
  },
  btnltext: {
    type: String,
    default: ''
  },
  btnrexternal: {
    type: String,
    default: ''
  },
  btnrinternal: {
    type: Object,
    default: null
  },
  btnrmodal: {
    type: Object,
    default: null
  },
  btnrtext: {
    type: String,
    default: ''
  },
  decorativeline: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    default: ''
  },
  disclaimer: {
    type: String,
    default: ''
  },
  enddate: {
    type: String,
    default: ''
  },
  iconlist: {
    type: String,
    default: ''
  },
  layout: {
    type: String,
    default: 'align'
  },
  list: {
    type: String,
    default: ''
  },
  media: {
    type: [Array, Object],
    default: ''
  },
  startdate: {
    type: String,
    default: ''
  },
  textstay: {
    type: String,
    default: ''
  },
  staystart: {
    type: String,
    default: ''
  },
  stayfrom: {
    type: String,
    default: ''
  },
  textstayto: {
    type: String,
    default: ''
  },
  stayto: {
    type: String,
    default: ''
  },
  tag: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  disableviewmore: {
    type: Boolean,
    default: false
  },
  viewless: {
    type: String,
    default: ''
  },
  viewmore: {
    type: String,
    default: ''
  },
  imageaspec: {
    type: Boolean,
    default: true
  },
  largedescription: {
    type: String,
    default: ''
  },
  showmodal: {
    type: Boolean,
    default: false
  },
  titlemodal: {
    type: String,
    default: ''
  },
  css: {
    type: Object,
    default: {
      align: {
        body: `content-align-body flex flex-col items-start md:self-stretch gap-[30px] px-[20px] pt-[40px] md:flex-[1_0_0] md:gap-[20px] md:px-[0px] md:pt-[0px] xl:justify-center xl:gap-[40px]`,
        buttons: `content-align-body-buttons flex flex-col lg:justify-between 2xl:justify-start gap-[20px] w-full pt-[10px] md:pt-[20px] lg:flex-row 2xl:w-auto 2xl:pt-[0px]`,
        content: `content-align-content md:flex md:items-start md:gap-[50px] xl:justify-center 2xl:gap-[192px]`,
        dates: `content-align-body-dates`,
        image: `content-align-image h-[75vw] md:h-[30vw] md:w-[40vw] md:overflow-hidden md:rounded-[0px] xl:shrink-0`,
        layout: `content-align xl:mx-[0px] md:px-[100px] 2xl:px-[288px] py-[50px] md:py-[60px] xl:py-[5vw] 2xl:py-[100px]`,
        li: `flex items-center gap-[10px] leading-[27px]`,
        list: `content-align-body-list w-full relative overflow-hidden after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[40px]`,
        more: `flex items-center gap-[8px] !normal-case underline underline-offset-4 xl:cursor-pointer`,
        book: `content-align-body-dates-book block !text-[--color-base]`,
        stay: `content-align-body-dates-stay block !text-[--color-base]`,
        tag: `tag !text-[--color-base]`,
        text: `text description-capital`,
        ul: `flex flex-col items-start self-stretch gap-[12px]`
      },
      list: {
        body: `content-list-body flex flex-col items-start justify-center self-stretch gap-[20px] px-[20px] py-[40px] md:flex-[1_0_0] md:rounded-[10px] md:p-[50px] xl:p-[3vw]`,
        buttons: `content-list-body-buttons flex flex-col justify-center self-stretch gap-[20px] mt-[20px] lg:flex-row lg:justify-start xl:items-start xl:items-stretch`,
        content: `content-list-content md:flex md:justify-center md:items-start md:gap-[20px] xl:justify-between xl:items-stretch`,
        dates: `content-list-body-dates`,
        image: `content-list-image overflow-hidden h-[60vw] md:rounded-t-[10px] md:h-[40vw] md:w-[40vw] md:rounded-b-[10px] xl:shrink-0`,
        layout: `content-list -mx-[20px] md:-mx-[10vw] xl:mx-[0px] md:px-[100px] xl:px-[0px] py-[50px] md:py-[60px] xl:py-[5vw] 2xl:py-[100px]`,
        li: ``,
        list: ``,
        more: ``,
        book: `content-list-body-dates-book block`,
        stay: `content-list-body-dates-stay block`,
        tag: `tag !text-[--color-base]`,
        text: `text`,
        title: `xl:!text-[30px]`,
        ul: ``
      }
    }
  }
})

const { t, locale } = useI18n()
const boolMore = ref(false)
const layout = ref(props.layout.split('-').join(''))
const randNumber = ref(Math.random().toString(36).substring(2, 11))
const totalList = ref(0)
const initialGap = ref(0)
const totalGap = ref(0)
const contentAlign = ref(null)
const modal = useState('modal')
const itemsList = computed(() => props.list ? props.list.split('\n') : [] )

const countList = () => {
  if (itemsList.value?.length > 0) {
    totalList.value = 0
    contentAlign.value?.querySelectorAll('.content-align-body-list li')?.forEach((el, i) => {
        totalList.value = totalList.value + (el.clientHeight / 27)
        totalList.value <= 4 && (initialGap.value = i + 1)
        totalGap.value = i + 1
      })
  }
}

const buttonsCSS = computed(() => {
  const css = {
    '2xl:flex-0': true,
    'xl:px-0 2xl:px-[16px]': props.layout === 'list',
    '2xl:flex-[1_0_0]': props.layout === 'list' && props.btnltext && props.btnrtext
  }
  return css
})

const formatDate = (dateFrom, dateTo, textStart, textEnd) => {
  moment.locale(locale.value)
  return (dateFrom && dateTo) || (textStart && dateTo) || (dateFrom && textEnd) || (textStart && textEnd) ? `${(textStart || (moment(dateFrom).format('ll') + ' -') || '') } ${ !textStart || !textEnd ? '' : '' } ${(textEnd || moment(dateTo).format('ll') || '') }` : false
}

const openModalButton = () => {
  modal.value = props.showmodal && ((!props.btnlexternal && !props.btnlinternal && !props.btnlmodal) || (!props.btnrexternal && !props.btnrinternal && !props.btnrmodal)) ?
                  { type: 'ModalCarousel',
                    current: 0,
                    data: [{
                      title: props.titlemodal,
                      shortDescription: props.description,
                      largeDescription: props.largedescription,
                      media: props.media
                    }],
                    position: false
                  } : ''
}

onMounted(() => {
  if (props.layout === 'align' && !props.disableviewmore) {
    countList()
    window.addEventListener('resize', countList)
  }
})
onUnmounted(() => {
  if (props.layout === 'align' && !props.disableviewmore) {
    window.removeEventListener('resize', countList)
  }
})
</script>

<template>
  <div :class="[css[layout].layout]" v-if="showDatesRanged(startdate, enddate)" ref="contentAlign">
    <div :class="[css[layout].content, align === 'right' ? 'md:flex-row-reverse' : '']">
      <div :class="[css[layout].image, imageaspec && layout !== 'list' ? 'h-[100vw] md:h-[53.5vw] md:w-[40vw] lg:h-[40vw] lg:w-[30vw]' : 'h-[75vw] md:h-[30vw] md:w-[40vw]']">
        <VideoStrapi v-if="media && media.mime.includes('video')" :video="media" class="h-full w-full object-cover" />
        <ImageStrapi v-else class="h-full w-full" :fit="true" :parallax="layout === 'align'" borderRadius :image="media" />
      </div>
      <div :class="css[layout].body">
        <input v-if="layout !== 'list' && list && totalList > 4"
               type="checkbox"
               :id="`chkCA-${randNumber}`"
               class="hidden">
        <div v-if="layout !== 'list'">
          <div class="flex flex-col gap-[20px]" >
            <label v-if="tag && layout === 'align'" :class="css[layout].tag"> {{ tag }} </label>
            <h2 v-if="title" :class="css[layout].title"> {{ title }} </h2>
          </div>
        </div>
        <div class="flex flex-col gap-[20px]" v-else>
          <label v-if="tag && layout === 'list'" :class="css[layout].tag"> {{ tag }} </label>
          <h2 v-if="title" :class="css[layout].title"> {{ title }} </h2>
        </div>
        <div v-if="description">
          <div v-if="layout !== 'list'">
            <p :class="css[layout].text" v-html="useParseText(description)" />
          </div>
          <div v-else>
            <p :class="css[layout].text" v-html="useParseText(description)" />
          </div>
        </div>
        <div v-if="layout !== 'list' && list"
             :style="{
              '--initial-gap': initialGap,
              '--initial-list': totalList >= 4 ? 4 : totalList,
              '--total-gap': totalGap,
              '--total-list': totalList
             }"
             :class="[css[layout].list, totalList <= 4 ? 'after:!opacity-0' : '', disableviewmore ? '!h-auto' : '']">
          <ul :class="css[layout].ul">
            <li v-for="(item, index) in itemsList" :key="index"
                :class="[css[layout].li, iconlist === 'bullet' ? `before:content-[''] before:h-[3px] before:w-[3px] before:rounded-[100%] before:min-w-[3px]` : '']">
              <Icon v-if="iconlist === 'check'"
                    variant="check-circle"
                    class="h-[16px] w-[16px] xl:h-[24px] xl:w-[24px]" /> <p v-html="useParseText(item)" class="description-capital" />
            </li>
          </ul>
        </div>
        <label v-if="layout !== 'list' && list && totalList > 4 && !disableviewmore" :for="`chkCA-${randNumber}`" :class="css[layout].more" @click="boolMore = !boolMore">
          <Icon variant="chevron-down" class="w-[1rem] h-[1rem]" />
          <Transition name="more-less" mode="out-in">
            <span v-if="boolMore"> {{ viewless || t('less') }} </span>
            <span v-else> {{ viewmore || t('more') }} </span>
          </Transition>
        </label>
        <div v-if="(formatDate(bookfrom, bookto, bookstart, textbookto) || formatDate(stayfrom, stayto, staystart, textstayto))" :class="css[layout].dates">
          <label v-if="formatDate(bookfrom, bookto, bookstart, textbookto)" :class="css[layout].book">
            <span class="text-[--decorative-color]"> {{ textbook || t('book') }} </span> {{ formatDate(bookfrom, bookto, bookstart, textbookto) }}
          </label>
          <label v-if="formatDate(stayfrom, stayto, staystart, textstayto)" :class="css[layout].stay">
            <span class="text-[--decorative-color]"> {{ textstay || t('stay') }} </span> {{ formatDate(stayfrom, stayto, staystart, textstayto) }}
          </label>
        </div>
        <label v-if="disclaimer" class="note capital" v-html="useParseText(disclaimer)" />
        <div v-if="layout !== 'list' && (btnltext || btnrtext)" class="w-full">
          <div :class="css[layout].buttons">
            <Button v-if="btnltext"
                    variant="secondary"
                    :buttonInternalLink="btnlinternal"
                    :buttonExternalLink="btnlexternal"
                    :buttonModal="btnlmodal"
                    @click="openModalButton()"
                    :class="buttonsCSS">{{ btnltext }}</Button>
            <Button v-if="btnrtext"
                    variant="primary"
                    :buttonInternalLink="btnrinternal"
                    :buttonExternalLink="btnrexternal"
                    :buttonModal="btnrmodal"
                    @click="openModalButton()"
                    :class="buttonsCSS">{{ btnrtext }}</Button>
          </div>
        </div>
        <div v-else-if="btnltext || btnrtext" :class="css[layout].buttons">
          <Button v-if="btnltext"
                    variant="secondary"
                    :buttonInternalLink="btnlinternal"
                    :buttonExternalLink="btnlexternal"
                    :buttonModal="btnlmodal"
                    @click="openModalButton()"
                    :class="buttonsCSS">{{ btnltext }}</Button>
          <Button v-if="btnrtext"
                  variant="primary"
                  :buttonInternalLink="btnrinternal"
                  :buttonExternalLink="btnrexternal"
                  :buttonModal="btnrmodal"
                  @click="openModalButton()"
                  :class="buttonsCSS">{{ btnrtext }}</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-align {
  $self: &;
  $initial-list: var(--initial-list);
  $total-list: var(--total-list);
  $line-height: 27px;
  $gap: 12px;
  $initial-gap: var(--initial-gap);
  $total-gap: var(--total-gap);
  &-#{body} {
    &-#{list} {
      transition-delay: 0.2s;
      transition: height 0.5s ease-in-out;
      height: calc(($initial-list * $line-height) + (($initial-gap * $gap) - $gap));
      &:after {
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.0) 0%, $page-bg 66.67%);
        opacity: 1;
        transition-delay: 0s;
        transition: all 0.4s linear;
      }
      ul {
        li {
          &:before {
            background-color: $decorative-color;
          }
          .icon-container {
            :deep(.icon) {
              height: 16px;
              width: 16px;
              @media screen and (min-width: $xl) {
                height: 24px;
                width: 24px;
              }
              path {
                stroke: $decorative-color;
                fill: $decorative-color;
              }
            }
          }
        }
      }
    }
    label {
      color: $btn-link;
      transition: all 0.5s;
      &:hover {
        @media screen and (min-width: $xl) {
          color: $btn-link-hover;
          .icon-container {
            :deep(.icon) {
              path {
                stroke: $btn-link-hover;;
                fill: $btn-link-hover;;
              }
            }
          }
        }
      }
      .icon-container {
        transition: transform 0.3s ease-in-out;
        :deep(.icon) {
          path {
            transition: all 0.5s;
            stroke: $btn-link;
            fill: $btn-link;
          }
        }
      }
      .more-less-enter-active,
      .more-less-leave-active {
        transition: opacity 0.4s ease;
      }
      .more-less-enter-from,
      .more-less-leave-to {
        opacity: 0;
      }
    }
    input[type="checkbox"] {
      &:checked {
        ~.content-align-body-list {
          transition-delay: 0s;
          height: calc(($total-list * $line-height) + (($total-gap * $gap) - $gap));
          &:after {
            height: 0px;
            opacity: 0;
            transition-delay: 0.5s;
          }
        }
        ~ label {
          .icon-container {
            transform: rotate(180deg);
          }
        }
      }
    }
    &-#{buttons} {
      @media screen and (min-width: $lg) {
        :deep(.button) {
          width: 50%;
          padding-left: 16px;
          padding-right: 16px;
        }
      }
      @media screen and (min-width: $xxl) {
        :deep(.button) {
          width: auto;
          padding-left: 48px;
          padding-right: 48px;
        }
      }
    }
  }
}
.content-list {
  $self: &;
  &-#{image} {
    border-radius: 10px 10px 0 0;
    @media screen and (min-width: $md) {
      border-radius: $border-radius-m;      
    }
    @media screen and (min-width: $xl) {
      height: 35vw;
      width: 50vw;
    }
  }
  &-#{body} {
    background: $filter-first;
    &-#{buttons} {
      @media screen and (min-width: $lg) {
        :deep(.button) {
          width: 50%;
          padding-left: 16px;
          padding-right: 16px;
        }
      }
      @media screen and (min-width: $xxl) {
        :deep(.button) {
          width: auto;
          padding-left: 48px;
          padding-right: 48px;
        }
      }
    }
  }
}
.content-list,
.content-align {
  .text {
    :deep(a) {
      color: $btn-link;
      text-decoration: underline;
      text-underline-offset: 3px;
      text-decoration-thickness: 1px;
      &:hover {
        @media screen and (min-width: $lg) {
          color: $btn-link-hover;
        }
      }
    }
  }
}
[data-theme='dark'] {
  .content-align-body-list::after {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, $black 60%) !important;
  }
}
</style>
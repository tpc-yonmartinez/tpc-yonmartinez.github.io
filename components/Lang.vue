<script setup>
import { defineAsyncComponent, computed, ref } from 'vue'
import { useI18n } from '#imports'
import { useState, navigateTo } from '#app'

const Icon = defineAsyncComponent(() => import('./Icon.vue'))

const { locale, locales, defaultLocale, setLocaleCookie } = useI18n()

const open = useState('lang'),
      localizations = useState('localizations'),
      collection = useState('collection'),
      loading = useState('loading'),
      slocale = useState('locale'),
      languages = ref(null),
      formattedLocales = locales.value.map(item => ({
          code: item.code,
          name: item.name,
          iso: item.iso
        }))

const props = defineProps({
    dropdown: {
      type: Boolean,
      default: false
    },
    inline: {
      type: Boolean,
      default: false
    },
    hiddenCurrent: {
      type: Boolean,
      default: false
    },
    disableCurrent: {
      type: Boolean,
      default: false
    },
    withIcon: {
      type: Boolean,
      default: false
    },
    show: {
      type: String,
      default: true,
      validator: (value) => {
        return ['code', 'name', 'iso'].includes(value)
      }
    },
    pipeline: {
      type: Boolean,
      default: false
    },
    uppercase: {
      type: Boolean,
      default: false
    },
    capitalize: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: ''
    }
  })

const openSelect = (status = false) => open.value = status
const updateLocale = async (code) => {
    if (code === locale.value) return

    loading.value = { bool: true, request: false }
    const newUrl = ref('')

    if (localizations.value?.length) {
      const translate = localizations.value.find(item => item.locale === code)
        const newSlugTranslated = ('slug' in translate) ? (translate?.slug?.slug || '') : collection.value === '' ? '' : translate?.slug?.slug
        newUrl.value += `/${ code !== defaultLocale ? code : '' }${ code !== defaultLocale && newSlugTranslated ? '/' : '' }${ newSlugTranslated }`
    } else {
      newUrl.value += `/${ code !== defaultLocale ? code : '' }`
    }

    try {
      setLocaleCookie(code)
      slocale.value = code
      navigateTo(newUrl.value)
    } catch (err) {
      console.error('[Lang] Error:', err)
    }
  }
const openOtherLink = (url) => {
    window.open(url, '_blank')
    openSelect()
  }

const availableLocales = formattedLocales

const langCSS = computed(() => {
    const css = {
      'languages relative': true,
      'dropdown': props.dropdown,
      'inline-lang w-full': props.inline,
      'footer flex-1': props.position === 'footer',
      'nav-side': props.position === 'nav-side',
    }
    return css
  })
const selectedCSS = computed(() => {
    const css = {
      'lang p-[12px_6px] flex gap-[10px] items-center cursor-pointer transition-all ease-in-out': true,
      'bg-black/90 rounded-[5px_5px_0px_0px]': props.dropdown && open.value,
      'border-l border-r border-t border-white/10': props.dropdown && open.value,
    }
    return css
  })
const contentContainerCSS = computed(() => {
    const css = {
      'absolute left-0 top-full z-[1] bg-black/90 p-[16px_32px] rounded-[0px_0px_5px_5px] w-max': props.dropdown && open.value,
      'border border-white/10': props.dropdown && open.value,
      'w-full': !props.dropdown,
    }
    return css
  })
</script>

<template>
  <div ref="languages" :class="langCSS">
    <div v-if="dropdown"
         @click="openSelect(!open)"
         :class="selectedCSS">
      <Icon v-if="withIcon"
            variant="global"
            :class="{
                'lang__icon w-[16px] h-[16px]': true,
                '[&_svg_path]:!fill-white': open && dropdown,
              }" />
      <p :class="{
              'capital !uppercase lang__selected': true,
              '!text-white': open && dropdown,
            }">{{ locale }}</p>
    </div>
    <div v-if="open || !dropdown"
         :class="contentContainerCSS">
      <div v-if="dropdown"
           :class="{
                'grid gap-x-[60px] gap-y-[20px]': true,
                'grid-rows-2': availableLocales?.length <= 3,
                'grid-cols-3': availableLocales?.length > 3,
              }">
        <span v-for="(lang, i) in availableLocales"
           :key="i"
           @click="lang?.url ? openOtherLink(lang.url) : updateLocale(lang.code)"
           :title="lang.name"
           :class="{
              'note whitespace-normal break-words cursor-pointer': true,
              '!text-white': dropdown && open,
              'underline underline-offset-[5px] decoration-1': locale === lang.code,
            }">{{ lang[show] }}</span>
      </div>
      <div v-else
           :class="{
              'flex flex-wrap': true,
              'gap-x-[30px] justify-end': position === 'footer',
              'gap-y-[10px]': position === 'footer' || position === 'nav-side',
              'gap-x-[16px]': position === 'nav-side' || inline,
            }">
        <div v-for="(lang, i) in availableLocales"
             :key="i"
             :class="{
                'flex items-center gap-[16px]': position === 'nav-side' || inline,
                'hidden': locale === lang.code && hiddenCurrent,
                'pointer-events-none font-semibold': locale === lang && inline,
              }"
             :title="lang.name">
          <p @click="lang?.url ? openOtherLink(lang.url) : updateLocale(lang.code)"
              :class="{
                  'cursor-pointer': true,
                  '!capitalize': capitalize,
                  '!uppercase': uppercase,
                  '!font-semibold': lang.code === locale
                }">{{ lang[show] }}</p>
          <label v-if="pipeline && i !== (availableLocales?.length - 1)">|</label>
        </div>
      </div>
    </div>
  </div>
</template>
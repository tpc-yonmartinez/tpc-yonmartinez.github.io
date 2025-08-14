<script setup>
import { defineAsyncComponent } from 'vue'
// import { useLocalePath } from '#imports'

// import { openModalButton } from '../composables/utils.js'
// import { useNuxtApp } from '#app'

// const { $goTo: goTo } = useNuxtApp()
// const localePath = useLocalePath()
const Icon = defineAsyncComponent(() => import('./Icon.vue'))

const props = defineProps({
    variant: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'xl'
    },
    roundedStyle: {
      type: Boolean,
      default: false
    },
    buttonExternalLink: {
      type: String,
      default: ''
    },
    buttonInternalLink: {
      type: Object,
      default: null
    },
    buttonModal: {
      type: Object,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    iconClass: {
      type: String,
      default: ''
    },
    parent: {
      type: String,
      default: ''
    },
    arialabel: {
      type: String,
      default: 'Link'
    },
    css: {
      type: Object,
      default: {
        'primary': 'button-primary !text-[--btn-text-dark] bg-[--btn-primary] hover:bg-[--btn-primary-hover] active:bg-[--btn-primary-active] active:scale-[0.94] disabled:hover:bg-[--btn-primary] disabled:active:bg-[--btn-primary] disabled:active:scale-100',
        'secondary': 'button-secondary [&_svg:not(.icon--tripadvisor)_path]:fill-[--btn-text] [&_svg:not(.icon--tripadvisor)_path]:stroke-[--btn-text] relative !text-[--btn-text] bg-white/0 before:content-[""] before:absolute before:left-0 before:top-0 before:h-full before:w-full before:border-solid before:border-[1px] before:border-[--btn-text] before:rounded-[5px] hover:bg-[--btn-secondary-hover] active:bg-[--btn-secondary-active] active:scale-[0.94] disabled:hover:bg-white/0 disabled:active:bg-white/0 disabled:active:scale-100',
        'primary-ghost': 'button-primary-ghost !text-[--btn-text-dark] bg-white/0 relative before:content-[""] before:absolute before:left-0 before:top-0 before:h-full before:w-full before:border-solid before:border-[1px] before:border-[--btn-text-dark] before:rounded-[5px] hover:bg-white/10 active:bg-white/20 active:scale-[0.94] disabled:hover:bg-white/0 disabled:active:bg-white/0 disabled:active:scale-100',
        'exception-ghost': 'button-exception-ghost !text-[--btn-text] bg-[--btn-exeption-ghost] hover:bg-[--btn-exeption-ghost-hover] active:bg-[--btn-exeption-ghost-active] active:scale-[0.94] disabled:hover:bg-[--btn-exeption-ghost] disabled:active:bg-[--btn-exeption-ghost] disabled:active:scale-100',
        'text': 'button-text [&_svg:not(.icon--tripadvisor)_path]:fill-[--btn-link] [&_svg:not(.icon--tripadvisor)_path]:stroke-[--btn-link] [&_svg_path]:transition-[all] [&_svg_path]:duration-150 text-[--btn-link] underline underline-offset-[4px] hover:text-[--btn-link-hover] [&_svg:not(.icon--tripadvisor)_path]:hover:fill-[--btn-link-hover] [&_svg:not(.icon--tripadvisor)_path]:hover:stroke-[--btn-link-hover] disabled:hover:text-[--btn-link] [&_svg_path]:disabled:hover:fill-[--btn-link]',
        'text-ghost': 'button-text-ghost [&_svg:not(.icon--tripadvisor)_path]:fill-[--btn-link-dark] [&_svg:not(.icon--tripadvisor)_path]:stroke-[--btn-link-dark] [&_svg_path]:transition-[all] [&_svg_path]:duration-150 underline underline-offset-[4px] text-[--btn-link-dark] hover:text-[--btn-link-dark-hover] [&_svg:not(.icon--tripadvisor)_path]:hover:fill-[--btn-link-dark-hover] [&_svg:not(.icon--tripadvisor)_path]:hover:stroke-[--btn-link-dark-hover] disabled:hover:text-[--btn-link-dark] [&_svg_path]:disabled:hover:fill-[--btn-link-dark]',
        'text-alt': 'button-text-alternative [&_svg:not(.icon--tripadvisor)_path]:fill-[--btn-text] [&_svg:not(.icon--tripadvisor)_path]:stroke-[--btn-text] [&_svg_path]:transition-[all] [&_svg_path]:duration-150 text-[--btn-text] underline underline-offset-[9px] hover:text-[--btn-link] [&_svg:not(.icon--tripadvisor)_path]:hover:fill-[--btn-link] [&_svg:not(.icon--tripadvisor)_path]:hover:stroke-[--btn-link] disabled:hover:text-[--btn-link] [&_svg_path]:disabled:hover:fill-[--btn-link]',
        'circle-ghost-left': 'button-circle-ghost-left',
        'circle-ghost-right': 'button-circle-ghost-right',
        'static': 'button-static [&_svg:not(.icon--tripadvisor)_path]:fill-black [&_svg:not(.icon--tripadvisor)_path]:stroke-black text-black w-auto disabled:hover:text-black',
        'alternative': 'button-alternative !text-[--btn-text-alternative] bg-[--btn-alternative] hover:bg-[--btn-alternative-hover] active:bg-[--btn-alternative-active] active:scale-[0.94] disabled:hover:bg-[--btn-alternative] disabled:active:bg-[--btn-alternative] disabled:active:scale-100',
        'alternative-booking': 'button-alternative-booking bg-[--blue] hover:bg-[--blue-hover] active:bg-[--blue-active] active:scale-[0.94] disabled:!opacity-100 disabled:bg-[--blue] disabled:text-[--blue] disabled:hover:bg-[--blue] disabled:active:bg-[--blue] disabled:active:scale-100'
      }
    }
  })

const emit = defineEmits(['click'])

const onClick = () => {
  alert('Button clicked')
  // props.buttonModal ? openModalButton(props.buttonModal.modalName, props.buttonModal.id) : emit('click')
}
</script>

<template>
  <NuxtLink v-if="buttonInternalLink || buttonExternalLink"
            :to="buttonExternalLink"
            :target="buttonInternalLink ? '_self' : '_blank'"
            :aria-label="arialabel"
            data-nosnippet="true"
            :class="[
              'button flex justify-center items-center gap-[8px] text-center font-normal disabled:opacity-40',
              css[variant],
              {
                'transition-[all] duration-150': ['alternative-booking', 'alternative', 'exception-ghost', 'primary-ghost', 'primary', 'secondary', 'text'].includes(variant),
                'text-[--btn-text-dark] [&_svg:not(.icon--tripadvisor)_path]:fill-[--btn-text-dark] [&_svg:not(.icon--tripadvisor)_path]:stroke-[--btn-text-dark]': ['alternative-booking', 'alternative', 'exception-ghost', 'primary-ghost', 'primary'].includes(variant),
                'rounded-[5px] py-[18px] px-[28px] 2xl:px-[48px]': ['alternative-booking', 'alternative', 'exception-ghost', 'primary-ghost', 'primary', 'secondary'].includes(variant),
                'rounded-[30px]': roundedStyle && ['alternative-booking', 'alternative', 'exception-ghost', 'primary-ghost', 'primary', 'secondary'].includes(variant),
                'before:rounded-[30px]': roundedStyle && ['primary-ghost', 'secondary'].includes(variant)
              }
            ]">
    <Icon v-if="icon" :variant="icon" :class="['icon-button h-[16px] w-[16px]', iconClass]" />
    <slot />
  </NuxtLink>
  <button v-else :disabled="disabled" @click="onClick" data-nosnippet="true"
  :class="[
    css[variant],
    'button flex justify-center items-center gap-[8px] text-center font-normal disabled:opacity-40',
    {
      'transition-[all] duration-150': ['alternative-booking', 'alternative', 'exception-ghost', 'primary-ghost', 'primary', 'secondary', 'text'].includes(variant),
      'text-[--btn-text-dark] [&_svg:not(.icon--tripadvisor)_path]:fill-[--btn-text-dark] [&_svg:not(.icon--tripadvisor)_path]:stroke-[--btn-text-dark]': ['alternative-booking', 'alternative', 'exception-ghost', 'primary-ghost', 'primary'].includes(variant),
      'rounded-[5px] py-[18px] px-[28px] 2xl:px-[48px]': ['alternative-booking', 'alternative', 'exception-ghost', 'primary-ghost', 'primary', 'secondary'].includes(variant),
      'rounded-[30px]': roundedStyle && ['alternative-booking', 'alternative', 'exception-ghost', 'primary-ghost', 'primary', 'secondary'].includes(variant),
      'before:rounded-[30px]': roundedStyle && ['primary-ghost', 'secondary'].includes(variant)
    }
  ]">
    <Icon v-if="icon" :variant="icon" :class="['icon-button h-[16px] w-[16px]', iconClass]" />
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.button {
  $self: &;
  &:before {
    width: calc(100% - 1px);
  }
}
</style>
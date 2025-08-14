<script setup>
import { defineAsyncComponent, computed } from 'vue';
import { useState } from '#app'

const Button = defineAsyncComponent(() => import('./Button.vue'))
const modal = useState('modal')
const modalRoom = useState('modalRoom')

const props = defineProps({
    current: {
      type: Number,
      default: 0
    },
    data: {
      type: [Array, Object],
      default: null
    },
    images: {
      type: Array,
      default: null
    },
    position: {
      type: Boolean,
      default: false
    },
    modalglobal: {
      type: Object,
      default: null
    },
    type: {
      type: String,
      default: 'ModalCarousel'
    }
  })

const closeModal = () => {
  props.type != 'ModalRoom'
    ? modal.value = {type: null, current: null, data: null}
    : modalRoom.value = {type: null, data: null}
}

const modalDialogCSS = computed(() => ({
  'modal-dialog fixed top-0 left-0 z-[1] h-full w-full bg-[--page-bg]': true,
  '!bg-black/60': props.type === 'ModalAlert',
  '!bg-transparent': props.type !== 'ModalCarousel'
}))
const modalContentCSS = computed(() => ({
  'modal-content flex flex-row shrink-0 max-[639px]:flex-col sm:flex-col min-[769px]:flex-row items-start place-content-between h-full': true,
  'items-center justify-center': props.type === 'ModalAlert'
}))
const modalBackdropCSS = computed(() => ({
  'modal-backdrop fixed top-0 left-0 h-full w-full bg-white': true,
  '!bg-black/6': props.type === 'ModalAlert',
  'min-[769px]:!bg-black/80': props.type !== 'ModalCarousel'
}))
</script>

<template>
  <div class="modal fixed top-0 left-0 z-[8] h-full w-full">
    <div :class="modalDialogCSS">
      <div :class="modalContentCSS">
        <div
          v-if="type !== 'ModalAlert'"
          :class="[
            'modal-close max-[768px]:flex max-[768px]:flex-row max-[768px]:w-full max-[768px]:justify-end min-[769px]:absolute min-[769px]:top-0 min-[769px]:right-0 min-[769px]:p-[50px] p-5 min-[1025px]:p-[60px] z-[1]',
            {'max-[768px]:bg-[--page-bg]': type !== 'ModalCarousel'},
            {'!w-full': type === 'ModalRoom'},
            {'min-[769px]:flex min-[769px]:justify-end min-[769px]:w-[45%] min-[769px]:bg-[--page-bg] min-[769px]:!p-[40px]': type !== 'ModalCarousel'}]">
          <Button variant="static" icon="close" @click="closeModal()" iconClass="!h-[32px] !w-[32px]" arialabel="Close Modal"/>
        </div>
        <component :is="type" :data="data" :current="current" :modalglobal="modalglobal" :positionBottom="position"></component>
      </div>
    </div>
    <div :class="modalBackdropCSS"></div>
  </div>
</template>
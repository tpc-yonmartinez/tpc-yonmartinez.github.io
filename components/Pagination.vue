<script setup>
import { defineAsyncComponent, computed, getCurrentInstance } from 'vue'
import { useState } from '#app'

const Button = defineAsyncComponent(() => import('./Button.vue'))
const BodyText = defineAsyncComponent(() => import('./BodyText.vue'))

const headerSize = useState('headerSize')
const emit = defineEmits(['changePage'])

const props = defineProps({
  perpage: {
    type: Number,
    default: 9
  },
  totalpages: {
    type: Number,
    default: 1
  },
  currentpage: {
    type: Number,
    default: 1
  },
  parent: {
    type: String,
    default: ''
  }
})

const instance = getCurrentInstance()

const wPage = computed(() => Math.ceil(props.totalpages / props.perpage))

const positionElement = computed(() => {
    const parentsList = {
        galleryGrid: instance.parent?.parent?.refs?.galleryGrid,
        contentGrid: instance.parent?.parent?.refs?.contentGrid,
        catalog: instance.parent?.parent?.refs?.catalog
      }
    return parentsList[props.parent]?.querySelector('.scroll-t')?.offsetTop
  })

const btnPreviousPage = () => {
  if (props.currentpage > 1) {
    emit('changePage', props.currentpage - 1)
    window.scrollTo({ top: positionElement.value - headerSize.value })
  }
}

const btnNextPage = () => {
  if (props.currentpage < props.totalpages) {
    emit('changePage', props.currentpage + 1)
    window.scrollTo({ top: positionElement.value - headerSize.value })
  }
}

const changePageNum = (page) => {
  if (page >= 1 && page <= wPage.value) {
    emit('changePage', page)
    window.scrollTo({ top: positionElement.value - headerSize.value })
  }
}

const visiblePages = computed(() =>
    wPage.value <= 5 ? // if we have less than 5 pages, show all
      Array.from({length: wPage.value}, (_, i) => i + 1) :
        props.currentpage <= 3 ?
          [ ...Array.from({length: 5}, (_, i) => i + 1), '...', wPage.value ] :
            props.currentpage >= wPage.value - 2 ?
              [ 1, '...', ...Array.from({length: 5}, (_, i) => wPage.value - 4 + i) ] :
                [ 1, '...', props.currentpage - 1, props.currentpage, props.currentpage + 1, '...', wPage.value ]
  )

const btnArrowLeftCSS = computed(() => {
    return {
      'pagination__disabled': (props.currentpage <= 1),
      'h-[64px] w-[64px]': true
    }
  })

const btnArrowRightCSS = computed(() => {
  return {
    'pagination__disabled': (props.currentpage >= wPage.value),
    'h-[64px] w-[64px]': true
  }
})
</script>

<template>
  <div v-if="wPage > 1" class="pagination w-full flex justify-center">
    <div class="flex flex-row gap-[40px]">
      <div class="h-[64px] w-[64px]">
        <Button @click="btnPreviousPage"
                :class="btnArrowLeftCSS"
                variant="circle-ghost-left"
                arialabel="Previous Page"
                :disabled="currentpage <= 1 ? true : false"
                icon="chevron-left"
                iconClass="!h-[24px] !w-[24px]" />
      </div>
      <div class="pagination__numbers hidden md:flex justify-center items-center h-full">
        <ul class="flex items-center gap-[10px]">
          <li v-for="(page, index) in visiblePages" :key="index">
            <NuxtLink @click="changePageNum(page)" :class="page === currentpage || page === '...' ? 'disabled !opacity-100' : 'cursor-pointer'">
              <BodyText :class="['flex justify-center items-center h-[40px] w-[40px]', page === currentpage ? '!bg-[--header-ham-bg] !rounded-full text-[--header-ham-text]' : '']" wrapper="p">{{ page }}</BodyText>
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="pagination__numbers flex md:hidden justify-center items-center h-full">
          {{ currentpage }} / {{ wPage }}
      </div>      
      <div class="h-[64px] w-[64px]">
        <Button @click="btnNextPage"
                :class="btnArrowRightCSS"
                variant="circle-ghost-right"
                arialabel="Next Page"
                :disabled="currentpage >= wPage ? true : false"
                icon="chevron-right"
                iconClass="!h-[24px] !w-[24px]" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  &__disabled {
    opacity: 0.3;
  }
}
</style>
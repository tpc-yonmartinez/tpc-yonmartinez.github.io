<script setup>
import { defineAsyncComponent, computed } from 'vue'
import { showDatesRanged } from '../composables/utils.js'

// const Fade = defineAsyncComponent(() => import('./animations/Fade.client.vue'))
const CardContentColum = defineAsyncComponent(() => import('./CardContentColum.vue'))
const Button = defineAsyncComponent(() => import('./Button.vue'))

const props = defineProps({
  startDate: {
    type: String,
    default: ''
  },
  endDate: {
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
  btnText: {
    type: String,
    default: ''
  },
  btninternal: {
    type: Object,
    default: null
  },
  btnExternal: {
    type: String,
    default: ''
  },
  btnmodal: {
    type: Object,
    default: null
  },
  cards: {
    type: Array,
    default: () => ([])
  },
  decorativeLine: {
    type: Boolean,
    default: true
  },
  bgColor: {
    type: Boolean,
    default: false
  }
})

const twoCols = computed(() => props.btnText && props.cards?.length > 2)

const textContainerCSS = computed(() => {
    return {
      'content-colum__text flex flex-col gap-[30px] md:gap-[40px] text-center': true,
      'md:w-[60%] md:title-line--start': twoCols.value,
      'md:w-[55vw] md:m-auto': !twoCols.value
    }
  })
const titleCSS = computed(() => {
    return {
      'content-colum__title': true,
      'md:flex md:flex-start': twoCols.value
    }
  })
const textCSS = computed(() => {
    return {
      'md:text-left': twoCols.value,
      'md:text-center': !twoCols.value
    }
  })
const cardsCSS = computed(() => {
    return {
      'content-colum__cards flex flex-col md:flex-row align-center md:order-[2] gap-[40px] md:gap-[50px] w-full': true,
      'content-colum--2col': props.cards?.length > 2
    }
  })
</script>

<template>
  <div v-if="showDatesRanged(startDate, endDate)" :class="['content-colum flex flex-col md:flex-row md:flex-wrap md:justify-between py-[50px] gap-[40px] lg:gap-[60px] md:py-[60px] lx:py-[5vw] 2xl:py-[100px]', { 'bg_color bg-[--color-base-alt] px-[20px] md:px-[10vw]': bgColor }]">
    <div v-if="title || description" :class="textContainerCSS">
      <div v-if="title">
        <div :class="titleCSS">
          <h2 :class="textCSS"> {{ title }} </h2>
        </div>
      </div>
      <p v-if="description" :class="textCSS"> {{ description }} </p>
    </div>
    <div :class="cardsCSS">
      <CardContentColum v-for="(card, i) in cards"
                        :key="i"
                        :title="card.title"
                        :description="card.description"
                        :disclaimer="card.disclaimer"
                        :tag="card.tag"
                        :date="card.date"
                        :media="card?.media"
                        :btnText="card.btnText"
                        :btnInternal="card.btninternal"
                        :btnExternal="card.btnExternal"
                        :btnModal="card.btnmodal"
                        :cols="cards?.length" />
    </div>
    <div v-if="twoCols" class="content-colum__button flex flex-column md:w-fit md:order-[1] items-end justify-center">
      <Button variant="secondary"
              :buttonInternalLink="btninternal"
              :buttonExternalLink="btnExternal"
              :buttonModal="btnmodal">{{ btnText }}</Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
[data-theme='dark'] {
  .content-colum.bg_color {
    background: $black;
  }
}
</style>
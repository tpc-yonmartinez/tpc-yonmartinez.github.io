<script setup>
import { computed } from 'vue'
//import { showDatesRanged } from '../composables/utils.js'

const props = defineProps({
  stylecomponent: {
    type: String,
    default: 'Default'
  },
  cards: {
    type: Array,
    default: () => []
  },
  enablebg: {
    type: Boolean,
    default: false
  }
})

const filtercards = computed(() => {
  const newcard = props.cards.filter(card => showDatesRanged(card.startdate, card.enddate))
  return props.stylecomponent === 'Colum' ? newcard.slice(0, 3) : newcard
})
</script>

<template>
  <div :class="[
    `content-group group`,
    {
      'column-three': filtercards.length === 3 && stylecomponent === 'Colum',
      'column-two': filtercards.length === 2 && stylecomponent === 'Colum',
      'column-one': filtercards.length === 1 && stylecomponent === 'Colum',
      'flex-col md:!gap-[40px] lg:justify-center lg:!gap-[16px] lg:flex-row': filtercards.length > 2 && stylecomponent === 'Colum',
      'flex-col lg:justify-center md:flex-row md:!gap-[20px] lg:!gap-[24px]': filtercards.length <= 2 && stylecomponent === 'Colum',
      'flex-col': filtercards.length <= 1 && stylecomponent === 'Colum',
      'flex-col justify-center items-center': stylecomponent === 'Default',
      'bg-[--white-alternative]': enablebg && ['Colum', 'Default', 'List'].includes(stylecomponent),
    },
    `flex ${['List'].includes(stylecomponent) ? 'flex-col md:!gap-[40px] lg:justify-center lg:!gap-[60px]' : ''} gap-[40px] py-[50px] px-[20px] md:gap-[60px] md:py-[60px] lg:gap-[100px] lg:py-[100px] xl:px-0`,
  ]">
    <div v-for="(item, i) in filtercards"
    :key="i"
    :class="`content-group-${stylecomponent && stylecomponent !== 'Default' && stylecomponent.toLowerCase() || 'item'} group-[.column-two]:lg:max-w-[588px] group-[.column-three]:lg:max-w-[392px] [&.content-group-list]:lg:flex [&.content-group-list]:lg:justify-center`">
      <component :is="`group${stylecomponent || 'Default'}`"
      :title="item.title"
      :totalcards="filtercards.length"
      :tag="item.tag"
      :description="item.description"
      :media="item.media"
      :textbook="item.textbook"
      :booktextstart="item.bookstart"
      :bookfrom="item.bookfrom"
      :booktextend="item.textbookto"
      :bookto="item.bookto"
      :textstay="item.textstay"
      :staytextstart="item.staystart"
      :stayfrom="item.stayfrom"
      :staytextend="item.textstayto"
      :stayto="item.stayto"
      :btnltext="item.btnltext"
      :btnlinternal="item.btnlinternal"
      :btnlexternal="item.btnlexternal"
      :btnlmodal="item.btnlmodal"
      :btnrtext="item.btnrtext"
      :btnrinternal="item.btnrinternal"
      :btnrexternal="item.btnrexternal"
      :btnrmodal="item.btnrmodal"
      :disclaimer="item.disclaimer"
      :decorativeline="item.decorativeline"
      :playvideo="item.playvideo"
      :enableicon="item.enableicon"
      :align="item.align"
      class="max-w-[1200px]" />
    </div>
  </div>
</template>

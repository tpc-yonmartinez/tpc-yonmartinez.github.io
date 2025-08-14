<script setup>
import { defineAsyncComponent, ref, nextTick, watch } from 'vue'
//import { useI18n, useLocalePath } from '#imports'
//import { onClickOutside, useMediaQuery } from '@vueuse/core'

const Icon = defineAsyncComponent(() => import('../Icon.vue'))

const inputSelectRef = ref(null),
      selectContainer = ref(null),
      inputSelect = ref(false),
      model = defineModel(),
      { t } = useI18n(),
      error = ref(false)
     // localPath = useLocalePath()

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  showInput: {
    type: Boolean,
    default: true
  },
  hiddenInput: {
    type: Boolean,
    default: false
  },
  id: {
    type: Number,
    default: 0
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  list: {
    type: Array,
    default: () => []
  },
  sumitproperties: {
    type: Array,
    default: () => []
  },
  conditionlist: {
    type: String,
    default: ''
  },
  linkInternal: {
    type: Object,
    default: () => {}
  },
  resetlist: {
    type: Boolean,
    default: false
  }
})

const stateSelec = (state) => {
  model.value = state
  openOptionList(false)
}

const openOptionList = (open) => {
  nextTick(() => {
    inputSelect.value = open
    open ? inputSelectRef.value.focus() : inputSelectRef.value.blur()
  })
}

const onBlur = () => {
  error.value = !!!model.value
}

const clickOutside = () => {
  openOptionList(false)
  error.value = !!!model.value
}

onClickOutside(selectContainer, clickOutside)

watch(() => model.value, (val) => {
  error.value = !!!model.value
})
</script>

<template>
  <Transition name="input-fade">
    <div v-if="!hiddenInput && showInput" ref="selectContainer" class="input__select flex flex-col gap-[10px] relative">
      <div class="relative">
        <div @click="openOptionList(!inputSelect)" class="input__select__container cursor-pointer relative flex items-center flex-row gap-[10px] lg:rounded-[0px] overflow-hidden">
          <input  id="input-select"
                  ref="inputSelectRef"
                  placeholder=""
                  v-model="model"
                  @blur="onBlur()"
                  type="search"
                  readonly
                  class="cursor-pointer" />
          <label>{{ placeholder }}</label>
          <Icon variant="chevron-down" :class="['input__select__container__icon h-[16px] w-[16px] absolute right-[20px] top-[50%] transition-all duration-500 -translate-y-1/2', {'rotate-180': inputSelect }]" />
        </div>
        <Transition name="inputselec">
          <div v-if="inputSelect" class="select-list absolute w-full bg-[--inputs-bg] max-h-[350px] lg:h-fit lg:max-h-[50vh] overflow-y-auto flex flex-col gap-[0px] py-[10px] px-[0px] z-[3]">
            <BodyText wrapper="label" class="option opacity-50 w-full capitalize cursor-pointer p-[12px] lg:px-[32px]" @click="stateSelec()" v-if="resetlist">{{ t('catalog.list') }}</BodyText>
            <div @click="stateSelec(item)" v-for="(item, j) in list" :key="j" class="option cursor-pointer flex flex-row gap-[10px] p-[12px] lg:px-[32px]">
              <NuxtLink v-if="linkInternal && linkInternal[item]"
                        :to="localPath(`/${linkInternal[item]}`)"
                        class="flex-1">
                <label class="item-name flex-1 capital cursor-pointer">{{ item }}</label>
              </NuxtLink>
              <label v-else class="item-name flex-1 capital cursor-pointer">{{ item }}</label>
            </div>
          </div>
        </Transition>
      </div>
      <span class="note capital message-error text-[--error]" v-if="required && error"> {{ t('rfp.required') }} </span>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.inputselec-enter-active,
.inputselec-leave-active {
  @media screen and (max-width: $lg) {
    height: 100%;
  }
  transition: all 0.5s ease;
}
.inputselec-enter-from,
.inputselec-leave-to {
  @media screen and (max-width: $lg) {
    height: 0;
  }
  opacity: 0;
}
.input__select {
  &__container {
    input {
      border: 1px solid $inputs-border;
      background: $inputs-bg;
      border-radius: $radius-s;
      width: 100%;
      height: $inputs-height;
      padding: 9px 20px;
      &:focus {
        outline: none !important;
        border-color: $inputs-focus;
      }
      input[type="search"] {
        -webkit-appearance: none;
      }
      &[type="search"] {
        -webkit-appearance: none;
        appearance: none;
      }
      &:focus,
      &:not(:placeholder-shown) {
        padding-top: 27px;
        outline: none;
      }
      &:not(:placeholder-shown) ~ label {
        top: 9px;
        font-size: $inputs-label-size;
      }
    }
    label {
      color: $inputs-text;
      font-size: $inputs-text-size;
      text-transform: none;
      position: absolute;
      pointer-events: none;
      left: 20px;
      top: 20px;
      transition: 0.2s ease all;
      -moz-transition: 0.2s ease all;
      -webkit-transition: 0.2s ease all;
    }
    input:focus, input:not(:placeholder-shown) {
      padding-top: 27px;
    }
    input:not(:placeholder-shown) ~ label {
      top: 9px;
      font-size: 10px;
    }
    &__icon {
      :deep(svg) {
        path {
          stroke: $inputs-text;
        }
      }
    }
  }
  .select-list {
    border-left: 1px solid $inputs-border;
    border-right: 1px solid $inputs-border;
    border-bottom: 1px solid $inputs-border;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    .option {
      &:hover {
        background: $inputs-border;
      }
    }
  }
}
</style>
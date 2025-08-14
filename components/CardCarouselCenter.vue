<script setup>
import { defineAsyncComponent } from 'vue'
// import { useMediaQuery } from '@vueuse/core'

const ImageStrapi = defineAsyncComponent(() => import('./ImageStrapi.vue'))
const Button = defineAsyncComponent(() => import('./Button.vue'))

// const isDesktop = useMediaQuery('(min-width: 768px)')
const isDesktop = true

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  tag: {
    type: String,
    default: ''
  },
  btnText: {
    type: String,
    default: ''
  },
  urlinternal: {
    type: Object,
    default: null
  },
  urlExternal: {
    type: String,
    default: ''
  },
  modal: {
    type: Object,
    default: null
  },
  media: {
    type: Object,
    default: null
  },
  backgroundcolor: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div :class="['card-carousel-center flex flex-col md:block w-full h-full md:relative', {'bgcolor_card': backgroundcolor}]">
    <div>
      <ImageStrapi :image="media" fit borderRadius class="card-carousel-center__images w-full h-[207px] md:h-full" />
    </div>
    <div class="card-carousel-center__cards gap-[20px] pt-[30px] px-[20px] h-full flex flex-col md:items-center md:justify-end md:!h-full md:w-full md:absolute md:top-0 md:left-0 md:p-[0px] md:overflow-hidden">
      <div class="card-carousel-center__content flex flex-col items-center gap-[30px] md:pb-[50px] xl:pb-[60px] text-center">
        <div class="md:h-[70px] justify-end flex flex-col gap-[10px]">
          <label v-if="tag"> {{ tag }} </label>
          <h3> {{ title }} </h3>
        </div>
        <p v-if="description" class="card-carousel-center__content__desc"> {{ description }} </p>
        <ClientOnly>
          <Button variant="primary-ghost"
                  class="card-carousel-center__content__btn"
                  :buttonInternalLink="urlinternal"
                  :buttonExternalLink="urlExternal"
                  :buttonModal="modal"
                  v-if="btnText && isDesktop">{{ btnText }}</Button>
        </ClientOnly>
      </div>
      <ClientOnly>
        <div v-if="!isDesktop" class="btn-mobile">
          <Button v-if="btnText"
                  variant="secondary"
                  class="card-carousel-center__content__btn w-full"
                  :buttonInternalLink="urlinternal"
                  :buttonExternalLink="urlExternal"
                  :buttonModal="modal">{{ btnText }}</Button>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-carousel-center {
  $self: &;
  &__images {
    :deep(img) {
      border-radius: $border-radius-m;
    }
    @media screen and (min-width: $md) {
      &::after,
      &::before {
        position: absolute;
        content: "";
        border-radius: $border-radius-m;
        height: 100%;
        right: 0;
        bottom: 0;
        left: 0;
      }
      &::before {
        opacity: 0;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.70) 51.04%);
        transition: opacity 300ms ease-in-out;
      }
      &::after {
        opacity: 1;
        background: linear-gradient(180deg, rgba($black, 0) 50%, $black 100%, $black 100%);
        transition: opacity 500ms ease-in-out;
      }
    }
    @media screen and (min-width: $lg) {
      height: 40vw;
      width: 100%;
    }
  }
  &__content {
    @media screen and (min-width: $md) {
      color: $white;
      gap: 40px;
      transform: translateY(calc(100% - 5rem));
      transition: transform 1.4s cubic-bezier(0.19, 1, 0.22, 1), gap 0.2s linear 1.4ms;
      width: 72.5%;
    }
    @media screen and (min-width: $xl) {
      gap: 70px;
      transform: translateY(calc(100% - 6.5rem));
      width: 37.5%;
    }
    :deep() {
      label {
        color: $title-principal;
        @media screen and (min-width: $md) {
          color: $white;
        }
      }
      h3 {
        color: $title-principal;
        @media screen and (min-width: $md) {
          color: $white;
        }
      }
      .button {
        width: 100%;
        @media screen and (min-width: $md) {
          width: auto;
        }
      }
    }
  }
  &:hover {
    #{$self}__content {
      @media screen and (min-width: $md) {
        gap: 20px;
        transform: translateY(0);
      }
    }
    #{$self}__images {
      &::before {
        opacity: 1;
      }
      &::after {
        opacity: 0;
      }
    }
  }
}
.btn-mobile {
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.bgcolor_card {
  :deep() {
    .card-carousel-center__images {
      @media screen and (min-width: $md) {
        &::after {
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 46.35%, rgba(0, 0, 0, 0.70) 100%);
        }
      }
    }
  }
}
</style>
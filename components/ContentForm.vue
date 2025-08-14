<script setup>
import { defineAsyncComponent } from 'vue'

// const FormEmbed = defineAsyncComponent(() => import('./FormEmbed.vue'))
const ImageStrapi = defineAsyncComponent(() => import('./ImageStrapi.vue'))

const props = defineProps({
  media: {
    type: Object,
    default: null
  },
  title: {
    type: String,
    default: ''
  },
  region: {
    type: String,
    default: ''
  },
  formId: {
    type: String,
    default: ''
  },
  portalId: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="content-form flex flex-col items-center justify-center gap-[40px] lg:gap-[60px] py-[50px] md:py-[60px] xl:py-[5vw] 2xl:py-[100px] px-0 md:px-[100px] xl:px-[288px]">
    <div v-if="media" class="content-form__image">
      <ImageStrapi :image="media" fit/>
    </div>
    <div class="content-form__content flex flex-col items-center justify-center gap-[30px] md:gap-[40px] py-0">
      <h2 v-if="title" class="text-center xl:w-[50vw] xl:m-auto"> {{ title }} </h2>
      <div class="content-form__forms">
        <form-embed :region="region" :formId="formId" :portalId="portalId" :timer="true" parent="form" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content-form {
  margin: 0 calc($padding-container-s * -1);
  @media screen and (min-width: $md) {
    margin: 0 calc($padding-container-m * -1);
  }
  &__image {
    width: 100%;
    height: 100%;
    :deep(img) {
      height: 320px !important;
      @media screen and (min-width: $md) {
        height: 42.5vw !important;
        border-radius: $border-radius-m;
      }
      @media screen and (min-width: $lg) {
        height: 30vw !important;
      }
    }
  }
  &__forms {
    padding: 20px;
    @media screen and (min-width: $md) {
      padding: 20px 15vw;
    }
    @media screen and (min-width: $lg) {
      padding: 20px 20vw;
    }
    @media screen and (min-width: $xl) {
      padding: 20px 15vw;
    }
    :deep() {
      .hs-submit {
        margin-top: 20px;
        .actions {
          width: 100% !important;
          text-align: center;
          @media screen and (min-width: $md) {
            width: fit-content !important;
          }
          input {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
<script setup>
import { defineAsyncComponent, ref, computed } from 'vue'
//import { useI18n } from '#imports'

const ImageStrapi = defineAsyncComponent(() => import('../ImageStrapi.vue'))
const Wysiwyg = defineAsyncComponent(() => import('../Wysiwyg.vue'))
const FormEmbed = defineAsyncComponent(() => import('../FormEmbed.vue'))
const Button = defineAsyncComponent(() => import('../Button.vue'))
const Icon = defineAsyncComponent(() => import('../Icon.vue'))

const props = defineProps({
  data: {
    type: Array,
    default: null
  },
  current: {
    type: Number,
    default: 0
  },
  positionBottom: {
    type: Boolean,
    default: false
  },
  modalglobal: {
    type: Object,
    default: null
  }
})

const actionChange = ref(''),
      currentItem = ref(props.current),
      disabledNavigation = ref(false),
      step = ref(1),
      { t } = useI18n()

const formatList = (list) => list ? list.split('\n') : []

const socialnetwork = computed(() => {
  const contact = props.data[currentItem.value].contactinfo
  if (!contact) return []

  const networks = [
    { url: contact.facebook, icon: 'facebook' },
    { url: contact.twitter, icon: 'twitter' },
    { url: contact.instagram, icon: 'instagram' },
    { url: contact.youtube, icon: 'youtube' },
    { url: contact.tiktok, icon: 'tiktok' },
    { url: contact.pinterest, icon: 'pinterest' },
    { url: contact.linkedin, icon: 'linkedin' }
  ]

  return networks.filter(network => network.url && network.url.trim() !== '')
})

const beforeLeave = (element) => {
  element.querySelector('.carousel-media').classList.remove('modal-service-next', 'modal-service-prev')
  element.querySelector('.carousel-media').classList.add(`modal-service-${actionChange.value}`)
  disabledNavigation.value = true
}

const afterLeave = () => {
  setTimeout(() => {
    disabledNavigation.value = false
  }, 300)
}

const onChange = (action = '') => {
  actionChange.value = action
  currentItem.value = (action === 'next') ? (currentItem.value < props.data.length - 1 ? currentItem.value + 1 : 0) : (currentItem.value > 0 ? currentItem.value - 1 : props.data.length - 1)
  disabledNavigation.value = true
  step.value = 1
}

const classDirection = computed(() => ({
  [`modal-service-${actionChange.value}`]: actionChange.value
}))
</script>

<template>
    <TransitionGroup name="modal-service" :duration="{ enter: 1000, leave: 700 }" :on-before-leave="beforeLeave" :on-after-leave="afterLeave" tag="div" :class="['modal-service flex grow relative w-full min-[769px]:h-full', disabledNavigation ? 'overflow-hidden' : 'overflow-y-auto']">
    <div v-for="index in [currentItem]" :key="index" class="modal-service-card max-[768px]:flex-col min-[769px]:flex min-[769px]:flex-row w-full">
      <div :class="['modal-service-card-image relative overflow-hidden min-[769px]:flex', positionBottom ? 'min-[769px]:w-3/4' : 'min-[769px]:w-[55%]']">
        <ImageStrapi :fit="true" :class="['carousel-media max-[768px]:h-full min-[769px]:w-full', classDirection]" :image="data[currentItem].media[0]" />
      </div>
      <div :class="['modal-service-card-content flex flex-col p-10 gap-[30px] self-stretch min-[769px]:overflow-y-auto min-[769px]:pt-[132px] min-[769px]:pb-0 md:px-[5vw]', positionBottom ? 'min-[769px]:w-1/4 min-[769px]:flex-col-reverse md:px-[5vw]' : 'min-[769px]:w-[45%] xl:px-[5vw] min-[1025px]:pt-[152px]']">
        <Transition name="fade-in" mode="out-in">
          <div v-if="step === 1" class="modal-service-card-content-step-1 flex flex-col gap-[30px]">
            <h2 v-if="data[currentItem].servicetitle" :class="['!text-[--title-alt] max-[768px]:!text-2xl min-[769px]:!text-base min-[1025px]:!text-2xl', positionBottom ? 'min-[769px]:order-2' : 'min-[1025px]:!text-[38px]']"> {{ data[currentItem].servicetitle }} </h2>
            <Wysiwyg v-if="data[currentItem].descriptionmodal || data[currentItem].servicedescription"
                     :class="{ '!p-0 [&_.markdown]:!w-full': true, 'min-[769px]:order-1': positionBottom }"
                     :wysiwyg="data[currentItem].descriptionmodal || data[currentItem].servicedescription" />
            <div class="flex flex-col gap-[20px] empty:hidden">
              <div v-if="data[currentItem].contactinfo?.contact || data[currentItem].contactinfo?.titlecontact || data[currentItem].contactinfo?.schedules || data[currentItem].contactinfo?.titleschedule" class="moreinfo flex flex-col gap-[20px]">
                <div v-if="data[currentItem].contactinfo?.contact || data[currentItem].contactinfo?.titlecontact" class="flex flex-col gap-[10px]">
                  <label v-if="data[currentItem].contactinfo?.titlecontact" class="strong"> {{ data[currentItem].contactinfo?.titlecontact }} </label>
                  <ul v-if="data[currentItem].contactinfo?.contact">
                    <li v-for="(phone, i) in formatList(data[currentItem].contactinfo?.contact)"> {{ phone }} </li>
                  </ul>
                </div>
                <div v-if="data[currentItem].contactinfo?.schedules || data[currentItem].contactinfo?.titleschedule" class="flex flex-col gap-[10px]">
                  <label v-if="data[currentItem].contactinfo?.titleschedule" class="strong"> {{ data[currentItem].contactinfo?.titleschedule }} </label>
                  <ul v-if="data[currentItem].contactinfo?.schedules">
                    <li v-for="(hr, i) in formatList(data[currentItem].contactinfo?.schedules)"> {{ hr }} </li>
                  </ul>
                </div>
              </div>
              <div v-if="data[currentItem].contactinfo?.titlesocial || (socialnetwork && socialnetwork.length > 0)" class="socialnetwork flex flex-col gap-[10px]">
                <label v-if="data[currentItem].contactinfo?.titlesocial" class="strong"> {{ data[currentItem].contactinfo?.titlesocial }} </label>
                <div class="flex gap-[15px] md:gap-[30px] flex-wrap">
                  <a v-for="(social, i) in socialnetwork" :key="i" :href="social.url" target="_blank"> <Icon :variant="social.icon" class="h-[24px] w-[24px]" /> </a>
                </div>
              </div>
              <div v-if="data[currentItem].contactinfo?.btntextweb || data[currentItem].contactinfo?.btntextemail" class="website flex gap-[40px] flex-wrap">
                <a v-if="data[currentItem].contactinfo?.btntextemail" class="strong flex gap-[4px] items-center underline underline-offset-[3px] text-[--btn-link] hover:text-[--btn-link-hover] [&_svg_path]:!fill-[--btn-link] [&_svg_path]:hover:!fill-[--btn-link-hover]" :href="data[currentItem].contactinfo?.email" target="_blank"> <Icon variant="mail" class="h-[16px] w-[16px]" /> {{ data[currentItem].contactinfo?.btntextemail }} </a>
                <a v-if="data[currentItem].contactinfo?.btntextweb" class="strong flex gap-[4px] items-center underline underline-offset-[3px] text-[--btn-link] hover:text-[--btn-link-hover] [&_svg_path]:!fill-[--btn-link] [&_svg_path]:hover:!fill-[--btn-link-hover]" :href="data[currentItem].contactinfo?.website" target="_blank"> <Icon variant="external_link" class="h-[16px] w-[16px]" /> {{ data[currentItem].contactinfo?.btntextweb }} </a>
                <a v-if="data[currentItem].contactinfo?.btntextother" class="strong flex gap-[4px] items-center underline underline-offset-[3px] text-[--btn-link] hover:text-[--btn-link-hover] [&_svg_path]:!fill-[--btn-link] [&_svg_path]:hover:!fill-[--btn-link-hover]" :href="data[currentItem].contactinfo?.otherlink" target="_blank"> <Icon variant="external_link" class="h-[16px] w-[16px]" /> {{ data[currentItem].contactinfo?.btntextother }} </a>
              </div>
            </div>
            <Button @click="step = 2" v-if="modalglobal?.embedform?.formid" class="!w-fit"> {{ modalglobal?.btntext || t('catalog.modal.button') }} </Button>
          </div>
          <div v-else-if="step === 2" :class="['flex flex-col overflow-y-auto gap-[20px] h-auto']">
            <Button @click="step = 1"
                    class="!w-fit no-underline !text-[--color-base] !hover:text-[--color-base] [&_svg:not(.icon--tripadvisor)_path]:fill-[--color-base] [&_svg:not(.icon--tripadvisor)_path]:stroke-[--color-base] [&_svg:not(.icon--tripadvisor)_path]:hover:fill-[--color-base] [&_svg:not(.icon--tripadvisor)_path]:hover:stroke-[--color-base]"
                    :variant="'text'">
                    <Icon variant="chevron-left" :class="['icon-button h-[16px] w-[16px]']" />
              {{ t('catalog.modal.back') }}
            </Button>
            <h2 v-if="modalglobal?.embedform?.title"> {{ modalglobal?.embedform?.title }} </h2>
            <FormEmbed :region="modalglobal?.embedform?.region" :form-id="modalglobal?.embedform?.formid" :portal-id="modalglobal?.embedform?.portalid" parent="form" class="md:mt-[20px]" />
          </div>
        </Transition>
      </div>
    </div>
  </TransitionGroup>
  <div v-if="data.length > 1" :class="['modal-service-arrow py-[30px] px-[40px] w-full flex gap-[20px] min-[769px]:absolute min-[769px]:bottom-0 min-[769px]:right-0 min-[769px]:justify-start md:px-[50px]', positionBottom ? 'min-[769px]:w-1/4 md:px-[4vw] lg:px-[5vw]' : 'min-[769px]:w-[45%] md:px-[5vw]']">
    <Button variant="circle-ghost-left"
            icon="slide-chevron-prev"
            :disabled="disabledNavigation"
            @click="onChange('prev')"
            iconClass="!h-[64px] !w-[64px]" />
    <Button variant="circle-ghost-right"
            icon="slide-chevron-next"
            :disabled="disabledNavigation"
            @click="onChange('next')"
            iconClass="!h-[64px] !w-[64px]" />
  </div>
</template>

<style lang="scss" scoped>
.modal-service-leave-active,
.modal-service-leave-to {
  z-index: 3;
  position: absolute;
  @media screen and (min-width: $md) {
    left: 0;
    top: 0;
    height: 100%;
  }
}
.modal-service-enter-active,
.modal-service-enter-to {
  position: relative;
  z-index: 2;
}
.modal-service-leave-active .modal-service-next,
.modal-service-enter-active .modal-service-next,
.modal-service-leave-active .modal-service-prev,
.modal-service-enter-active .modal-service-prev {
  transition: ease-in-out 0.7s;
}
.modal-service-leave-active .modal-service-next {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}
.modal-service-leave-to .modal-service-next {
  clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
}
.modal-service-leave-active .modal-service-prev {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}
.modal-service-leave-to .modal-service-prev {
  clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
}
.modal-service-enter-active .modal-service-next {
  transform: translate(0px, 0px) scale(1.2, 1.2);
}
.modal-service-enter-to .modal-service-next {
  transform: translate(0px, 0px) scale(1, 1);
}
.modal-service-enter-active .modal-service-prev {
  transform: translate(0px, 0px) scale(1.2, 1.2);
}
.modal-service-enter-to .modal-service-prev {
  transform: translate(0px, 0px) scale(1, 1);
}
.modal-service-leave-active .modal-service-card-content,
.modal-service-enter-active .modal-service-card-content {
  transition: ease-in-out 0.7s;
}
.modal-service-leave-active .modal-service-card-content {
  opacity: 1;
  transform: translate(0px, 0px);
}
.modal-service-leave-to .modal-service-card-content {
  opacity: 0;
  transform: translate(0px, 22px);
}
.modal-service-enter-active .modal-service-card-content {
  opacity: 0;
  transition-delay: 0.3s;
  transform: translate(0px, 22px);
}
.modal-service-enter-to .modal-service-card-content {
  opacity: 1;
  transform: translate(0px, 0px);
}
.modal-service {
  background: $page-bg;
  &-#{card} {
    &-#{image} {
      @media screen and (max-width: $md) {
        height: 60vw;
      }
    }
    &-#{content} {
      @media screen and (min-width: 769px) {
        height: calc(100% - 44px);
      }
    }
  }
  &-#{arrow} {
    background: $page-bg;
  }
}
</style>
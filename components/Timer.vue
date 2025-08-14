<script setup>
import { onMounted, onBeforeMount, onUnmounted, ref } from 'vue'
import { useI18n } from '#imports'

const { t } = useI18n()

const props = defineProps({
  date: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  },
  theme: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: ''
  },
  styles: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['visibility'])

const now = ref(new Date().getTime()),
      countDownDate = ref(new Date(props.date).getTime()),
      timeleft = ref(countDownDate.value - now.value),
      days = ref(0),
      hours = ref(0),
      minutes = ref(0),
      seconds = ref(0),
      interval = ref(null)

const timer = () => {
  now.value = new Date().getTime()
  timeleft.value = countDownDate.value - now.value
  days.value = Math.floor(timeleft.value / (1000 * 60 * 60 * 24))
  hours.value = Math.floor((timeleft.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  minutes.value = Math.floor((timeleft.value % (1000 * 60 * 60)) / (1000 * 60))
  seconds.value = Math.floor((timeleft.value % (1000 * 60)) / 1000)
}

onBeforeMount(() => {
  if (timeleft.value > 0) {
    clearInterval(interval.value)
    emit('visibility', false)
  } else {
    timer()
  }
})

onMounted(() => {
  interval.value = setInterval(timer, 1000)
})

onUnmounted(() => {
  clearInterval(interval.value)
})
</script>

<template>
  <div v-if="timeleft > 0" :class="['timer w-[280px]', `timer--${size}`]">
    <div :class="['timer__layout p-[10px] w-full relative flex rounded-[5px]', `timer__layout--${theme}`]">
      <div class="timer__content w-full flex flex-col justify-center gap-[10px]">
        <div class="note timer__text text-center"> {{ text }} </div>
        <div :class="'timer__numbers w-full flex flex-row justify-center gap-[20px] text-center', `timer__numbers--${theme}`">
          <div class="timer__number">
            <div class="h3"> {{ days }} </div>
            <div class="note capital"> {{ t('timer.day') }} </div>
          </div>
          <div class="timer__number">
            <div class="h3"> {{ hours }} </div>
            <div class="note capital"> {{ t('timer.hour') }} </div>
          </div>
          <div class="timer__number">
            <div class="h3"> {{ minutes }} </div>
            <div class="note capital"> {{ t('timer.min') }} </div>
          </div>
          <div class="timer__number">
            <div class="h3"> {{ seconds }} </div>
            <div class="note capital"> {{ t('timer.sec') }} </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.timer {
  $self: &;
  &--big {
    width: 100%;
    #{$self}__numbers {
      gap: 10px;
      .timer__number {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: $border-radius;
        width: 70px;
        height: 70px;
        .h3 {
          font-size: 32px;
        }
        div {
          font-size: 12px;
        }
        @media screen and (min-width: $md) {
          width: 90px;
          height: 90px;
          .h3 {
            font-size: 40px;
          }
        }
        @media screen and (min-width: $xxl) {
          .h3 {
            font-size: 48px;
          }
        }
      }
    }
    #{$self}__layout {
      background: transparent;
      backdrop-filter: none;
      box-shadow: none;
      #{$self}__text {
        color: $color-base;
      }
      #{$self}__numbers {
        .timer__number {
          background: #666666;
          border: 1px solid #666666;
        }
      }
      &--light {
        #{$self}__numbers {
          .timer__number {
            background: $bg-box;
            border: 1px solid $border-color;
          }
        }
      }
      &--dark {
        #{$self}__numbers {
          .timer__number {
            background: #272527;
            border: none;
          }
        }
      }
    }
  }
  &__layout {
    background: rgba(71, 71, 71, 0.70);
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.07);
    &--dark {
      background: linear-gradient(105deg, rgba(0, 0, 0, 0.70) 25.71%, rgba(0, 0, 0, 0.60) 77.66%);
      backdrop-filter: blur(5px);
    }
    &--light {
      background: linear-gradient(104deg, rgba(255, 255, 255, 0.40) 26.71%, rgba(255, 255, 255, 0.10) 79.02%);
      backdrop-filter: blur(5px);
      #{$self}__text,
      #{$self}__numbers {
        color: $color-base;
        .h3 {
          color: $color-base;
        }
      }
    }
  }
  &__text,
  &__numbers {
    color: $white;
    .h3 {
      color: $white;
    }
  }
}
</style>
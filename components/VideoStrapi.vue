<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import ImageStrapi from './ImageStrapi.vue'

const videoRef = ref(null)

const props = defineProps({
    video: {
      type: Object,
      default: null
    },
    initplay: {
      type: Boolean,
      default: false
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    loop: {
      type: Boolean,
      default: true
    },
    muted: {
      type: Boolean,
      default: true
    },
    playsinline: {
      type: Boolean,
      default: true
    },
    controls: {
      type: Boolean,
      default: false
    },
    poster: {
      type: String,
      default: ''
    },
    preload: {
      type: String,
      default: 'auto'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    thumbnail: {
      type: String,
      default: ''
    },
    playOnClick: {
      type: Boolean,
      default: false
    },
    checkAudio: {
      type: Boolean,
      default: false
    }
  })

const emits = defineEmits(['play', 'hasaudio'])

const startPlaying = () => {
    emits('play', true)
  }
const pausePlaying = () => {
    emits('play', false)
  }
const endedPlaying = () => {
    emits('play', false)
  }
const play = () => {
    if (props.autoplay) return
    videoRef.value.paused ? videoRef.value.play() : videoRef.value.pause()
  }
const thumbnailStart = computed(() => {
    return props.thumbnail ? `#t=${props.thumbnail}` : ''
  })
const videoUrl = computed(() => {
    return `${props.video.url}${thumbnailStart.value}`
  })
const posterUrl = computed(() => {
    return props.poster || ''
  })

const hasAudio = (_video) => {
  return (_video.mozHasAudio || Boolean(_video.webkitAudioDecodedByteCount) || Boolean(_video.audioTracks?.length))
}

const checkHasAudio = () => {
  const _video = document.createElement('video')
  _video.muted = true
  _video.crossOrigin = 'anonymous'
  _video.preload = 'auto'

  return new Promise((resolve, reject) => {
    _video.addEventListener('error', reject)

    _video.addEventListener(
      'canplay',
      () => {
        _video.currentTime = 0.99
      },
      { once: true } // Important because 'canplay' can be fired hundreds of times.
    )

    _video.addEventListener('seeked', () => resolve(hasAudio(_video)), {
      once: true,
    })

    _video.src = videoUrl.value
  })
}

const events = ref({
  play: startPlaying,
  pause: pausePlaying,
  ended: endedPlaying
})

if (props.playOnClick) {
  events.value['click'] = play
}

onMounted(async () => {
  if (props.checkAudio) {
    const hasAudio = await checkHasAudio().then((hasAudio) => {
      return hasAudio
    }).catch(() => {
      return false
    })

    emits('hasaudio', hasAudio)
  }
})
onBeforeUnmount(() => {
  if (videoRef.value) {
    videoRef.value.pause()
    videoRef.value.currentTime = 0
    videoRef.value.muted = true
    videoRef.value.autoplay = false
    videoRef.value.loop = false
  
    videoRef.value.removeAttribute('src')
    videoRef.value.load()
  }
})

watch(() => props.initplay, () => {
  !props.autoplay && props.initplay ? videoRef.value.play() : videoRef.value.pause()
})
</script>

<template>
  <video v-if="video"
         ref="videoRef"
         :preload="preload"
         loading="lazy"
         :playsinline="playsinline"
         :autoplay="autoplay"
         :initplay="initplay"
         :loop="loop"
         :muted="muted"
         :controls="controls"
         :poster="posterUrl"
         v-on="events">
    <p>Your browser doesn't support HTML5 video</p>
    <source :src="videoUrl" :type="video.mime">
  </video>
  <ImageStrapi v-else/>
</template>
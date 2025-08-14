<script setup>
import { computed } from 'vue'

const props = defineProps({
    wrapper: {
      type: String,
      default: 'p'
    },
    html: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  })

const bodyTextCSS = computed(() => {
    const css = {
      [`${props.type}`]: props.type
    }
    return css
  })
</script>

<template>
  <p :class="bodyTextCSS" v-html="html" v-if="html && wrapper === 'p'"></p>
  <h2 :class="bodyTextCSS" v-html="html" v-else-if="html && wrapper === 'h2'"></h2>
  <h1 :class="bodyTextCSS" v-html="html" v-else-if="html && wrapper === 'h1'"></h1>
  <component :is="wrapper || 'p'" :class="bodyTextCSS" v-else>
    <slot></slot>
  </component>
</template>
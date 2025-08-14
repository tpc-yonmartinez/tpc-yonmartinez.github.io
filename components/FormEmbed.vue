<script setup>
const props = defineProps({
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
  },
  timer: {
    type: Boolean,
    default: false
  },
  parent: {
    type: String,
    default: 'form'
  }
})

let intervalFormId = 0

const sendData = (arg) => {
  let eventSend = ''
  props.parent == 'form' ? eventSend = 'formSubmit' : eventSend = 'subscribeSubmit'
  window.dataLayer = window.dataLayer || []
  const objSend = { event: eventSend }
  if ( arg.submissionValues.email ) Object.assign(objSend, { email: btoa(arg.submissionValues.email) })
  window.dataLayer.push(objSend)
}

const createForm = () => {
  if (document.getElementById(`form-${props.formId}`)) {
    window.clearInterval(intervalFormId)
    window.hbspt.forms.create({
      region: props.region,
      portalId: props.portalId,
      formId: props.formId,
      target: `#form-${props.formId}`,
      onFormSubmitted: (event , data) => sendData(data)
    })
  }
}

onMounted(() => {
  console.log('Mounted FormEmbed component')
  nextTick(() => {
    window.clearInterval(intervalFormId)

    if (window.hbspt) {
      intervalFormId = window.setInterval(createForm, 500)
    }
  })
})

onUnmounted(() => {
  window.clearInterval(intervalFormId)
  intervalFormId = 0
})
</script>

<template>
  <div class="form-embed">
    <div class="form-embed__content" :id="`form-${formId}`" :key="formId" v-once></div>
  </div>
</template>

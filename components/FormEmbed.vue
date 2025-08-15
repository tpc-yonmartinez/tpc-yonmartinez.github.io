<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue'

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

<style lang="scss" scoped>
.form-embed {
  :deep() {
    $hs: '.hs';
    all: none;
    #{$hs} {
      &-form {
        $f: '.hs-form';
        fieldset {
          display: inline-flex;
          flex-wrap: wrap;
          flex-direction: column;
          gap: 20px;
          width: 100%;
          max-width: 100%;
          margin-bottom: 20px;
          &:last-child,
          &:has(> [style="display: none;"]) {
            display: none;
          }
          @media screen and (min-width: $md) {
            flex-direction: row;
            flex-wrap: nowrap;
          }
          input {
            &[type="checkbox"] {
              width: 30px !important;
              height: 30px !important;
              position: relative;
              padding: 0;
              appearance: none;
              border: 1px solid $inputs-border;
              border-radius: $border-radius-s;
              background: $inputs-bg;
              margin: 0;
              font: inherit;
              color: currentColor;
              transform: translateY(-0.075em);
              display: grid;
              place-content: center;
              &:before {
                content: "";
                width: 11px;
                height: 11px;
                clip-path: polygon(42% 72%, 79% 22%, 83% 27%, 43% 81%, 12% 59%, 17% 53%);
                transform: scale(0);
                transform-origin: top bottom;
                transition: 120ms transform ease-in-out;
                background-color: CanvasText;
              }
              &:checked {
                &:before {
                  transform: scale(2);
                  background: $inputs-focus;
                }
              }
            }
          }
          .hs-dependent-field{
            width: 100%;
          }
        }
        [class^="form-columns-"] {
          &:last-child {
            margin-bottom: 0;
          }
        }
        &-field:not(.hs-numero_de_seguidores_en_tiktok, .hs-numero_de_seguidores_en_instagram__clonado_, .hs-resorts___partners) {
          display: flex;
          flex-wrap: wrap;
          flex-direction: column;
          position: relative;
          margin-bottom: 20px;
          width: 100% !important;
          float: none !important;
          @media screen and (min-width: $md) {
            flex-direction: row;
            gap: 10px;
          }
          &.hs-fieldtype-select {
            label {
              display: none;
            }
          }
          .input {
            margin-right: 0;
            @media screen and (min-width: $md) {
              width: 100%;
            }
          }
          ul.hs-error-msgs > li > label {
            position: relative;
            left: 0;
            top: 0;
            order: 2;
          }
          .hs-error-msgs:has( ~ ul.hs-error-msgs > li > label > a) {
            position: relative;
            order: 1;
          }
          label:not(.hs-form-booleancheckbox-display) {
            position: absolute;
            left: 20px;
            top: 18px;
            font-family: $font-secondary;
            font-size: $inputs-text-size;
            color: $inputs-text;
            transition: all 0.3s ease;
            .hs-form-required {
              margin-left: 2px;
              color: $inputs-text;
            }
            &.hs-error-msg {
              color: $error;
              position: static;
            }            
            &:has(~ .input > input[type="text"]:valid:not(input[value=""])),
            &:has(~ .input > input[type="text"]:not(input[value=""])),
            &:has(~ .input > input[type="text"]:focus),
            &:has(~ .input  input[type="text"]:valid:not(input[value=""])),
            &:has(~ .input  input[type="text"]:not(input[value=""])),            
            &:has(~ .input  input[type="text"]:focus),
            &:has(~ .input > input[type="password"]:valid),
            &:has(~ .input > input[type="password"]:focus),
            &:has(~ .input > input[type="email"]:valid),
            &:has(~ .input > input[type="email"]:invalid:not(input[value=""])),
            &:has(~ .input > input[type="email"]:focus),
            &:has(~ .input > input[type="tel"]:valid),
            &:has(~ .input > input[type="tel"]:focus),
            &:has(~ .input > textarea:focus),
            &:has(~ .input > textarea:valid),
            &:has(~ .input > input[type="number"]:valid:not(input[value=""])),
            &:has(~ .input > input[type="number"]:focus) {
              font-size: $inputs-label-size;
              top: 3px;
            }
          }
          input:not([type="checkbox"]),
          select,
          textarea {
            width: 100% !important;
            padding: 18px 20px;
            border-radius: $border-radius-s;
            border: 1px solid $inputs-border;
            font-family: $font-secondary;
            font-size: $inputs-text-size;
            background: $inputs-bg;
            color: $inputs-text !important;
            font-weight: $font-weight-base;
            &:focus {
              outline: none;
              border-color: $inputs-focus;
            }
          }
          .input:has( > select) {
            height: fit-content;
            position: relative;
            &::after {
              content: '\003E';
              position: absolute;
              top: 50%;
              right: 1rem;
              transform: translate(-50%, -50%) rotate(90deg) scaleY(1.75);
              color: $inputs-text;
              font-size: $inputs-text-size;
              pointer-events: none;
              opacity: .7;
            }
          }
          select {
            cursor: pointer;
            appearance: none;
          }
          input[type="number"]{
            appearance: textfield;
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
              -webkit-appearance: none;
            }
          }
          legend {
            font-size: $inputs-label-size;
            color: $color-base;
            position: absolute;
            top: 100%;
            left: 0;
            transform: translateY(0);
            padding: 0 10px;
          }
        }
        .hs-resorts___partners,
        .hs-numero_de_seguidores_en_tiktok,
        .hs-numero_de_seguidores_en_instagram__clonado_ {
          width: 100%;
          .input {
            margin-top: 15px;
            margin-right: 0px;
            width: 100%;
          }
        }
        ul.multi-container {
          li {
            label {
              display: flex;
              position: relative;
              gap: 10px;
              margin-bottom: 10px;
            }
          }
        }
        .legal-consent-container {
          display: inline-flex;
          flex-wrap: wrap;
          gap: 20px;
          padding: 10px 0 0 0;
          color: $color-base;
          @media screen and (min-width: $md) {
            padding-top: 0;
          }
          label {
            position: static;
            display: inline-flex;
            flex-wrap: wrap;
            input {
              &[type="checkbox"] {
                width: 30px !important;
                height: 30px !important;
                position: relative;
                padding: 0;
                appearance: none;
                border: 1px solid $inputs-border;
                border-radius: $border-radius-s;
                background: $inputs-bg;
                margin: 0;
                font: inherit;
                color: currentColor;
                transform: translateY(-0.075em);
                display: grid;
                place-content: center;
                &:before {
                  content: "";
                  width: 11px;
                  height: 11px;
                  clip-path: polygon(42% 72%, 79% 22%, 83% 27%, 43% 81%, 12% 59%, 17% 53%);
                  transform: scale(0);
                  transform-origin: top bottom;
                  transition: 120ms transform ease-in-out;
                  background-color: $inputs-focus;
                }
                &:checked {
                  border-color: $inputs-focus;
                  &:before {
                    transform: scale(2);
                  }
                }
              }
            }
          }
          a {
            color: $btn-link;
            text-decoration: underline;
            &:hover {
              color: $btn-link-hover;
            }
          }
          input[type="checkbox"] {
            ~* {
              flex: 1;
            }
          }
          .hs-richtext {
            p {
              font-size: $inputs-label-size;
            }
          }
        }
        &-booleancheckbox {
          label {
            position: static;
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            flex-direction: row;
            >span {
              flex: 1;
            }
          }
        }
      }
      &-submit {
        margin-top: 10px;
        font-weight: $font-weight-bold;
        display: flex;
        justify-content: center;
        @media screen and (min-width: $md) {
          margin-top: 0;
          justify-content: flex-start;
        }
        #{$hs}-button {
          padding: 15px;
          position: relative;
          z-index: 1;
          color: $btn-text;
          padding: 18px 48px;
          cursor: pointer;
          transition: color .2s ease-in-out;
          @media screen and (min-width: $md) {
            width: auto;
          }
        }
        .actions {
          border: 1px solid $btn-text;
          width: fit-content;
          position: relative;
          display: block;
          color: $btn-text;
          background-color: transparent;
          border-radius: $border-radius-embed;
          font-size: $btn-font-size;
          &:hover {
            background: $btn-secondary-hover;
          }
          &:active {
            background: $btn-secondary-active;
          }
        }
      }
      &-recaptcha {
        display: none !important;
      }
    }
  }
}
</style>
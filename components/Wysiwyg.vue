<script setup>
const marked = await import('marked').then(({ marked }) =>
                        marked.use({
                            mangle: false,
                            headerIds: false
                          })
                      )

const props = defineProps({
    wysiwyg: {
      type: String,
      default: ''
    }
  })
</script>

<template>
<div class="wysiwyg py-[50px] md:py-[60px] xl:py-[5vw] 2xl:py-[100px]">
  <div class="markdown w-full xl:w-[50vw] xl:m-auto" v-html="marked(wysiwyg)"></div>
</div>
</template>

<style lang="scss" scoped>
.wysiwyg {
  background-color: #fff;
  .markdown {
    :deep() {
      h1 {
        margin-bottom: 1.667vw;
      }
      h2, h3, h4 {
        margin-bottom: 0;
      }
      small, sup, sub {
        color: $decorative-color;
      }
      p {
        margin-bottom: 1.7em;
        letter-spacing: 0.16px;
        &:has(> sup,sub,small) {
          margin-bottom: 0;
        }
        img {
          height: auto;
        }
      }
      a {
        color: $btn-link;
        text-decoration: underline;
        @media screen and (min-width: $md) {
          &:hover {
            color: $btn-link-hover;
          } 
        }
      }
      ul {
        list-style: outside;
        padding-left: 36px;
        li {
          position: relative;
          margin-bottom: .5em;
        }
        &:has(li input[type="checkbox"]) {
          list-style: none;
          span {
            margin-left: 1em;
          }
        }
      }
      ol {
        padding-left: 1.5em;
        li {
          position: relative;
          margin-bottom: .5em;
        }
        &,
        & ol {
          list-style: decimal inside;
        }
        & ol {
          list-style: lower-alpha inside;
        }
        & ol ol {
          list-style: lower-roman inside;
        }
      }
      [class|="table"] {
        display: flex;
        flex-direction: column-reverse;
      }
      table {
        width: 100%;
        p {
          margin-bottom: 0;
        }
      }
      figcaption {
        margin-top: 1vw;
        background: $bg-box;
        text-align: center;
      }
      [class|="image"] {
        display: flex;
        margin: 50px calc($padding-container-s * -1);
        justify-content: center;
        width: auto;
        @media screen and (min-width: $md) {
          margin: 40px 0;
        }
        @media screen and (min-width: $lg) {
          margin: 60px calc($padding-container-m * -1);
        }
      }
      img {
        flex: 1;
        display: inline;
        width: 100%;
        height: 240px;
        object-fit: cover;
        @media screen and (min-width: $md) {
          height: 100%;
          border-radius: $border-radius-m;
        }
        @media screen and (min-width: $lg) {
          width: 70vw;
        }
      }
      figure[style] {
        display: flex;
        justify-content: center;
        img {
          height: auto;
        }
      }
      [class|="media"] {
        display: block;
        height: auto;
        width: auto;
        margin: 50px calc($padding-container-s * -1);
        @media screen and (min-width: $md) {
          margin: 40px 0;
          video {
            border-radius: $border-radius-m;
          }
        }
        @media screen and (min-width: $xl) {
          width: 70vw;
          margin-top: 60px;
          margin-bottom: 60px;
          margin-left: -10vw;
          margin-right: -10vw;
        }
      }
      code, pre {
        color: $border-color;
        background: #011627;
        border-radius: $border-radius-s;
        padding: 16px 20px;
        overflow: auto;
      }
      code {
        padding: 0px;
      }
      blockquote {
        width: 100%;
        margin: 50px auto;
        padding: 0.833vw 1.667vw;
        border-left: 4px solid $bg-dark;
        position: relative;
        background: $bg-box;
        p {
          margin-bottom: 0;
        }
      }
      mark {
        &.marker-yellow {
          background: #FDfD78;
        }
        &.marker-green,
        &.pen-green {
          background: #62F962;
        }
        &.marker-pink {
          background: #FC799A;
        }
        &.marker-blue {
          background: #72CCFE;
        }
        &.pen-red {
          background: #E81313;
          color: $border-color;
        }
      }
      hr {
        border: 0;
        height: 1px;
        background: $border-color;
        margin: 1.667vw 0;
      }
      figure {
        &.image-inline,
        &.image {
          position: relative;
        }
        &.image {
          clear: both;
          display: table;
          text-align: center;
          margin: 0 auto;
          &.image_resized {
            display: block;
            img {
              width: 100%;
            }
          }
          img {
            display: block;
            margin: 0 auto;
            max-width: 100%;
            min-width: 100%;
            height: auto;
          }
        }
        &.image-style-align-left {
          float: left;
        }
        &.image-style-side,
        &.image-style-align-right {
          float: right;
        }
        &.image-style-block-align-left {
          margin-left: 0;
          margin-right: auto;
        }
        &.image-style-block-align-right {
          margin-left: auto;
          margin-right: 0;
        }
        &.image-style-align-center {
          margin-left: auto;
          margin-right: auto;
        }
      }
      figure[class="table"] {
        thead {
          background: $bg-box;
          th {
            border: 1px solid $border-color !important;
          }
        }
        tbody {
          td {
            border: 1px solid $border-color !important;
          }
        }
      }
      .primary_style,
      .secondary_style {
        position: relative;
        display: inline-block;
        padding: 18px 24px;
        text-align: center;
        font-size: $btn-font-size;
        font-weight: $font-weight-base;
        border-radius: $border-radius-s;
        cursor: pointer;
        text-decoration: none;
      }
      .primary_style {
        background: $btn-primary;
        color: $btn-text-dark !important;
        @media screen and (min-width: $md) {
          &:hover {
            background: $btn-primary-hover;
          }
          &:active {
            background: $btn-primary-active;
          }
        }
      }
      .secondary_style {
        border: 1px solid $btn-text;
        background: transparent;
        color: $btn-text !important;
        @media screen and (min-width: $md) {
          &:hover {
            background: $btn-secondary-hover;
          }
          &:active {
            background: $btn-secondary-active;
          }
        }
      }
      strong {
        font-weight: bold;
      }
    }
  }
}
</style>
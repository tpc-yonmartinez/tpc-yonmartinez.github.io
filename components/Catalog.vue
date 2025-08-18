<script setup>
import { defineAsyncComponent, ref, watch, onMounted } from 'vue'

const Filters = defineAsyncComponent(() => import('./Filters.vue'))

const props = defineProps({
  filters: {
    type: Boolean,
    default: false
  },
  stylecards: {
    type: String,
    default: ''
  },
  categories: {
    type: Array,
    default: null
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  modalglobal: {
    type: Array,
    default: () => []
  },
  modalglobaltext: {
    type: String,
    default: ''
  },
  totalservices: {
    type: Number,
    default: 0
  },
  hotels: {
    type: Array,
    default: () => []
  },
  placeholderserch: {
    type: String,
    default: ''
  },
  placeholderperpage: {
    type: String,
    default: ''
  },
  showperpage: {
    type: Boolean,
    default: true
  },
  searchitem: {
    type: Boolean,
    default: true
  },
  ordercards: {
    type: Boolean,
    default: false
  },
  pagination: {
    type: Boolean,
    default: true
  },
  showiconall: {
    type: Boolean,
    default: false
  },
  data: {
    type: Array,
    default: () => []
  }
})

let filterBy = ref(0)

const { t } = useI18n(),
      currentPage = ref(1),
      dataResponse = ref(props.data),
      sppiner = ref(true),
      reloadFilter = ref(false)

const filterByCategory = (category) => {
  category !== filterBy.value && (currentPage.value = 1)
  filterBy.value = category || null
}

onMounted(() => {
  sppiner.value = false
})

watch(() => filterBy.value, (newFilter) => {
  if (!newFilter) {
    dataResponse.value = props.data
  } else {
    dataResponse.value = props.data.filter(item =>
      // Cambia 'nombre' por la propiedad que quieres filtrar
      item.categories?.find(category => category.includes(newFilter.category))
    )
  }
})
</script>

<template>
  <div ref="catalog" :class="['catalog py-[50px] md:py-[60px] xl:py-[5vw] 2xl:py-[100px] flex flex-col gap-[40px]',
                              {'px-[20px] md:px-[10vw] md:!py-[60px]': stylecards != 'Default'}]">
    <div class="catalog_content scroll-t flex flex-col gap-[40px]">
      <div v-if="categories?.length" class="catalog_content_filter">
        <Filters :categories="categories"
                 @onFilter="filterByCategory"
                 :all="t('gallerygrid.all')"
                 :refresh="reloadFilter"
                 :stylefilter="stylecards"
                 :showiconall="showiconall" />
      </div>
      <div>
        <div v-if="sppiner" class="flex justify-center items-center">
          <div class="sppiner"></div>
        </div>
        <div v-else
             :class="{ 'catalog_content__cards relative flex flex-col gap-[40px]': true,
                        'sm:grid sm:grid-cols-2 lg:grid-cols-3': dataResponse?.length,
                        'sm:gap-x-[10px] sm:gap-y-[40px] md:gap-x-[20px] md:gap-y-[40px]': stylecards === 'Default',
                        '2xl:px-[3.33333vw] sm:gap-x-[20px] lg:gap-x-[32px] md:gap-y-[40px] xl:gap-y-[60px]': stylecards === 'Simple',
                        '2xl:px-[3.80208vw] sm:gap-x-[20px] md:gap-y-[40px]': stylecards === 'Full'
                     }">
          <div v-for="(item, i) in dataResponse" :key="i" >
            <component :is="`Catalog${stylecards || 'Default'}`"
                       :media="item.media"
                       :tag="item.tag"
                       :title="item.servicetitle"
                       :description="item.servicedescription"
                       :btntext="item.btntext"
                       :internal="item.urlinternal"
                       :external="item.urlexternal"
                       :modal="item.modal"
                       :listbenefit="item.listbenefit"
                       :titlebenefits="item.titlebenefits"
                       :remaining="item.remaining"
                       :rating="item.rating"
                       :disclaimer="item.disclaimer"
                       :price="item.prices"
                       :coderesort="item.coderesort"
                       :titleurlexternal="item.titleurlexternal" />
          </div>
          <div v-if="dataResponse <= 0 && !sppiner" class="not-found text-center font-black opacity-10 text-[65px]"> NOT FOUND </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.catalog {
  input[type="search"]::-webkit-search-cancel-button,
  select {
    -webkit-appearance: none;
  }
  input, select {
    background: transparent;
    border: 1px solid $inputs-border;
    border-radius: $radius-s;
    padding: 9px 20px;
    height: $inputs-height;
    &:focus {
      outline: none !important;
      border-color: $inputs-focus;
    }
  }
  &_content {
    &_controles {
      &_search {
        position: relative;
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
        input:focus ~ label, input:not(:placeholder-shown) ~ label {
          top: 9px;
          font-size: $inputs-label-size;
        }
      }
    }
  }
}
.not-found {
  opacity: 0.06;
  text-shadow: 5px 5px 5px $black;
}
.sppiner {
  width: 50px;
  padding: 5px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: $btn-primary;
  -webkit-mask: conic-gradient(#0000 10%,#000), linear-gradient(#000 0 0) content-box;;
  mask: conic-gradient(#0000 10%,#000), linear-gradient(#000 0 0) content-box;;
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: spin 1s infinite linear;
}
@keyframes spin { to { transform: rotate(1turn) } }
</style>
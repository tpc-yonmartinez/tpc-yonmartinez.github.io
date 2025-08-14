<script setup>
import { defineAsyncComponent, ref, onMounted, computed, watch } from 'vue'
import { useState } from '#app'
//import { useI18n } from '#imports'
//import useFindGeolocatedItem from '@/composables/useFindGeolocatedItem'
import { openModalButton } from '../composables/utils.js'

const Select = defineAsyncComponent(() => import('./inputs/InputSelect.vue'))
const Pagination = defineAsyncComponent(() => import('./Pagination.vue'))
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
  }
})

let filterBy = ref(0)

const { t } = useI18n(),
      itemselect = ref(''),
      catalogId = useState('catalogId'),
      currentPage = ref(1),
      perPage = ref(props.pagination ? 12 : props.totalservices),
      search = ref(''),
      hotelIdSelected = ref(0),
      dataResponse = ref([]),
      totalrecords = ref(props.totalservices),
      allmodal = useState('modal'),
      widgetResort = useState('sendResortCatalog'),
      sppiner = ref(true),
      reloadFilter = ref(false)

const filterByCategory = (category) => {
  category !== filterBy.value && (currentPage.value = 1)
  filterBy.value = category || null
}

const listResorts = props.hotels.reduce((acc, item) => {
  return [
    ...acc || [],
    item.resort
  ]
}, [])

const params = async (complements) => {
  sppiner.value = true
  dataResponse.value = []
  if (props.ordercards) complements += '&sort=true'
  const hotelselected = await $fetch(`/strv4/catalog-services?pagination[page]=${currentPage.value}&pagination[pageSize]=${perPage.value}&filters[catalogid]=${catalogId.value}${complements}`)
    .then(res => {
      const filteredData = widgetResort.value?.guest > 0
                            ? res.data.filter(item => item.adultsonly !== 1)
                              : res.data

      dataResponse.value = filteredData
      totalrecords.value = props.pagination ? res.totalRegistros : filteredData.length
    })
    .catch(err => {
      console.error('Error: ', err)
      return { data: [] }
    })

  sppiner.value = false
}

const changePage = (page) => currentPage.value = page

onMounted(() => {
  params('')
})

watch(() => widgetResort.value, (nv) => {
  if (nv?.resort) hotelIdSelected.value = nv.resort
}, { deep: true })

watch(() => itemselect.value, (nv) => {
  const hotelId = props.hotels.find(hotel => hotel.resort === nv)
  hotelIdSelected.value = hotelId?.id
})

watch(() => [currentPage.value, perPage.value, hotelIdSelected.value, filterBy.value, search.value, widgetResort.value?.guest], (nv, ov) => {
  let complements = ''
  ov[2] != hotelIdSelected.value ? reloadFilter.value = true : reloadFilter.value = false
  if (nv[1] != ov[1]) currentPage.value = 1
  if (hotelIdSelected.value > 0) complements += `&filters[hotel]=${hotelIdSelected.value}`
  if (filterBy.value) complements += `&filters[category]=${filterBy.value.id}`
  if (search.value) complements += `&filters[search]=${search.value}`
  params(complements)
})

const onClick = (id) => {
  const embed = useFindGeolocatedItem(props.modalglobal)

  allmodal.value = {
                    type: 'ModalService',
                    data: dataResponse.value,
                    modalglobal: { btntext: props.modalglobaltext, embedform: embed },
                    current: dataResponse.value.findIndex(card => card.service_id === id),
                    position: false
                  }
}

const onModal = (modal) => {
  if (!modal) return
  openModalButton(modal.modalName, modal.id)
}

const filterExternalUrl = (url, queryParams = '') => {
  const validUrls = [
    'https://bookingsvenice.baglionihotels.com/rooms',
    'https://bookingsrome.baglionihotels.com/rooms',
    'https://bookingslondon.baglionihotels.com/rooms',
    'https://bookingsmilan.baglionihotels.com/rooms',
    'https://bookingsflorence.baglionihotels.com/rooms',
    'https://bookingspuglia.baglionihotels.com/rooms',
    'https://bookingsmaldives.baglionihotels.com/rooms',
    'https://bookingssardinia.baglionihotels.com/rooms',
    'https://onlinebookingspr.palaceresorts.com/rooms',
    'https://onlinebookingspr.leblancsparesorts.com',
    'https://bookingscancunpr.moonpalace.com/rooms',
    'https://bookings.baglionihotels.com',
    'https://bookingsbeachpr.palaceresorts.com/rooms',
    'https://bookingscozumelpr.palaceresorts.com/rooms',
    'https://bookingsplayadelcarmenpr.palaceresorts.com/rooms',
    'https://bookingssunpr.palaceresorts.com/rooms',
    'https://bookingscancunpr.leblancsparesorts.com/rooms',
    'https://bookingscabopr.leblancsparesorts.com/rooms',
    'https://bookingscancunpr.moonpalace.com/rooms',
    'https://bookingsjamaicapr.moonpalace.com/rooms',
    'https://bookingsnizucpr.moonpalace.com/rooms',
    'https://bookingsthegrandpr.moonpalace.com/rooms'
  ]

  if (validUrls.includes(url)) {
    return queryParams ? `${url}${queryParams}` : url
  }
  return url
}

const filteredCategories = computed(() => {
  return props.categories?.filter(category => {
    if (widgetResort.value?.resort && category?.filterresorts?.length > 0) {
      return category.filterresorts.find(resort => resort.id === widgetResort.value?.resort)
    }
    return category
  })
})
</script>

<template>
  <div ref="catalog" :class="['catalog py-[50px] md:py-[60px] xl:py-[5vw] 2xl:py-[100px] flex flex-col gap-[40px]',
                              {'-mx-[20px] px-[20px] md:-mx-[10vw] xl:px-[10vw] md:!py-[60px]': stylecards != 'Default'}]">
    <div v-if="title || listResorts?.length" class="catalog_top flex flex-col gap-[30px] mx-[-20px] md:mx-[-10vw] px-[20px] md:px-[10vw]">
      <h1 v-if="title" class="catalog_top_title text-center lg:w-[50vw] lg:mx-auto"> {{ title }} </h1>
      <Select v-if="listResorts?.length"
              class="catalog_top_hotels w-full lg:w-[300px] mx-auto"
              placeholder="Select Resorts"
              resetlist
              :list="listResorts"
              v-model="itemselect" />
    </div>
    <div class="catalog_content scroll-t flex flex-col gap-[40px]">
      <div v-if="categories?.length" class="catalog_content_filter">
        <Filters :categories="filteredCategories"
                 @onFilter="filterByCategory"
                 :all="t('gallerygrid.all')"
                 :refresh="reloadFilter"
                 :stylefilter="stylecards"
                 :showiconall="showiconall" />
      </div>
      <div v-if="searchitem || showperpage" :class="['catalog_content_controles flex flex-col gap-[30px] items-center sm:flex-row sm:justify-between', {'2xl:px-[3.33333vw]': stylecards === 'Default'}, {'2xl:px-[3.80208vw]': stylecards === 'Full'}]">
        <div v-if="searchitem" class="catalog_content_controles_search w-full sm:w-[300px]">
          <input type="search" class="w-full"
                 name="search"
                 placeholder=""
                 v-model="search">
                 <label> {{ placeholderserch || t('catalog.search') }} </label>
        </div>
        <div v-if="showperpage" class="catalog_content_controles_perpage flex flex-row items-center gap-[20px] w-full sm:w-[300px] sm:justify-end">
          <p v-if="placeholderperpage"> {{ placeholderperpage }} </p>
          <Select :list="[12, 18, 24]"
                  class="flex-1 sm:w-[100px] lg:flex-none lg:w-[130px]"
                  :placeholder="t('catalog.perpage')"
                  v-model="perPage" />
        </div>
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
                       :external="filterExternalUrl(item.urlexternal, widgetResort?.params)"
                       :modal="item.modal"
                       :listbenefit="item.listbenefit"
                       :titlebenefits="item.titlebenefits"
                       :remaining="item.remaining"
                       :rating="item.rating"
                       :disclaimer="item.disclaimer"
                       :price="item.prices"
                       :coderesort="item.coderesort"
                       :titleurlexternal="item.titleurlexternal"
                       @click="stylecards == 'Simple' ? onModal(item.modal) : stylecards == 'Default' ? onClick(item.service_id) : {}" />
          </div>
          <div v-if="dataResponse <= 0 && !sppiner" class="not-found text-center font-black opacity-10 text-[65px]"> NOT FOUND </div>
        </div>
      </div>
      <div v-if="pagination" class="catalog_content_pagination">
        <Pagination :perpage="perPage"
                    :currentpage="currentPage"
                    :totalpages="totalrecords"
                    parent="catalog"
                    @changePage="changePage" />
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
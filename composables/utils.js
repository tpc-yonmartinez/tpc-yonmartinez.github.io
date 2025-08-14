import { camelCase } from './camelCase.js'
import { useState, useAsyncData, useRuntimeConfig } from '#app'
import useFindGeolocatedItem from '@/composables/useFindGeolocatedItem'
import { ref, reactive } from 'vue'

export function showDatesRanged(startDate = '', endDate ='') {
  const start = new Date(startDate).getTime()
  const end = new Date(endDate).getTime()
  const now = new Date().getTime()

  return !start && !end ||
          now >= start && now <= end ||
          now >= start && !end ||
          !start && now <= end
}
export function fetchComponents(components = null) {
  if (!components || !Array.isArray(components)) throw createError({ statusCode: 503, statusMessage: 'Components must be an Array' })
  
  return components.filter(component => {
      return typeof component.countries === 'undefined' || component.countries?.country?.includes(useState('countryCode').value?.alpha3) || !component.countries
    }).map(component => {
      const { id, __component, country, color_offer_close, ...props } = component
      return { component: camelCase(__component.split('.').pop()), props: props }
    })
}
export async function openModalButton (modalName = '', modalId = 0) {
  if (typeof(modalName) !== 'string' && modalId === 0) throw createError({ statusCode: 503, statusMessage: 'Modal name must be a string' })

  const propertie = modalId > 0 ? 'id' : 'modalName'

  const modalState = useState('modal'),
  config = useRuntimeConfig(),
  proxy = reactive({
    strapi: {
      url: '/strv4/modales',
      params: {
        [`filters[${propertie}][$eqi]`]: modalId > 0 ? modalId : modalName,
        locale: useState('locale').value,
        publicationState: 'live'
      }
    },
    bucket: {
      url: '/api/bucket',
      params: {
        locale: `${useState('locale').value}/modals`,
        name: modalName
      }
    }
  }),
  modalData= ref(null),
  modalStatus = ref(null)

  const fetchModal = async (source = '') => {
    const { data: modal, status, error } = await useAsyncData(
      'modal',
      async () => {
        const modalResponse = await $fetch(proxy[source].url, {
          params: proxy[source].params
        }).then(res => res.data)
  
        return modalResponse
      }
    )
  
    if (status.value === 'success') {
      modalData.value = modal.value[0] || {}
      modalStatus.value = status.value
    } else if (status.value === 'error') {
      modalStatus.value = status.value
    }
  }

  await fetchModal((config?.public?.AWS_ENABLE_CLOUDFRONT_REQUEST === 'true' || config?.public?.AWS_ENABLE_S3CLIENT_REQUEST === 'true') ? 'bucket' : 'strapi')

  if (modalStatus.value === 'error') {
    await fetchModal('strapi')
  }

  const { __component: type, id, ...data} = ({ ...useFindGeolocatedItem(modalData.value.dynZone) })
  const modalFiltered = {
      type: type ? `Modal${(((type.split('.').pop()).split('-')).map(w => `${((w.charAt(0).toLowerCase()).toUpperCase())}${((w.toLowerCase()).slice(1))}`)).join('')}` : null,
      data: Object.keys(data)?.length == 0 ? null : data,
    }

	modalState.value = modalFiltered
}
export function fetchCurrency(currencies = null, defaultCurrency = null) {
  const currency = currencies?.filter(cs => {
    return cs?.country?.includes(useState('countryCode').value?.alpha3)
  }).map(cs => {
    return {currency: cs.currency.name, description: cs.currency.description}
  })[0]

  return currency ? currency : (defaultCurrency?.name ? {currency: defaultCurrency.name, description: defaultCurrency.description} : {currency: 'USD', description: 'Dollar'})
}
export default (items: any) => {
  if (!items || !Array.isArray(items)) throw createError({ statusCode: 503, statusMessage: 'Items must be an Array and contain Country/Countries property' })

  return items.find(component => {
    return component?.countries ? component.countries?.country?.includes(useState('countryCode').value?.alpha3) || component.countries?.length <= 0 || !component.countries :
                                  component?.country?.includes(useState('countryCode').value?.alpha3) || component?.country?.length <= 0 || !component?.country
  })
}
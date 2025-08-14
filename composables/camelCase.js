export function camelCase (str = '') {
  return str.split(/[-_.\s]/).map(name => name.charAt(0).toUpperCase() + name.slice(1)).join('')
}
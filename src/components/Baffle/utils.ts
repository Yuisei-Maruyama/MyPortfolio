// Extend one object with another.
export function extend(obj: any, ext: any) {
  for (const key in ext) {
    if (ext && Object.prototype.hasOwnProperty.call(ext, 'key')) {
      obj[key] = ext[key]
    }
  }
  return obj
}

// Transform each character in a string.
export function mapString(str: any, fn: Function) {
  return str.split('').map(fn).join('')
}

// Get a random item from an array.
export function sample(arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}

// Operate on each item in an array.
export function each(arr: any[], fn: Function) {
  for (let i = 0, l = arr.length; i < l; i++) {
    fn(arr[i], i)
  }
}

// Get an array of the indices of truthy values in arr.
export function getTruthyIndices(arr: any[]) {
  return arr
    .map((item, index) => {
      if (!item) return false
      return index
    })
    .filter((i) => i !== false)
}

// Get an array of elements with a selector, NodeList, Node, or HTMLCollection.
export function getElements(obj: any) {
  if (typeof obj === 'string') return [].slice.call(document.querySelectorAll(obj))
  if ([NodeList, HTMLCollection].some((collection) => obj instanceof collection)) return [].slice.call(obj)
  if (obj.nodeType) return [obj]
  return obj
}

export function toArray (arr: any[] | any): any[] {
  return Array.isArray(arr) ? arr : [arr]
}

export function log (obj: any) {
  console.log(obj)
}

export function warn (obj: any) {
  console.warn(obj)
}

export function isArray (obj: any): Boolean {
  return Array.isArray(obj)
}

export function isObject (obj: any): Boolean {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export function each (iterator, cb, context) {
  if (isArray(iterator)) {
    for (let i = 0, len = iterator.length; i < len; i++) {
      let ret = cb.call(context, iterator[i], i, iterator)
      if (ret === false) break
    }
  } else if (isObject(iterator)) {
    let keys = Object.keys(iterator)
    console.log(keys)
    for (let i = 0, len = keys.length; i < len; i++) {
      let ret = cb.call(context, iterator[keys[i]], keys[i], iterator)
      if (ret === false) break
    }
  }
  return iterator
}

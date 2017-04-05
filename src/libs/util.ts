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

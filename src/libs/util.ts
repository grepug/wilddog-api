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

export function getPath (str: string): string[] {
  let reg = new RegExp('^https\:\/\/[0-9a-z\.]+\.com\/')
  return str.replace(reg, '').split('/')
}

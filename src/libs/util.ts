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
  return str.replace(/^https\:\/\/[0-9a-z\.\-]+\.com\//, '').split('/')
}

export function makePath (p: string | string[]): string {
  return Array.isArray(p) ? p.join('/') : p
}

export function toPathArr (p: string | string[]): string[] {
  return Array.isArray(p) ? p : p.split('/')
}

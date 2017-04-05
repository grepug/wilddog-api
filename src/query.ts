import { WilddogApi } from './index'

declare const Promise

export class Query {

  private wilddog: WilddogApi
  private sync
  private path: string[]
  // private children: string[]

  constructor (
    wilddog: WilddogApi,
    path: string[],
  ) {
    this.path = path
    this.wilddog = wilddog
    this.sync = this.wilddog.sync
  }

  equalTo (key, val): Promise<Object> {
    return new Promise((resolve) => {
      let path = this.path.join('/')
      this.sync.ref(path).orderByChild(key).equalTo(val).once('value', ss => {
        let key = ss.key()
        let val = ss.val()
        resolve({ key, val })
      })
    })
  }

}

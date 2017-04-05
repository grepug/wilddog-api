import { WilddogApi } from './index'

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
    this.sync = this.wilddog.sync()
  }

  equalTo () {
    let path = this.path.join('/')
    this.sync.ref(path).orderByKey().equalTo()
  }

}


WA.Query()

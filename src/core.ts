import wilddog = require('wilddog')
import {
  Query,
  QueryOptions,
  WdObject,
  ObjectOptions,
} from './index'
import { makePath } from './libs/util'

export class WilddogApi {

  app: wilddog.app.App
  sync: wilddog.sync.sync

  public init (config: any): WilddogApi {
    this.app = wilddog.initializeApp(config)
    this.sync = this.app.sync()
    return this
  }

  public Query (queryOptions: QueryOptions): Query {
    return this.checkIfInited() && new Query(queryOptions, this)
  }

  public Object (objOptions: ObjectOptions | string): WdObject {
    if (!this.checkIfInited()) return
    if (typeof objOptions === 'string') {
      return new WdObject({ path: objOptions }, this)
    }
    return new WdObject(objOptions, this)
  }

  private checkIfInited () {
    if (!this.app) {
      console.error('not initialized!')
      return false
    }
    return true
  }

}

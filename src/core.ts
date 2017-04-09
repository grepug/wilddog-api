import wilddog = require('wilddog')
import {
  Query,
  QueryOptions,
  WdObject,
  ObjectOptions,
  User
} from './index'
import { makePath } from './libs/util'

export class WilddogApi {

  app: wilddog.app.App
  sync: wilddog.sync.sync
  auth: wilddog.auth.Auth

  public init (config: any): WilddogApi {
    this.app = wilddog.initializeApp(config)
    this.sync = this.app.sync()
    this.auth = this.app.auth()
    return this
  }

  public Query (queryOptions: QueryOptions): Query {
    console.log(this)
    return this.checkIfInited() && new Query(queryOptions, this)
  }

  public Object (objOptions: ObjectOptions | string | string[]): WdObject {
    if (!this.checkIfInited()) return
    if (typeof objOptions === 'string' || Array.isArray(objOptions)) {
      return new WdObject({ path: objOptions }, this)
    }
    return new WdObject(objOptions, this)
  }

  User (): User {
    return new User(this)
  }

  private checkIfInited () {
    if (!this.app) {
      console.error('not initialized!')
      return false
    }
    return true
  }

}

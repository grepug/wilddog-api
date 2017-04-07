import wilddog = require('wilddog')
import { Query, WdObject, Wilddog } from './index'
import { makePath } from './libs/util'

export class WilddogApi extends Wilddog {

  public init (config: any): WilddogApi {
    this.wilddog = wilddog.initializeApp(config)
    this.sync = this.wilddog.sync()
    return this
  }

  public Query (path: string[]): Query {
    return new Query({ path })
  }

  public Object (path: string[] | string): WdObject {
    return new WdObject({ ref: this.sync.ref(makePath(path)) })
  }

}

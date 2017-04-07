import wilddog = require('wilddog')
import { Query, WdObject } from './index'

declare const Promise: any

interface Config {
  syncURL: string,
  authDomain: string
}

export class WilddogApi {

  private config: Config
  public wilddog: any
  public sync: any

  constructor (
    config: Config,
  ) {
    this.config = config
  }

  public init (): WilddogApi {
    this.wilddog = wilddog.initializeApp(this.config)
    this.sync = this.wilddog.sync()
    return this
  }

  public Query (path: string[]) {
    return new Query({ path, wilddog: this })
  }

  public Object (path: string[]) {
    // return new WdObject(path, null, this)
    return new WdObject({ path, wilddog: this})
  }


}

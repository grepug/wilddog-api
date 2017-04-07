import { Wilddog, WilddogApi, Relation, Query } from './index'
import { getPath, makePath } from './libs/util'
import wilddog = require('wilddog')
import _ = require('lodash')

declare const Promise: any

interface ObjectOptions {
  path?: string[] | string,
  val?: any,
  ref?: wilddog.sync.Reference,
}

export class WdObject extends Wilddog {

  public path: string[] | string
  public val: any
  private pathStr: string
  private ref: wilddog.sync.Reference

  constructor (
    options: ObjectOptions
  ) {
    super()
    this.val = options.val
    this.path = options.ref ? getPath(options.ref.toString()) : options.path
    this.ref = options.ref ? options.ref : this.sync.ref(makePath(this.path))
  }

  async set (obj: Object): Promise<WdObject> {
    obj = this.setCreatedAndUpdated(obj)
    await this.ref.set(obj)
    return this
  }

  get (key: string): Promise<WdObject> {
    return new Query({ path: this.path }).get(key)
  }

  async push (obj: Object): Promise<WdObject> {
    obj = this.setCreatedAndUpdated(obj)
    let ref: wilddog.sync.Reference = await this.ref.push(obj)
    return new WdObject({ ref })
  }

  async save (obj: Object): Promise<WdObject> {
    if (this.path.length === 2) {
      _.extend(obj, {
        updatedAt: new Date().getTime()
      })
    }
    await this.ref.update(obj)
    return this
  }

  // remove (): Promise<any> {
  //   return this.ref.remove()
  // }

  child (childPath: string[]): WdObject {
    let childPathStr: string = makePath(childPath)
    return new WdObject({ ref: this.ref.child(childPathStr) })
  }

  relation (relationClassName: string, relationName: string): Relation {
    return new Relation({
      path: this.path,
      relationName,
      relationClassName,
      object: this
    })
  }

  key (): string {
    return this.ref.key()
  }

  private setCreatedAndUpdated (obj: Object): Object {
    if (this.path.length === 1) {
      return _.extend(obj, {
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
      })
    }
    return obj
  }

}

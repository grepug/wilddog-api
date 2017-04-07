import { WilddogApi, Relation, Query } from './index'
import wilddog = require('wilddog')
import _ = require('lodash')

declare const Promise: any

interface ObjectOptions {
  path?: string[],
  val?: any,
  ref?: wilddog.sync.Reference,
  wilddog: WilddogApi,
}

export class WdObject {

  public path: string[]
  public val: any
  private pathStr: string
  private wilddog: WilddogApi
  private ref: wilddog.sync.Reference

  constructor (
    options: ObjectOptions
  ) {
    this.path = options.path
    this.val = options.val
    this.wilddog = options.wilddog
    this.ref = options.ref ? options.ref : this.wilddog.sync.ref(this.path.join('/'))
  }

  set (obj: Object): Promise<WdObject> {
    obj = this.setCreatedAndUpdated(obj)
    return this.ref.set(obj)
    .then(() => Promise.resolve(this))
  }

  get (key: string): Promise<WdObject> {
    return new Query({ path: this.path, wilddog: this.wilddog }).get(key)
  }

  push (obj: Object): Promise<WdObject> {
    obj = this.setCreatedAndUpdated(obj)
    return this.ref.push(obj)
    .then((ref: wilddog.sync.Reference) => Promise.resolve(
      new WdObject({ ref, wilddog: this.wilddog })
    ))
  }

  save (obj: Object): Promise<WdObject> {
    if (this.path.length === 2) {
      _.extend(obj, {
        updatedAt: new Date().getTime()
      })
    }
    return this.ref.update(obj)
    .then(() => Promise.resolve(this))
  }

  remove (): Promise<any> {
    return this.ref.remove()
  }

  relation (relationClassName: string, relationName: string): Relation {
    return new Relation({
      wilddog: this.wilddog,
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

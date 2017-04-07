import { WilddogApi, Query, WdObject } from './index'
import {
  toArray
} from './libs/util'

declare const Promise: any

interface RelationOptions {
  wilddog: WilddogApi,
  path: string[],
  relationName: string,
  relationClassName: string,
  object: WdObject
}

export class Relation {

  private className: string
  private wilddog: WilddogApi
  private path: string[]
  private relationName: string
  private relationClassName: string
  private object: WdObject

  constructor (
    options: RelationOptions
  ) {
    this.wilddog = options.wilddog
    this.path = options.path
    this.relationName = options.relationName
    this.relationClassName = options.relationClassName
    this.object = options.object
  }

  add (objs: WdObject[] | WdObject): Promise<WdObject[]> {
    let path = this.path.join('/')
    objs = toArray(objs)
    let promises = objs.map(obj => {
      let className = `_relation_${obj.path[0]}_${this.relationName}`
      let key = obj.path[1]
      return this.object.child([className]).push(key)
    })
    return Promise.all(promises)
  }

  remove (objs: WdObject[] | WdObject): Promise<any> {
    let path = this.path.join('/')
    objs = toArray(objs)

    return Promise.all()
  }

  query (): Query {
    return new Query({
      wilddog: this.wilddog,
      path: this.path,
      relationClassName: this.relationClassName,
      relationName: this.relationName,
      isRelation: true
    })
  }



}

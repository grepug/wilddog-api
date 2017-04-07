import { Wilddog, WilddogApi, Query, WdObject } from './index'
import {
  toArray
} from './libs/util'

declare const Promise: any

interface RelationOptions {
  path: string[] | string,
  relationName: string,
  relationClassName: string,
  object: WdObject
}

export class Relation extends Wilddog {

  private className: string
  private path: string[] | string
  private relationName: string
  private relationClassName: string
  private object: WdObject

  constructor (
    options: RelationOptions
  ) {
    super()
    this.path = options.path
    this.relationName = options.relationName
    this.relationClassName = options.relationClassName
    this.object = options.object
  }

  add (objs: WdObject[] | WdObject): Promise<WdObject[]> {
    objs = toArray(objs)
    let promises = objs.map(obj => {
      let className = `_relation_${obj.path[0]}_${this.relationName}`
      let key = obj.path[1]
      return this.object.child([className]).push(key)
    })
    return Promise.all(promises)
  }

  remove (objs: WdObject[] | WdObject): Promise<any> {
    objs = toArray(objs)

    return Promise.all()
  }

  query (): Query {
    return new Query({
      path: this.path,
      relationClassName: this.relationClassName,
      relationName: this.relationName,
      isRelation: true
    })
  }



}

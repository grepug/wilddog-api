import { WilddogApi, Query, WdObject } from './index'
import {
  toArray
} from './libs/util'

declare const Promise

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

  add (objs: WdObject[] | WdObject): Promise<any> {
    let path = this.path.join('/')
    objs = toArray(objs)
    // if (objs.reduce((x, y) => x.path[0] === y.path[0]))
    let promises = objs.map(obj => {
      let className = `_relation_${obj.path[0]}_${this.relationName}`
      let key = obj.path[1]
      this.object.save({ [className]: [key] })
    })
    return Promise.all(promises)
  }

  remove () {

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

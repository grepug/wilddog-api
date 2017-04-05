import { WilddogApi, WdObject } from './index'
import {
  toArray,
  warn,
  log
} from './libs/util'
import _ = require('lodash')

declare const Promise: any

interface QueryOptions {
  wilddog: WilddogApi,
  path: string[],
  relationClassName?: string,
  relationName?: string
  isRelation?: Boolean
}

interface QueryObj {
  key?: string,
  equalTo?: EqualTo,
  startAt?: Object,
  limit?: number,
}

interface EqualTo {
  key: string,
  val: string
}

export class Query {

  private wilddog: WilddogApi
  private sync: any
  private path: string[]
  private relationClassName: string
  private relationName: string
  private isRelation: Boolean = false

  private queryObj: QueryObj = {}

  constructor (
    options: QueryOptions
  ) {
    this.path = options.path
    this.wilddog = options.wilddog
    this.sync = this.wilddog.sync
    this.relationClassName = options.relationClassName
    this.relationName = options.relationName
    this.isRelation = !!options.isRelation
  }

  get (key: string): Promise<any> {
    return new Promise((resolve: Function) => {
      let path = this.path.join('/')
      let ref = this.sync.ref(path).orderByChild(key)
      ref.once('value', (ss: any) => {
        let key = ss.key()
        let val = ss.val()
        let wdObject = new WdObject(this.path, val, this.wilddog)
        resolve(wdObject)
      })

    })
  }

  equalTo (key: string, val: string): Query {
    if (this.isRelation) {
      warn('relation 暂不支持 equalTo')
    } else {
      this.queryObj.equalTo = { key, val }
    }
    return this
  }

  find (): Promise<WdObject[]> {
    if (this.isRelation) {
      let relationName = `_relation_${this.relationClassName}_${this.relationName}`
      log(this.path.concat([relationName]))
      return this.wilddog.Query(this.path.concat([relationName])).first()
      .then(res => {
        let keys: any = res.val
        let p = _.map(keys, (key: string) => {
          return this.wilddog.Query([this.relationClassName]).get(key)
        })
        return Promise.all(p)
      })
    }
    return new Promise((resolve: any) => {
      let path = this.path.join('/')
      let ref = this.sync.ref(path)
      if (this.queryObj.equalTo) {
        ref = ref.orderByChild(this.queryObj.equalTo.key)
      }
      ref.once('value', (ss: any) => {
        let key = ss.key()
        let val = ss.val()
        let wdObject = new WdObject(this.path, val, this.wilddog)
        resolve([wdObject])
      })
    })
  }

  async first (): Promise<WdObject> {
    return (await this.find())[0]
  }

  on (method: string, cb: Function) {
    let path = this.path.join('/')
    let ref = this.sync.ref(path)
    if (this.queryObj.equalTo) {
      ref = ref.orderByChild(this.queryObj.equalTo.key)
    }
    ref.on(method, (ss: any) => {
      let key = ss.key()
      let val = ss.val()
      let wdObject = new WdObject(this.path, val, this.wilddog)
      cb(wdObject)
    })
  }

}

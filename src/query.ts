import { Wilddog, WilddogApi, WdObject } from './index'
import wilddog = require('wilddog')
import {
  toArray,
  warn,
  log,
  makePath
} from './libs/util'
import _ = require('lodash')

declare const Promise: any

export interface QueryOptions {
  path?: string[] | string,
  relationClassName?: string,
  relationName?: string,
  isRelation?: Boolean,
  ref?: wilddog.sync.Reference
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

  private path: string[] | string
  private ref: wilddog.sync.Reference
  private relationClassName: string
  private relationName: string
  private isRelation: Boolean = false
  private wd: WilddogApi

  private queryObj: QueryObj = {}

  constructor (
    options: QueryOptions,
    wd: WilddogApi
  ) {
    this.path = options.path
    this.ref = options.ref ? options.ref : this.wd.sync.ref(makePath(this.path))
    this.relationClassName = options.relationClassName
    this.relationName = options.relationName
    this.isRelation = !!options.isRelation
    this.wd = wd
  }

  get (key: string): Promise<WdObject> {
    return new Promise((resolve: Function) => {
      let query: wilddog.sync.Query = this.ref.orderByChild(key)
      query.once('value', (ss: wilddog.sync.DataSnapshot) => {
        let key = ss.key()
        let val = ss.val()
        let wdObject = this.wd.Object({ ref: this.ref, val })
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
      let ref: wilddog.sync.Reference = this.ref.child(relationName)
      return this.wd.Query({ ref }).first()
      .then(res => {
        let keys: any = res.val
        let p = _.map(keys, (key: string) => {
          return this.wd.Query([this.relationClassName]).get(key)
        })
        return Promise.all(p)
      })
    }
    return new Promise((resolve: any) => {
      let ref: wilddog.sync.Reference | wilddog.sync.Query = this.ref
      if (this.queryObj.equalTo) {
        ref = this.ref.orderByChild(this.queryObj.equalTo.key)
      }
      ref.once('value', (ss: wilddog.sync.DataSnapshot) => {
        let key = ss.key()
        let val = ss.val()
        let wdObject = this.wd.Object({ ref: this.ref, val })
        resolve([wdObject])
      })
    })
  }

  async first (): Promise<WdObject> {
    return (await this.find())[0]
  }

  on (method: string, cb: Function) {
    let ref: wilddog.sync.Reference | wilddog.sync.Query = this.ref
    if (this.queryObj.equalTo) {
      ref = ref.orderByChild(this.queryObj.equalTo.key)
    }
    ref.on(method, (ss: wilddog.sync.DataSnapshot) => {
      let key = ss.key()
      let val = ss.val()
      let wdObject = this.wd.Object({ ref: this.ref, val })
      cb(wdObject)
    })
  }

}

import { WilddogApi, Relation } from './index'

export class WdObject {

  public path: string[]
  private pathStr: string
  public val: any
  private wilddog: WilddogApi

  constructor (
    path: Array<string>,
    val: any,
    wilddog: WilddogApi
  ) {
    this.path = path
    this.pathStr = path.join('/')
    this.val = val
    this.wilddog = wilddog
  }

  set () {

  }

  get (key) {
    return this.val[key]
  }

  save (obj: Object): Promise<any> {
    return this.wilddog.sync.ref(this.pathStr).update(obj)
  }

  remove (): Promise<any> {
    return this.wilddog.sync.ref(this.pathStr).remove()
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



}

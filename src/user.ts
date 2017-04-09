import { WilddogApi, WdObject } from './'

declare const Promise: any

export class User {

  private wd: WilddogApi
  private user: WdObject

  constructor (
    wd: WilddogApi
  ) {
    this.wd = wd
  }

  saveUser () {

  } 

  current (): WdObject {
    return this.user
  }

  loginWithEmail (email: string, pass: string): Promise<WdObject> {
    return this.wd.auth.signInWithEmailAndPassword(email, pass)
    .then(user => {
      let userObj = this.wd.Object({ path: ['User', user.uid], val: user })
      this.user = userObj
      return Promise.resolve(userObj)
    })
  }

  onAuth () {
    return this.wd.auth.onAuthStateChanged((user: any) => {
      this.user = this.wd.Object({ path: ['User', user.uid], val: user })
    })
  }


}
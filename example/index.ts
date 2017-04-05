import { WilddogApi } from '../src/index'

let api = new WilddogApi({
  syncURL: 'https://aiyuke-t.wilddogio.com',
  authDomain: 'aiyuke-t.wilddogio.com/'
})

api.init()

api.Query(['User'])
.equalTo('displayName', 'GrePuG')
.then(ret => {
  console.log(ret)
})

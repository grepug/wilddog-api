// import { WilddogApi } from '../dist/wilddog-api'

// const WilddogApi = require('../dist/index')

import { WilddogApi, WdObject } from '../src/index'
// import wilddog = require('wilddog')

let api = new WilddogApi().init({
  syncURL: 'https://aiyuke-t.wilddogio.com',
  authDomain: 'aiyuke-t.wilddog.com'
})

api.Object('Subtournament').push({
  test: 'value'
})
.then(sub => {
  return sub.relation('Tournament', 'tournament')
  .add(
    api.Object(['Tournament', '-Kh5rrb0DZPJCTJPlS_e'])
  )
})
.then(ret => {
  console.log(ret)
})

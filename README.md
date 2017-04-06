# WilddogApi

> 作为一名前端开发者，想要开发一款APP，有一款第三方后端云能事半功倍，自从野狗云上线来，我多次尝试使用，但最终都是因为官方的SDK太难用，而选择使用相对友好的LeanCloud.

> 但LeanCloud的收费实在太贵了

> 这次我决定使用LeanCloud的API风格来封装Wilddog

## 安装

````
$ npm install --save @grepug/wilddog-api
````

## 使用

ES2015+
````
import { WilddogApi } from '@grepug/wilddog-api'

const wdApi = WilddogApi({
  syncURL: '<Your SyncURL>',
  authDomain: ''
}).init()

/**
  添加数据
*/
wdApi.Object(['User']).push({
  nickname: 'grepug',
  sex: 'm'
})
.then(() => console.log('push successfully!'))
.catch(err => console.log('an error occured!'))

/**
  更新数据
*/
wdApi.Object(['User', '21jlj980uhfl']).update({
  nickname: 'tom'
})
.then(() => console.log('updated successfully!'))
.catch(err => console.log('an error occured!'))

/**
  删除数据节点
*/
wdApi.Object(['User', '21jlj980uhfl']).remove()
.then(() => console.log('removed successfully!'))
.catch(err => console.log('an error occured!'))

wdApi.Query(['User']).equalTo('nickname', 'grepug').find()
.then(res => {

})

````

## API

### 类

WilddogApi

WilddogApi.Object(path: string[]): WdObject

WilddogApi.Query(paht: string[]): Query

WilddogApi.Object().relation(): Relation


Query

### 方法

#### wdApi.Object(string[]).push(obj: Object): Promise

内部使用wilddog.sync().ref().push()在该路径下插入一个节点


#### wdApi.Object(string[]).save(obj: Object): Promise

内部使用wilddog.sync().ref().update()对该路径下的节点更新

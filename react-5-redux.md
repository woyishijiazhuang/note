<style>
	body {
		font-family: consolas !important;
		/* letter-spacing: 0px; */
	}
	small {
		display: block;
		width: fit-content;
		background-color: #edfbeb;
	}
</style>
<!-- 
 作者: 2212617280@qq.com
 日期: 2022-3-22
 -->
# Redux
### 目录
- [安装](#安装)
- [基本结构](#基本结构)
- [reducer拆分合并](#reducer拆分合并)
- [中间件](#中间件)
- [取消订阅](#取消订阅)
- [redux devtools](#redux-devtools)
- [react redux](#react-redux)
- 未完待续
### 安装
	// npm安装
	npm install @reduxjs/toolkit
	// 或 npm i redux
	// 创建一个 React Redux 应用
	npx create-react-app my-app --template redux
	
### 基本结构
新建 [./redux/store.js]
```js
import {createStore} from 'redux'
// 定义处理函数,类似useReducer
const reducer = (preState, action)=>{
	return preState
}
const store = createStore(reducer) // 第二个参数设置state默认值

export default store
```
store的三个方法, 设置|订阅|获取 = dispath|subscribe|getStore
 ```js
 // 在组件内的生命周期等函数,
import store from './...store.js'
// 这里传入action
store.dispath({
	type: "值"
})

// 在其它组件内订阅
store.subscribe(()=>{
	// 取值存为自己的状态
	store.getStore()
})
 ```
 
### reducer拆分合并
将原有的reducer拆分成几个小的reducer方便管理,同时合并后又保证了单一性  
```js
// 写多个小Reducer
const aReducer = (preState={
	// 这里可以设置默认值
}, action)=>{
	let newState = {...preState}
	switch(action.type){
		case "":
			return newState
		default:
			return preState
	}
}
export default aReducer
```

```js
// 在总Reducer内 
import {combineReducers, createStore} from 'redux'
import aReducer from './...'
import bReducer from './...'
// 使用时 store.getStore().aReducer.key
const reducer = combineReducers({
	aReducer,
	bReducer
})
const store = createStore(reducer)
export default store 
```

### 中间件
[视频教学](https://www.bilibili.com/video/BV1dP4y1c7qd?p=84&spm_id_from=pageDriver)
store.dispath(action)的参数是一个对象  
有些时候,这个对象需要通过函数处理一些事件再return出一个对象  
在这个处理函数中,如果数据的获取是异步的,那么没办法return异步回来的数据  
此时就需要中间件  redux-thunk redux-promise
```js
// npm i redux-thunk
import reduxThunk from 'redux-thunk'
// 省略书写部分导入
// applyMiddleware(reduxPromise) 应用中间件,多个则用逗号分隔
const store = createStore(reducer,applyMiddleware(reduxThunk))
//此时 dispath支持以函数作为参数,并传入一个dispath()参数
export default function getRequest()={
	// 这里return出去一个函数
	return dispath =>{
		axios({
		      method: 'get',
		      url: 'https://randomuser.me/api',
		    })
		    .then((res)=>{
		      const action = {
		        type: UPDATE_REQUESTNAME,
		        payload:{
		          reducer3: res.data.results[0].email
		        }
		      }
		      // thunk则用 dispatch(action)
			  // promise则直接返回
		      return action
		    })
	}
}
```

### 取消订阅
```js
useEffect(()=>{
	// 订阅时返回一个取消订阅的函数
	var unsubscribe = store.subscribe(()=>{})
	return ()=>{unsubscribe()}
},[])
```

### redux devtools
redux的开发者工具-Redux DevTools Extension  
基于浏览器的插件  
```js
// 加上这些配置
+ const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose
+ const store = createStore(reducer, /* preloadeState, */ composeEnhancers(
- const store = createStore(reducer, /* preloadeState, */ compose(
	applyMiddleware(...middleware)
 ))
```
### react redux
**安装:** npm i react-redux  
```js
import store from './...'  // 子组件不用再导入store
import {Provider} from 'react-redux' // 省略其他导入
ReactDOM.render( // 包裹住根组件
	<Provider store = {store}>
		<App/>
	</Provider>,
	document.getElementById("root")
)
```
没看懂[视频教学](https://www.bilibili.com/video/BV1dP4y1c7qd?p=88&spm_id_from=pageDriver)
```js
// App组件内
import {connect} from 'react-redux'
	...	...
export default connect((state)=>{
	return{
		
	}
})(App)
```
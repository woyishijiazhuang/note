<style>
	body {
		font-family: consolas !important;
		/* letter-spacing: 0px; */
	}
	small {
		display: block;
		width: fit-content;
		background-color: #eee;
	}
</style>
<!-- 
 作者: 2212617280@qq.com
 日期: 2022-3-15
 -->
# react 进阶
### proxy
```js
// 安装
npm install http-proxy-middleware --save
// 新建 [src/setupProxy.js] 如下
const {createProxyMiddleware} = require('http-proxy-middleware')
module.exports = function(app){
	app.use(
		'/api',	// 匹配 /api 开头的链接
		createProxyMiddleware({
			target: 'http://loacllhost:5000',	// 实际要访问的服务器前缀
			changeOrigin: true,
		})
	)
}
// 请求时,所有/api...开头的地址都会转发给http://loacllhost:5000/api...
```
[视频教学](https://www.bilibili.com/video/BV1dP4y1c7qd?p=77&spm_id_from=pageDriver)

### css moudle
1. 导入的css是全局生效的
2. 将css文件改为[文件名.moudle.css]
	- 导入为一个对象 import style from '文件名.moudle.css'
	- 通过 {style.类名} 访问 //类选择器以外的呢?

### ui组件库
**安装** npm i antd  
移动端 antd-mobile@next
```js
import {Button} from 'antd'
import 'antd/dist/antd.css'
// 之后使用组件
```

### Immutable
数据深复制方案   
Map List fromJS toJS get set setIn update
```js
// 1. npm i immutable
// 2.引入
import {Map} from 'immutable'
var obj = {
	name: 'aaa',
	age:100,
}
var old_obj = Map(obj) // old_obj.toJS()转换普通对象
var new_obj = old_obj.set('name','xiaoming').set('age',50)
new_obj.get('name')
```

```js
// 复杂数据类型,要多层嵌套
var obj = Map({
	name: 'aaa',
	list: List([1,2,3])
})
```
### Mobx
取代redux
mobx-redux:取消了订阅的步骤,和取消订阅的步骤

### styled-components

### React.lazy()
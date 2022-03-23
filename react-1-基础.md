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
# react 基础
### 目录
* [安装](#安装)
* [index.js](#indexjs)
* [类组件和函数组件](#类组件和函数组件)
* [组件的css和js](#组件的css和js)
* [ref引用](#ref引用)
* [事件](#事件)
* [state](#state)
* [props](#props)
* [组件受控](#组件受控)
* [父子通信](#父子通信)
	* [状态提升](#状态提升)
	* [发布订阅模式](#发布订阅模式)
	* [context](#context)
* [solt](#solt)
* [生命周期](#生命周期)
* [性能优化](#性能优化)

### 安装
	// 安装脚手架
	npm install -g create-react-app
	// 创建一个项目
	create-react-app your-app
	// 运行
	npm run start
	// nrm是npm的镜像源管理工具,可以切换到淘宝镜像

### index.js
```js
//引入最重要的两个包,17版本可以省略React导入
import React from 'react'
import ReactDOM from 'react-dom'
//引用css和App组件
import './index.css'
import App from './App'
// 性能监测
import reportWebVitals from './reportWebVitals'

//render将前面的内容渲染到后面的节点内
ReactDOM.render(
  <React.StrictMode>
	<App />
  </React.StrictMode>,
  document.getElementById('root')
)
reportWebVitals()
```

### 类组件和函数组件
```js
//在16.8版本之后函数组件和类组件一样,之前的函数组件是无状态的
import React, { Component } from 'react'
export default class App extends Component {
	render(){
		// 一个根节点
		return <div></div>
	}
	//给类定义函数,绑定在DOM事件上
	//onClick = {this.function}无小括号
}
//函数式
export default function App(){
	return <div></div>
}
// 或 箭头函数省略{}直接返回内容
export default ()=><div></div>

```

### 组件的css和js
* **插值:**在return DOM之前定义变量,在DOM内用{}包裹变量插值
* **条件渲染:**通过插值{三目运算,返回DOM或子组件}
* **富文本:**在父元素内添加 dangerouslySetInnerHTML = {_html:<code>html片段</code>} 属性
* **style:**可以定义obj赋值给style,style的值用字符串
* **关键字:**关键字修改:class属性改为className,for属性改为htmlFor,避免jsx内语义冲突
* **css:**外部import引入css或行内css,react推荐行内

### ref引用
需要先定义myref = React.createRef()创建ref  
DOM属性ref = {this.myref};内部通过this.myref访问   
还可以访问组件
* myref = React.createRef()
* 申明后通过ref属性绑定标签或组件
* 任意地方通过this.refs.myref.current访问

### 事件
* 所有的事件都是用的**代理**,在冒泡时执行
* 事件对象被模拟在点击对象上了
* 标签内使用on...绑定事件
```jsx
// 推荐箭头函数防止this指向问题
<buttoon onClick={()=>{函数体}></buttoon>
//当在render外定义函数,使用时不要带()
onClick={this.函数名}
//或者
外部:fun_name = ()=>{...}
onClick={this.fun_name}
// 箭头函数传参
fun = （arg）={}
onClick={val=> {this.fun(val)}}
```
* this指向问题
```js
// call括号内传入一个对象,this将指向这个对象并自动执行
fun.call()
// apply和call类似
fun.apply()
// 改变this指向，但是不自动执行，再加（）执行
fun.bind()
```

### state
定义state = {} 固定名称   
state内的数据修改要用this.setState(新对象)新对象相同属性的值会覆盖旧对象  
直接修改会报错

**修改状态setState({},callback)**
* setState接收一个对象合并到旧对象上
* 这是一个异步操作,异步更新DOM
* 放在异步操作里反而会变成同步操作,同步更新DOM
* setState有第二个参数是一个回调函数,DOM更新后执行

### props
* 在使用子组件时添加属性和值,在子组件内通过 this.props.属性 访问值
* 传变量或bool值时,用{}包裹,而不是""
* props还可以传入函数,让子组件可以更改父组件状态

* **属性验证**: 
```
//导入验证类型的方法
import yanzheng from 'prop-types'
组件名.propTypes = {
	left:验证left type 的方法,
	right:yanzheng.string
}
//或者在组件类的内部用 static:标记不用new就可以访问的属性
static propTypes = {...}
```
* **属性默认值**:
```
组件名.defaultProps = {left: 默认值}
```
* 函数式组件通过参数对象接收所有属性;验证类型,默认值只能写外边

* **属性和状态总结**
* 都只能在自己的组件内用setState修改
* 子改父,需要父传入函数,函数属于父,可以被子调用

### 组件受控
组件的渲染由父组件控制为受控组件,子组件尽量不要有自己的状态  
受控-表单的默认值
* jsx中的DOM和原生不一样,value如果设置初始值,会被限制不能更改
* 使用defaultValue属性设置初始值
* 或让value绑定状态,更改后要监听事件去更改状态
* jsx中onInput和onChange一样在value值改变时触发

ref比常规好用一点,可以通过ref访问表单组件的状态和方法

### 父子通信
#### 状态提升
* 父子通信的组合应用
* 子传父将值提升到最近的父组件上,再通过父传子传给兄弟
* 除了亲兄弟很麻烦

#### 发布订阅模式
订阅者将回调函数给发布者,发布者发布时会依次执行这些回调函数   
回调函数是属于订阅者的,所以可以使用this指向订阅者

#### context
* 生产者-消费者模式
* 创建context对象 const Context = React.createContext()
* 生产者:render内 
```jsx
return  <Context.Provider value={{
			info: this.state.info,
			changeInfo:(value)=>{this.setState({info:value})}
		}}>
			DOM结构
		</Context.Provider>
```
* 消费者:render内 value接收生产者定义的对象,在return的DOM结构内使用value对象
* 把修改状态的方法放在value中,消费者可以修改状态,此时所有消费者都会得到更新
```
return <Context.Consumer>
	{(value)=>{return DOM结构}}
</Context.Consumer>
```

#### Redux
后面学

### solt
* 组件标签内部的DOM,在子组件内通过this.props.children访问
* children是一个数组,对应内部DOM的结构
* 必须在组件内使用它才会显示对应DOM
* 插槽的this指向父组件

### 生命周期
只有运行中阶段的生命周期会重复触发,其他都只触发一次

1. 初始化阶段
- componentWillMount: render之前最后依次修改状态的机会
	* <small>这个函数不安全将被放弃,会被打断,再重新执行,导致错误</small>
- render: 只能访问this.props和this.state,不允许修改状态和DOM输出
- componentDidMount: 成功render并渲染完成真实DOM之后触发,可以修改DOM
	* <small>推荐发起Ajax,定时器,订阅函数,基于创建完的dom进行初始化</small>
2. 运行中阶段
- componentWillReceiveProps:父组件修改属性触发,优先级低,容易被打断
	* <small>无论是否接收props,都会触发.接收一个形参,新的props,通过this拿到的是旧props</small>
	* <small>根据属性发起ajax或处理逻辑,或者把属性变成自己的状态</small>
- shouldComponentUpdate:返回false会阻止render和Update调用
	* <small>接收两个参数,新的属性和新的状态nextProps, nextState</small>
	* <small>在setState时,即使数据相同,也会render,可以在此阻止下面三个函数,复杂数据对比要注意</small>
	* <small>这里做性能优化,render时所有子组件都会重新渲染,可以在子组件内通过这个函数判断自己是否需要更新</small>
- componentWillUpdate:不能修改属性和状态,会死循环
	* <small>这个函数在setState后执行,然后render,DidUpdate,这个函数也不安全</small>
- render:只能访问this.props和this.state，不允许修改状态和DOM输出
- componentDidUpdate:可以修改最新的DOM,可以接受两个(新生命周期提供第三个)参数,旧的属性和状态
3. 销毁阶段
- componentWillUnmount:在删除组件之前进行清理操作,比如计时器和事件监听器
4. 新生命周期
- getDerivedStateFromProps:在调用render方法之前调用,即在渲染 DOM 元素之前会调用,并且在初始挂载及后续更新时都会被调用.(Props或State更改都会触发)
```js
// 需要先定义state, static是静态的,属于类没有this
state = {}
static getDerivedStateFromProps(nextProps, nextState){
	// 主要功能就是根据改变的Props去更改State
	// 至少返回一个null或一个对象去立即修改State
	return null
}
```
- getSnapshotBeforeUpdate:render执行后,DOM渲染前执行
	* <small>接收两个参数preProps,preState</small>
	* <small>需要返回一个值作为componentDidUpdate的第三个参数</small>
	* <small>需要与componentDidUpdate结合使用,否则出现错误</small>

### 性能优化
利用shouldComponentUpdate函数比较属性和状态  
使用PureComponent代替Component  
PureComponent会帮助比较Props和State,帮助<abbr title="shouldComponentUpdate">SCU</abbr>返回false  


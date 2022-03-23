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
# React Hooks

### 目录
- [useState](#usestate)
- [useEffect](#useeffect).
- [组件销毁](#组件销毁)
- [useLayoutEffect](#uselayouteffect)
- [useCallback](#usecallback)
- [useMemo](#usememo)
- [useRef](#useref)
- [useContext](#usecontext)
- [useReducer](#usereducer)
- [自定义hooks](#自定义hooks)

## Hooks
函数式组件的state解决方案

### useState
返回状态和更改状态的方法
```js
import React,{useState} from 'react'
export default function App(props){
	// 解构出单个state和setState()
	const [name, setname] = useState("状态初始值")
	const [list, setlist] = useState([1,2,3])
	// 修改时一定要用对应的set方法
	// set方法会让整个组件重新执行一遍
	render(){
		return <div></div>
	}
}
```

### useEffect
```js
import React,{useState, useEffect} from 'react'
// 接收一个回调函数和一个数组
useEffect(()=>{
	// 这里的函数只执行一次
},[])

// 依赖state或props,当依赖改变时,就执行一次
useEffect(()=>{
	// setname("新值")或根据name做其他操作
},[name])
// 数组表示依赖项,可以是state,也可以是props的子项
```

### 组件销毁
组件销毁时,需要清除注册的一些定时器,监听之类的事件
```js
useEffect(()=>{
	// 注册定时器
	var timer = setInterval(()=>{console.log("123")},1000)
	// 删除定时器,return 的函数会在组件销毁时执行,这里不要添加依赖
	return ()=>{
		clearInterval(timer)
	}
},[])
```

### useLayoutEffect
useLayoutEffect与useEffect类似,但调用时机不同.  
useLayoutEffect在DOM更新后立刻同步调用,会阻塞页面渲染.  
useEffect会在整个页面渲染完才调用.  

在实际使用过程中,为了避免**页面抖动**,可以使用useLayoutEffect.

### useCallback
记忆函数:防止组件重新渲染,导致方法被重新创建消耗性能,起到缓存作用,依赖变化会重新声明.
```js
// 记得导入useCallback
const fun = useCallback(()=>{
	// fun函数内部变量也会被记住,导致每次都是旧值
	// 应当将用到的状态放在依赖里,这样当和自己无关的state变化时就会记住
},[])
```
<small>个人理解:fun在依赖没变的情况下,内部的state和props也会被缓存</small>

### useMemo
useCallback的功能完全可以由useMemo替代
```js
// 返回第一个参数
useCallback(fn, inputs)
// 返回第一个参数的执行结果,可以当作计算属性
const fun = useMemo(()=>fn, inputs)
```
<small>**个人理解**:fun在依赖没变的情况下也不会变,可以当作一个计算属性  
**比较**:useMemo和useCallback接收的参数都是一样,都是在其依赖项发生变化后才执行,都是返回缓存的值,区别在于useMemo返回的是函数运行的结果,useCallback返回的是函数.
</small>

### useRef
保存引用值
```js
// useRef还可以通过初始值保存变量
const myref = useRef("初始值")
<div ref={myref}></div>
```

### useContext
**之前**
```js
import React from 'react'
//创建context
const numberContext = React.createContext();
//它返回一个具有两个值的对象
//{Provider ， Consumer}
function App(){
  //使用Provider为所有子孙提供value值
  return (
    <numberContext.Provider value={12}>
        <div>
        <ShowAn />
        </div>
    </numberContext.Provider>
  )
}
function ShowAn(){
  //使用Consumer从上下文获取value
  return(
    <numberContext.Consumer>
      {value=><div>the answer is {value}</div>}
    </numberContext.Consumer>
  )
}
export default App;

```
**之后**
```js
import React,{useContext}  from 'react';
import './App.css';
//创建context
const numberContext = React.createContext();
//它返回一个具有两个值的对象
//{Provider ， Consumer}
function App(){
  //使用Provider为所有子孙提供value值
  return (
    <numberContext.Provider value={520}>
        <div>
        <ShowAn />
        </div>
    </numberContext.Provider>
  )
}

function ShowAn(){
  //使用Consumer从上下文获取value
//调用useContext，传入从React.createContext获取的上下文对象。
  const value = useContext(numberContext);
  return(
    // <numberContext.Consumer>
      // {value=><div>the answer is {value}</div>}
    // </numberContext.Consumer>
    <div>
      the answer is {value}
    </div>

  )
}
export default App;
```

### useReducer
```js
const reducer = (preState, action)=>{
	const newState = {...preState}
	switch(action.type){
		case "add":
			newState.count++
			return newState
		case "minus":
			newState.count--
			return newState
		default:
			// 或者返回空
			return preState
	}
	// 不能去修改老状态,返回一个新状态
	return 
}
const intialState = {
	count: 0,
	// list: []
}
// 记得导入,然后定义,接收一个函数,和一个默认值
export default ()=>{
	// 必须定义在hooks里,函数式组件内,配合useContext使用
	const [state, dispatch] = useReducer(reducer, intialState)
	return <div>
		{state.count}
		<button onClick={()=>{
			dispatch({type:"add"})
		}}>+</button>
		<button onClick={()=>{
			dispatch({type:"minus"})
		}}>-</button>
	</div>
}
```

### 自定义hooks
定义以use开头的函数,内部可以使用其他use方法,前面提到了hooks只能在函数式组件内使用,这里可以封装抽离

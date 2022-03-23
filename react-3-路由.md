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
# React 路由

### 目录
* [安装](#安装)
* [基础使用](#基础使用)
* [嵌套路由](#嵌套路由)
* [声明式导航和编程式导航](#声明式导航和编程式导航)
* [动态路由与传参](#动态路由与传参)
* [路由拦截](#路由拦截)
* [路由模式](#路由模式)
* [withRouter](#withrouter)

## 路由
<small>路由是根据不同的url地址展示不同的内容或页面.将组件映射到url</small>

### 安装
```
npm install react-router-dom@5
```

### 基础使用
<small>HashRouter, Route, Redirect, Switch 等使用</small>
<small>基础路由 | 路由重定向:模糊匹配,精确匹配 | Switch:依次匹配 | 精确匹配下的404路由</small>
```js
import React,{Component} from 'react'
import {HashRouter, Route, Redirect, Switch} from 'react-router-dom'
export default ()=>{
	return <div>
		<HashRouter>
			// 无Switch时,刷新总是模糊匹配到 Redirect
			<Switch>
				// 1. 路由对应组件,匹配路由返回组件
				<Route path="/films" component={Films}/>
				// 2. 路由重定向,from是模糊匹配,匹配所有"/"开头的路由	
				// exact属性表示精确匹配
				<Redirect from="/" to="/films" exact/>
				// 3. 若switch匹配失败,在没有模糊匹配的情况下,则一定显示下面组件				
				<Route component={NotFount}/>
			</Switch>
		</HashRouter>
	</div>
}
```

### 嵌套路由
```js
// 在films组件DOM中添加如下代码
<Switch>
	// 此时上一级"/films"路由不能加exact,否则匹配不进来
	<Route path="/films/son1" component={son1}/>
	<Redirect from="/films" to="/films/son1" exact/>		
	<Route component={NotFount}/>
</Switch>
```

### 声明式导航和编程式导航
```js
// 声明式:注意有个#号
<a href="#/flims">电影</a>
// 内部提供,需要写在HashRouter内
<NavLink to="/flims" activeClassName="active">电影</NavLink>

// 编程式导航
window.location.href = "#/flims"
// 通过Route显示的组件实际是Route的子组件,可以接收到特殊Props
props.history.push('/flims/${变量}')
// 还有useHistory
```

### 动态路由与传参
```js
// 1.通过路由接收参数
// 用冒号表示动态内容
<Route path="/films/:myid" component={Films}/>
// props.match.params.myid获取

// 2.通过query传参--无法通过分享链接重新进入页面
props.history.push({pathname:"/films",query:{id:id}})
// props.location.query.id访问

// 3.state传参--无法通过分享链接重新进入页面
props.history.push({pathname:"/films",state:{id:id}})
// props.location.state.id访问
```

### 路由拦截
	// 用render取代component返回一个组件
	// 这里的Center组件不是Route的子组件,需要接收参数才有props
	<Route path="/films" render={(props)=><Center {...props} />} 

### 路由模式
hash模式,总是带有#号   
BrowserRouter取代HashRouter,取消#号   
BrowserRouter会真的向后端发送请求,后端没有对应的路径处理,就会404,需要定向到index.HTML

### withRouter
```js
import {withRouter} from 'react-router-dom'
// 将FilmItem组件包装成withFilmItem组件
// 之后使用withFilmItem, FilmItem内自动获得props.history等属性
const withFilmItem = withRouter(FilmItem)
```

# JS设计模式
[参考链接](https://www.bilibili.com/video/BV1MP4y127kd/)
[toc]

## 设计模式介绍

* 设计模式是我们在解决问题的时候针对特定问题给出的简洁而优化的处理方案

* 在JS设计模式中，最核心的思想：封装变化

* 将变与不变分离，确保变化的部分灵活、不变的部分稳定

## 构造器模式

```js
// 如果要设置多个结构相同的数据
var employee = {
    name: 'name',
    age: 18
}
// 通过构造器，则只用关心变化的部分
function Employee(name, age){
    this.name = name
    this.age = age
    this.say = function(){
       // 每个数据在new时开辟新的空间很合理
       // 但是相同的函数就不应该每次都重新开辟了
       // 这将通过原型模式解决
    }
}
var emp = new Employee('name', 18)
```

## 原型模式

```js
// 挂载到原型上避免重复开辟空间
Employee.prototype.say = function(){

}
// ES6 Class 新语法
class Employee{
    constructor(name, age){
        this.name = name
        this.age = age
    }
    // 这里书写的方法就是挂载在原型上
    say(){

    }
}
```

## 工厂模式

由一个工厂对象觉得创建某一种产品对象类的实例。主要用来创建同一类对象

```js
function userFactory(role){

    function user(role, pages){
        this.role = role
        this.pages = pages
    }

    switch(role){
        case "superadmin":
            return new User("superadmin",["superadmin_page_role"])
        case "admin":
            return new User("admin",["admin_page_role"])
        case "editor":
            return new User("editor",["editor_page_role"])
        default:
            throw new Error("参数错误")
    }

}

class User{
    constructor(role, pages){
        this.role = role
        this.pages = pages
    }
    static say(role){
        switch(role){
            case "superadmin":
                return new User("superadmin",["superadmin_page_role"])
            case "admin":
                return new User("admin",["admin_page_role"])
            case "editor":
                return new User("editor",["editor_page_role"])
            default:
                throw new Error("参数错误")
        }
    }
}
```

## 抽象工厂模式

抽象工厂并不直接生成实例，而是对于产品类簇的创建
[abstract](https://www.bilibili.com/video/BV1MP4y127kd?p=7&spm_id_from=pageDriver&vd_source=093d3cdb4e11e07ed9420a6dcfd99c97)
```js
class User{
    constructor(name, role, pages){
        this.name = name
        this.role = role
        this.pages = pages
    }
    welcome(){}
    dataShow(){
        //abstract
        throw Error("抽象方法需要被实现")
    }
}
class Admin extends User{
    // 新增自己的方法，复写dataShow方法
}
```

## 建造者模式

建造者模式属于创建型模式的一种，提供一种创建复杂对象的方式，它将一个复杂的对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示

创造者模式是一步步的创建一个复杂的对象，它允许用户只通过指定复杂的对象的类型和内容就可以构建它们，用户不需要指定内部的具体构造细节

建造者模式将一个复杂对象的构建层与其表示层相互分离，同意的构建过程可采用不同的表示。工厂模式主要是为了创建对象实例或者类簇（抽象工厂），关心的是最终产出的是什么，而不关心创建过程。而建造者模式关心的是这个对象的整个过程，甚至于创建对象的每一个细节

## 单例模式

1. 保证一个类仅有一个实例，并提供一个访问它的全局访问点
2. 主要解决一个全局使用的类频繁地创建和销毁，占用内存

```js
var Singleton = (function(){
    var instance
    function User(name, age){
        this.name = name
        this.age = age
    }
    return function(name, age){
        if(!instance){
            instance = new User('name',100)
        }
        return instance
    }
})()
// ES6
class Singleton{
    constructor(name, age){
        if(!Singleton.instance){
            this.name = name
            this.age = age
            Singleton.instance = this
        }
        return Singleton.instance
    }
}
```

## 装饰器模式

装饰器模式能够很好的对已有功能进行拓展，这样不会更改原有的代码，对其他的业务产生影响，这方便我们在较少的改动下对软件功能进行拓展

```js
Function.prototype.before = function(beforeFn) {
    var _this = this
    return function(){
        beforeFn.apply(this, arguments)
        return _this.apply(this, arguments)
    }
}

Function.prototype.after = function(afterFn) {
    var _this = this
    return function(){
        let ref = _this.apply(this, arguments)
        afterFn.apply(this, arguments)
        return ref
    }
}
```

##  适配模式

将一个类的接口转换成客户希望的另一个接口，设配器模式让那些接口不兼容的类可以一起工作

将书写不同，功能相同的接口包装成书写相同，统一的模式

## 策略模式

策略模式定义了一系列算法，并将每个算法封装起来，使它们可以相互替换，且算法的变化不会影响使用算法的客户。策略模式属于对象行为模式，它通过对算法进行封装，把使用算法的责任和算法的实现分割开来，并委派给不同的对象对这些算法进行管理。

该模式主要解决在有多种算法相似的情况下，使用if...else 所带来的复杂和难以维护。它的优点是算法可以自由切换，同时可以避免多重if...else判断，且具有良好的扩展性。

## 代理模式

Proxy，为其他对象提供一种代理以控制这个对象的访问

代理模式使得代理对象控制具体对象的引用，代理模式几乎可以是任何对象：文件资源

```js
class Star{
    play(){console.log('演习')}
}
class StarProxy{
    constructor(){
        this.superStar = new Star()
    }
    talk(price){
        if(price >= 10000){
            this.superStar.play()
        }else{
            throw new Error('价钱不合适')
        }
    }
}
let jr = new StarProxy()
jr.talk(10000)
// ES6拥有的代理对象
new Proxy(obj,{
    get(target,key){
        return target[key]
    },
    set(target,key,value){
        target[key] = value
    }
})
```

## 观察者模式

观察者模式包含观察目标呵观察者两类对象

一个目标可以有任意数目的与之像以来的观察者

一旦观察目标状态发生改变，所有的观察者都将得到通知

当一个对象的状态发生改变时，所有依赖它的对象都得到通知并自动更新，解决了主体对象与观察者之间功能的耦合，即一个对象状态改变给其他对象通知的问题

```js
class Subject{
    constructor(){
        // if(!Subject.observer){
            this.observer = []
        //     Subject.observer = this
        // }
        // return Subject.observer
    }
    add(){
        this.observer.push(...arguments)
    }
    remove(){/*移除观察的方法*/}
    notify(){
        this.observers.forEach(item=>{
            item.update()
        })
    }
}
class Observer{
    update(){
        console.log('Update')
    }
}
const sub = new Subject()
const ob1 = new Observer()
const ob2 = new Observer()
sub.add(ob1,ob2)
```

优势：目标者与观察者，功能耦合度降低，专注自身功能逻辑，观察者被动接受更新，时间上解耦，实时接受目标者更新状态

缺点：观察者模式虽然实现的对象间依赖关系的低耦合，但却不能对事件通知进行细分管控，如“筛选通知”，“指定主题事件通知”

## 发布订阅模式

观察者和目标要相互知道

发布者和订阅者不用互相知道，通过第三方实现调度，属于经过解耦合的观察者模式

```js
const PubSub = {
    message: {
        A: [],
        B: []
    },
    publish(type, data){
        if(!this.message[type]) return
        this.message[type].forEach(item=>item(data))
    },
    subScribe(type, cb){
        if(!this.message[type]) return
        this.message[type].push(cb)
    },
    unsubScribe(type, cb){
        // 取消订阅
    }
}

const test1 = msg=>console.log('test1', msg)
const test2 = msg=>console.log('test2', msg)
// 添加订阅
PubSub.subScribe('A', test1)
PubSub.subScribe('B', test2)
PubSub.publish('A','ceshi')
```

## 模块模式

模块化模式最初被定义为在传统软件工程中为类提供私有和公共封装的一种方法。

能够使一个单独的对象拥有公共／私有的方法和变量，从而屏蔽来自全局作用域的特殊部分。这可以减少我们的函数名与在页面中其他脚本区域内定义的函数名冲突的可能性。

闭包是实现模块化的一种方式，ES6 import

```html
<script type='module'>
    import obj from 'src/*.js'
</script>
```

module模式使用了闭包封装“私有”状态和组织。它提供了一种包装混合公有／私有方法和变量的方式，防止起泄露至全局作用域，并与别的开发人员的接口发生冲突。通过该模式，只需要返回一个公有的API，而其他的一切则都维持在私有闭包里。

## 桥接模式

桥接模式：将抽象部分与它的实现部分分离，使它们都可以独立地变化。

使用场景：一个类存在两个或多个独立变化的维度，且这两个维度都需要进行扩展

优点：把抽象与实现隔离开，有助于独立地管理各组成部分。

缺点：每使用一个桥接元素都要增加一次函数调用，这对应用程序的性能会有一些负面影响——提高了系统的复杂程度。

```js
function Aodi1(engine){
    this.engine = engine
}
// 很像 抽象类
Aodi1.prototype.platform = function(){
    console.log("aodi1 平台")
}
Aodi1.prototype.loadEngine = function(){
    this.engine.run()
}

function V6(){
    this.run = function(){console.log("v6")}
}
function V8(){
    this.run = function(){console.log("v8")}
}

new Aodi1(new V6())
```

## 组合模式

组合模式在对象间形成树形结构

组合模式中基本对象和组合对象被一致对待

无须关心对象有多少层，调用时只需在根部进行调用

它在我们树型结构的问题中，模糊了简单元素和复杂元素的概念，客户程序可以向处理简单元素一样来处理复杂元素，从而使得客户程序与复杂元素的内部结构解耦。

## 命令模式

有时候需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道被请求的操作是什么。需要一种松耦合的方式来设计程序，使得发送者和接收者能够消除彼此之间的耦合关系。

命令模式由三种角色构成：

1. 发布者 invoker（发出命令，调用命令对象，不知道如何执行与谁执行
2. 接收者 receiver（提供对应接口处理请求，不知道谁发起请求
3. 命令对象 command（接收命令，调用接收者对应接口处理发布者的请求

```js
class Receiver{
    // 接受类
    execute(){
        console.log('接受者执行了请求')
    }
}
class Command{
    // 命令对象类
    constructor(receiver){
        this.receiver = receiver
    }
    execute(){
        console.log('命令对象》接收者》执行')
        this.receiver.execute()
    }
}
class Invoker{
    // 发布者类
    constructor(command){
        this.command = command
    }
    invoke(){
        console.log('发布者发布请求')
        this.command.execute()
    }
}

const storeHouse = new Receiver() // 仓库
const order = new Command(storehouse) // 订单
const client = new Invoker(order) // 客户
client.invoke
```

## 模板方法模式

模板方法模式由两部分组成，第一部分是抽象父类，第二部分是具体的实现子类。通常在抽象父类中封装了子类的算法框架，包括实现一些公共方法以及封装子类中所有方法的执行顺序。子类通过继承这个抽象类，也继承了整个算结构，并且可以选择重写父类的方法。
```js
var Container = function(params){
    var F = function(){}
    F.prototype.init = function(){
        this.getData()
        this.render()
    }
    F.prototype.getData = params.getData() || function(){
        throw new Error('必须传入getData')
    }
    F.prototype.render = params.render() || function(){}
    return F
}
```

## 迭代器模式

迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。迭代器模式可以把迭代的过程从业务逻辑中分离出来，在使用迭代器模式之后，即使不关心对象的内部构造，也可以按顺序访问其中的每个元素。

1．为遍历不同数据结构的“集合”提供统一的接口；

2．能遍历访问“集合”数据中的项，不关心项的数据结构
```js
// 让对象支持 for of 迭代
var obj = {
    code: 200,
    name: "name",
    list: [1,2,3],
    [Symbol.iterator]: function(){
        let index = 0
        return {
            next: () => {
                if(index < this.list.length){
                    return {
                        value: this.list[index++],
                        done: false
                    }
                }else{
                    return {
                        value: undefined,
                        done: true
                    }
                }
            }
        }
    }
}
```

## 职责链模式

使多个对象都有机会处理请求，从而避免了请求的发送者与多个接收者直接的耦合关系，将这些接收者连接成一条链，顺着这条链传递该请求，直到找到能处理该请求的对象。

原型链；事件捕获，冒泡，代理？


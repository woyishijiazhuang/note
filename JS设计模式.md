# [JS设计模式](https://www.bilibili.com/video/BV1MP4y127kd/)

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

将一个类的接口
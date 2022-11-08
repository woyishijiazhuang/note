# TypeScript入门([文档](https://www.tslang.cn/docs/handbook/basic-types.html))
## 一、什么是TypeScript
JavaScript的超集,可以编译成Javascript,适用于任何规模的项目.

### Typescript特性
“类型”是其最核心的特点.  
**JS是一门比较灵活的语言：**
* 它没有类型约束,是**动态类型**
* 拥有隐式类型转换
* 基于原型的面向对象编程,使得原型上的属性和方法可以在运行时修改

**TS是静态类型**  
* 在其编译成js时就会检查出错误
* ts拥有类型推论,可以让你不用声明类型,根据第一次的赋值决定
* 两者都是弱类型语言,包含隐式转换
* ts完全兼容js,不会修改js运行时的特性

## 二、安装并编译TypeScript
``` npm i -g typescript ```	
-g 命令在新版本的npm中被替换

``` tsc --outFile D:\js\index.js index.ts ```  	
指定路径编译

``` tsc --init ```
输出配置文件,配置es标准版本  
配置中更改编写时的要求,有时候undefined和null可以被赋值给任意类型的变量

[ts指南](https://www.runoob.com/typescript/ts-basic-syntax.html)	

## 三、TS基本数据类型
1. 布尔值:```let isDone: boolean = true```
2. 数值类型:```let num: number = 1```
3. (模板)字符串:```let myName: string = 'Tom'```
4. 空值:	
```js
// 变量定义空值没有意义,函数则表示没有任何返回值
let unusable: void = null 
let unusable2: void = undefined
function fun(name: string): void {
	alert(`my name is ${name}`)
}
// 可选参数
function fun(name?: string){}
```
5. 数组
```js
//可以在元素类型后面接上 [],表示由此类型元素组成的一个数组
let list: number[] = [1,2,3]
//使用数组泛型,Array<元素类型>
let list: Array<number> = [1, 2, 3]
```
6. Any  
在普通类型中不可以更改变量的类型,Any可以更改为任意值,并访问这些变量的任意(不存在也行)属性和方法.其返回值也是任意  
Object有相似的作用,就像它在其它语言中那样.但是 Object类型的变量只是允许你给它赋任意值 - 但是却不能够在它上面调用任意的方法,即便它真的有这些方法

7. 类型断言
```ts
// as 或 尖括号,
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas")
```

8. 元组Tuple | 枚举 | Object | Never | 
```ts
// 枚举
enum Direction {
	Up = 1,
	Down,//2
	Left,//3
	Right
}
```
9. 其他  
```js 
// 联合类型
let id: number | string
// 类型别名和接口的多个子元素之间,用逗号,分号,或者回车,都是可以的
// 类型别名和扩展
type Point = {
	x: number;
	y: number;
}
type SuperPoint = Point & {
	z: number
}
// type创建后不能用重新定义扩展,只能用&

// 接口和扩展
interface Point {
	x: number
}
interface SuperPoint extends Point {
	y: number4
}
// 添加字段,重新使用interface定义,不是覆盖而是合并，或者使用extends
```
10. 文字类型
```ts

// 好像是给数据进行枚举
let string: 'hello' | 'world' = 'hello'
let number: -1 | 0 | 1 = 0

// bigint symbol

```

## 四、函数
1. 函数类型表达式
```ts
// fn: (a: string) => void
// 规定函数的参数和返回值
type funtype = (a: string) => void
// 调用签名
type DescribableFunction = {
	description: string;//规定函数带有的其他属性
	(someArg: number): boolean //规定的函数参数和返回值
}
function doSomething(fn: DescribableFunction) {
	console.log(fn.description + 'return' + fn(6))
}
function fn1(n: number) {
	console.log(n)
	return !!n
}
fn1.description = 'hello'
```
```ts
//构造签名
class Ctor {
	s: string
	constructor(s: string) {
		this.s = s
	}
}
type SomeConstructor = {
	new (s: string): Ctor
}
function fn(ctor: SomeConstructor) {
	return new ctor('hello')
}
// ...
interface CallOrConstructor {
	new(s: string): Date
	(n?: number): number
}
function fn(date: CallOrConstructor) {
	let d = new date('2021-12-20')
	let n = date(100)
}
```
2. 泛型函数
```ts
// 重要:让输出的类型保持和输入相同
function firstElement<Type>(arr: Type[]): Type | undefined {
	return arr[0]
}
firstElement<string>(['a','b'])

// 泛型的Type名称事任意的,多个泛型可以用逗号隔开 
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
	return arr.map(func)
}
const parsed = map(['1','2','3'], (n)=>parseInt(n))

// 限制条件
function longest<Type extends {length: number}>(a: Type, b: Type): Type | undefined {
	return a.length >= b.length?a:b
}
```

3. 指定类型参数
```ts
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
	return arr1.concat(arr2)
}
// 拥有<string | number>才能输入两个不同类型的参数
const arr = combine<string | number>([1,2,3],['string'])
```
4. 如何编写优秀通用函数的准则
* 可能的情况下,使用类型参数本身,而不是对其进行约束
* 总是尽可能少的使用类型参数
5. 可选参数
```ts
function func(x?: number){
	// undefined | number
	// 或者选择添加默认初始值
}
```
6. 回调中的可选参数

7. 函数重载
8. 重载签名和实现签名
9. 如何编写好的重载函数
可能的情况下,使用联合类型参数,而不是重载函数
10. 函数内的this声明
ts与js不同,甚至可以使用类型约束[参考](https://www.bilibili.com/video/BV1H44y157gq?p=50&spm_id_from=pageDriver&vd_source=093d3cdb4e11e07ed9420a6dcfd99c97)

## 五、额外的其他类型
1. void 没有返回值的函数
2. object 指任何不是基元的值
3. unknown 代表任何值,与any类似,但更安全,对未知的unknown值做任何事情都是不合法的.
4. never 表示永远不会被观察到的值
5. Function

## 六、参数展开运算符
1. 形参展开
```ts
function func(...args: any[]){
}
```

2. 实参展开
```ts
// 展开运算符 ...
const args = [8, 5]
const angle = Math.atan2(...args)
// 此处,因为args被推断为数字数组,可以有多个元素,而atan2只能接受两个参数,所以会报错,应当推断成常量
const args = [8, 5] as const
```
3. 参数解构
```ts
function sum({a,b,c}:{a:number;b:number;c:number}) {
	console.log(a+b+c)
}
sum({a:10,b:3,c:9})
```
4. 返回void类型
一个具有void返回类型的上下文函数类型`(type vf = ()=>void)`,在实现时,可以返回任何其他的值,但他会被忽略.  
当一个字面的函数定义有一个 void 的返回类型时,该函数必须不返回任何东西.  
用变量定义函数时,用void限制返回,任然可以return,只是类型始终是void.用function定义时return直接报错

## 七、类型属性
1. 对象类型
```ts
function func(person:{name: string; age: number}){

}
// or
type Person = {
	name: string
	age: number
}
interface Person{
	name: string
	age: number
}
```

2. 属性修改器

可选属性: 在属性后面加个问号`arg?: string`  
接受参数时可以配置默认值，或在解构时配置

只读属性：
```ts
interface SomeType {
	readonly prop: string
}
// 如果prop的类型是个对象，那么内值是可以修改的
// 如果将以定义好的可修改类型数据分配给只读类型，作为兼容性考虑，最后是可以修改的
interface Person {
	name: string
	age: number
}
interface ReadonlyPerson {
	readonly name: string
	readonly age: number
}
let person: Person = {
	name: 'a',
	age: 10
}
let readonlyperson: ReadonlyPerson = person
readonlyperson.age++ //可以这样操作
```

3. 索引签名
```ts
// 限制索引为number，值为string
interface StringArray {
	[index: number]: string
}
const myArray: StringArray = ['a','b']
const secondItem = myArray[0]

// props是随意的名称,限制键为string，值为number
interface TestString {
	[props: string]: number
}
let testString: TestString = {
	x: 100,
	y: 200
}

// 混用
interface Animal {
	name: string
}
interface Dog extends Animal {
	breed: string
}
interface NotOkay {
	[index: string]: number | string
	length: number
	name: string
}
let notOkay: NotOkay = {
	x: 100,
	length: 100,
	name: 'felix'
}
// 与只读属性结合
interface ReadonlyStringArray {
	readonly [index: number]: string
}
```

4. 扩展类型

interfaace 的扩展，extends or 重新定义

5. 交叉类型

type的 & 扩展

6. 处理冲突

* interface的重复定义会让两个合并
* type的重复定义会报错

7. 泛型对象类型
```ts
// 让用户决定内容
interface Box<Type> {
	contents: Type
}
const box1: Box<string> = {
	contents: 'hello'
}

// 
interface Apple {
	// ···
}
type AppleBox = Box<Apple>

// 使用Type
type Box<T> = {
	contents: T
}
```

8. 类型操纵

* 泛型类型：函数输入类型与输出类型联系起来  
```ts
function func<Type> (arg: Type): Type {
	return arg
}
// <string>为编译器无法识别参数类型时加的推断
let output = func<string>('string')

// 泛型接口
interface GenericIdentityFn {
	<Type>(arg: Type): Type
}
function identity<Type>(arg: Type): Type {
	return arg
}
let myIdentity: <Type>(arg: Type) => Type = identuty
// 类似匿名接口
let myIdentity2: {
	<Type>(arg: Type): Type
} = identuty
// 让用户决定接口的类型
interface GenericIdentityFn<Type> {
	(arg: Type): Type
}
let myIdentity3: GenericIdentityFn<string> = identity
```
**泛型类** 
```ts
class GenericNumber<NumType> {
	zeroValue: NumType
	add: (x: NumType, y: NumType) => NumType
}
let myGeneric = new GenericNumber<number>()
myGeneric.zeroVaule = 0
myGeneric.add = function (x, y) {
	return x + y
}
```
**泛型约束**

```ts
function func<Type extends Lengthwise>(x: Type) {
	// 使用interface或type进行约束
}
function func<Type, Key extends keyof Type> (obj: Type, key: Key){
	// 使用extendes keyof 规定key是type中的一项
	// 可以返回任意类型
	return obj[key]
}
```
**在泛型中使用类类型**  
```ts
function create<Type>(c:{new():Type}):Type{
	return new c()
}
```
* keyof类型操作符
```ts
type Point = {x: number;y: number}
type P = keyof Point // 'x' | 'y'
const p1:P = 'x';const p2:P = 'y'
// B 为 number 类型
type B = keyof {
	[n: number]: string
}
// C 为 string | number 类型，因为在使用中括号索引访问时，c[0]和c['0']等价
type C = keyof {
	[k: string]: string
}
```
* typeof类型操作符
```ts
// typeof 对于组合类型帮助更大
let s = 'hello'
let n: typeof s
n = 'world'
// ReturnType获取函数返回的类型
type K = ReturnType<'这里填函数类型'>
```
* 索引访问类型
```ts
// type or interface 都是通过[]的形式获取属性类型
type Person = {
	age: number
}
type Age = Person['age'] // number类型

interface Person {
	name： string
	age： number
}
type P = Person['name' | 'age']
type P2 = Person[keyof Person]

// Person 是 {name: string, age: number}类型
const MyArray = [
	{ name: 'A', age: 12},
	{ name: 'B', age: 12},
	{ name: 'C', age: 12}
]
type Person = typeof MyArray[number]
type Person2 = typeof MyArray[number]['age'] // number类型
type Person3 = Person['age'] // number类型
```
* 条件类型
```ts
// SomeType extends OtherTYpe ? TrueType:FalseType
// 有助于描述输入和输出类型之间的关系
interface Animal {
	live(): void
}
interface Dog extends Animal {
	woof(): void
}
// type Example1 = number
type Example1 = Dog extends Animal ? number : string
type Example2 = RegExp extends Animal ? number : string
// 例子
interface IdLabel {
	id: number
}
interface NameLabel {
	name: string
}
function createLabel(id: number): IdLabel
function createLabel(name: string): NameLabel
function createLabel(nameOrId: string | number): IdLabel | NameLabel
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
	throw ''
}

type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel
function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
	throw ''
}

// 条件类型约束
type MessageOf<T> = T extends { message: unknowm } ? T['message'] : never
interface Email {
	message： string
}
type EmailMessageContents = MessageOf<Email>
```
**在条件类型内推理**  
```ts
// infer 待推断的类型
type Flatten<Type> = Type extends Array<infer Item> ? Item : Type
```
**分布式条件类型**  
```ts
type ToArray<Type> = Type extends any ? Type[] : never
type StrArrOrNumArr = ToArray<string | number>
// StrArrOrNumArr 类型是 string[] | number[], 不是 (string | number)[]

type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never
// 返回的是 (string | number)[]
```
* 映射类型
1. 类属性
```ts
class Point {
	x: number,
	y: number
	// cunstructor()
}
const pt = new Point()
```
2. readonly  
```ts
class Point {
	readonly name: string = 'world'
	constructor() {
		// readonly 标识的属性可以在构造函数中被修改
		this.name = 'hello'
	}
	func() {
		// 无法在类函数中修改readonly属性
	}
}
```
**构造器**
```ts
class Point {
	x: number;
	y: number;
	// 【构造函数不能有类型参数】，构造函数不能有返回类型注释
	constructor(x：number = 0, y: number = 0) {
		this.x = x;
		this.y = y;
	}
}
// 派生类需要在构造函数中使用super（）
```
**类里的方法**
```ts
// 类中的function可以有返回值，访问类成员时，需要this，否则访问的是类外边的变量

// Getters/Setters 访问器
class C {
	_length = 0
	get length() {
		return this._Length
	}
	set length(value) {
		this._length = value
	}
	// set length(value: number | string) {
	// 		注意这里没有对转换后的值进行NaN验证
	// 		this._length = Number(value)
	// }
	// 读取和设值会自动运行这两个函数，可以做劫持
	// 如果只存在get，而没有set，则该属性自动是只读的
	// 如果没有指定setter参数的类型，它将从getter的返回类型中推断出来
	// 访问器和设置器必须又相同的成员可见性
}
let c：C = new C()
c.length = 100 // 外部使用时不带横杠

/*
如果不希望set只接受get返回限制的类型
可以设定更多的类型，在内部进行类型的转换
*/
```
**索引签名**
```ts
class MyClass {
	[s: string]: boolean | ((s: string) => boolean)

	check(s: string) {
		return this[s] as boolean	
	}
}
```
**类继承-implements子句**
```ts
interface Pingable {
	ping(): void
}
// 让类必须包含接口定义的属性，使用implements，多个接口用逗号分隔
class Sonar implements Pingable {
	ping() {
		console.log('ping!')
	}
}

// 接口的限制并不是强制相等的，可以做兼容处理
interface Checkable {
	check(name: string): boolean
}
class NameChecker implements  Checkable {
	check(s: string | number) {
		return true
	}
}
```
**extends子句**

extends可以继承所有属性方法，再实现自己的属性方法，多个继承用逗号隔开

**重写方法**

同名即可覆盖，覆盖时，类型需要兼容，类似方法的重载

**implements 与 extends 的区别**

extends（继承）：一个新的接口或者类，从父类或者接口继承所有的属性和方法，不可以重写属性，但可以重写方法

implements（实现）：实现，一个新的类，从父类或者接口实现所有的属性和方法，同时可以重写属性和方法，包含一些新的功能

**初始化的循序**

```ts
class Base {
	name  = 'base'
	constructor() {
		console.log(`My name is ${this.name}`)
	}
}
class Derived extends Base {
	name = 'derived'
	cunstructor() {
		super()
		// console.log(this.name)
	}
}
// 打印的Base,如果都由构造函数，先运行基类的
const d = new Derived()
```
**继承ts内置类型**
```ts
class MsgError extends Error {
	constructor(m: string) {
		super(m)
		// 低版本的的es编译后会出错，可以手动指定原型, 这里好像写错
		Object.setPrototyoeOf(this, MsgError.prototype)

	}
	sayHello() {
		return 'hello' + this.message
	}
}
const msgError = new MsgError('world')
console.log(msgError.sayHello())
```
**成员的可见性**

```ts
// public: 公开的，默认值，任何对象在任何地方都可以访问
// protected: 受保护的，能在当前类或子类中访问，子类可以修改父类的权限，protected => public
// private: 只能在当前类中进行访问
// TS允许跨实例的private访问
```
static：静态成员，可以通过类名直接调用，可被继承

避免使用name length call 等不安全的名称

静态成员可以设置访问性`public static prop = 0`

类里的static区块
```ts
class Foo {
	// 平时无法用Foo.#count访问
	static #count = 0
	get count() {
		return Foo.#count
	}
	// static{}表示可以在这里使用Foo.#count访问
	static {
		try {
			const lastInstance = {
				length: 100
			}
			Foo.#count += lastInstance.length
		}
		catch {

		}
	}
}
```
**泛型类**
```ts
class Box<Type> {
	contents: Type
	constructor(value: Type) {
		this.contents = value
	}
	// 静态成员不可以用泛型
}
const b = new Box('str' ) // 自动推断b的类型
const b: Box<string> = new Box('str' )
const b = new Box<string>('str' )
```
**类运行时中的this**
```ts
// 不太懂
``` 
**this类型**
```ts
class Box {
	content: string = ''
	set(value: string) {
		this.content = value
		return this
	}
	sanmeAs(other: this) {
		return other.content === this.content
	}
}

class ClearableBox extends Box {
	clear() {
		this.content = ''
	}
}

const a = new ClearableBox()
const b = a.set('str') // b is ClearableBox {content: 'str'}

class DeriveBox extends Box {
	otherContent: string = ''
}

const base = new Box()
const derived = new DeriveBox()
// derived.sameAs(base) 报错,base不是this类型
// this作为一个类型。。。太难了
```
**基于类型守卫的this**
```ts
class FileSystemObject {
	isFile(): this is FileRep {
		return this instanceof FileRep
	}

	isDirectory(): this is Directory {
		return this instanceof Directory
	}

	isNetworked(): this is Networked & this {
		return this.networked
	}

	cunstructor(public path: string, private networked: boolean) {
		
	}
}
class FileRep extends FileSystemObject {
	constructor(path: string, public contentL string) {
			super(path, false)
	}
}
class Directory extends FileSystemObject {
	children: FileSystemObject[]
	constructor() {
		super('', false)
		this.children = []
	}
}
interface Networked {
	host: string
}
const fso: FileSystemObject = new FileRep('foo/bar.txt', 'foo')
if (foo.isFile()) {
	// const fso: FileRep
	fso.content
} else if {
	// const fso: Directory
	fso.children
} else if (fso.isNetworked()) {
	fso.host
}
```

**参数属性**
```ts
// 用修饰符 修饰参数,取消了定义和赋值初始化
class Params {
	// 1. public readonly x: number
	(public readonly x: number, protected y: number, private z: number) {
		// 初始化的简单写法
		// 1. this.x = x
	}
}
```

**类表达式**
```ts
// <!-- 类表达式不需要名字 -->
const someClass = class<Type> {

}
const m = new someClass('hello')
```
**抽象类和成员**
```ts
abstract class Base {
	// 抽象方法不能去实现
	abstract getName(): string;
	printName() {
		console.log(`Hello,${this.getName}`)
	}
}
// 抽象类不能直接实例化，需要子类继承
class Derived extends Base {
	getName()  {
		return 'world'
	}
}
// 只能实例化子类
const b = new Derived()

// 抽象类的签名
function greet(ctor: typeof Base) {
	// const instance = new ctor() // error
}
function greet(ctor: new() => Base) {
	const instance = new ctor()
}
// 接受参数时，任然是子类（这里可以用泛型加extends约束嘛？）
greet(Derived)
```
**类之间的关系**
```ts
// 1.相同的类,比较的是成员属性和类别，值可以不同
class Point1 {
	x = 0
	y = 0
}
class Point2 {
	x = 0
	y = 0
}
const p: Point1 = new Point2()

// 2.没有明确的继承也会存在子类（空的类是所有类的父类嘛？）
class Person {
	name: string = ''
	age: number = 100
}
class Emplyee {
	name: string = ''
	age: number = 23
	salary: number = 10
}
const p: Person = new Emplyee()

```
* 模板字面量类型 

## 八、模块

1. 如何定义JS模块

	在顶部拥有 import export 声明的文件

2. ES模块语法
```ts
export default function helloWord() {
	// 非默认导出需要解构，更换名称用 as
}

// 另一个文件中，如果是ts文件，是没有后缀的
import hello from "./hello.js"
hello()

//默认 和 非默认一起导入
import A，{pi as Π} from "./..lujing"
```

**TS特定的ES模块语法**
```ts
export type
import type
Import { type cat }
import { func, type Cat, type Dog }
```
**ES模块语法与CommonJS行为**
```ts
import fs = require("fs")
const code = fs.readFileSync("hello.ts","utf8")
```
**CommonJS语法**
```ts
// 导出
module
moudule.exports = {
	// 
}
exports.absolute = absolute

// 导入
const maths = require('./maths')
```
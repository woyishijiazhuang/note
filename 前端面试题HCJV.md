<!-- <style>
    * {
        font-family: Consolas !important;
    }
</style> -->
# [面试题](https://www.bilibili.com/video/BV1ZY4y1L7am/?spm_id_from=333.788.recommend_more_video.3&vd_source=093d3cdb4e11e07ed9420a6dcfd99c97)

1. HTML/CSS面试题
2. H5C3面试题
3. JS面试题
4. Vue面试题
5. 数据结构
6. 常规算法

## 基础篇

### HTML面试题

> 1. 行内元素有哪些？块级元素有哪些？空（void）元素有哪些？
    
    行内元素：`span img input ···`
    块级元素：`div footer header section p h1~h6···`
    空元素：`br hr`
    可以用`css`的`display`属性控制

> 2. 页面导入样式时，使用link和@import有什么区别？

    区别一：link先有，后有@import（兼容性，先出的link更好）  
    区别二：先加载标签link，后加载@import
    link标签是在html内的，@import是css在头部引用其它css文件用的

> 3. title与h1的区别、b与strong的区别，i与em的区别？

    title是网站的信息概括，告诉搜索引擎和用户网站的内容
    h1是网页内内容的总结，文章主体内容
    title显示在网页标题上，h1显示在网页上
    title在seo上非常重要，网站的logo总是用h1包裹

    b i 只是样式的改变
    strong em 是加强语气的标签，带有强调的效果
    i更多的用在字体图标上，em用在专业术语上

> 4. img的title属性和alt有什么区别？

    title属性是鼠标悬停图片上时出现的值
    alt时图片为正常加载时显示的值
    alt是给seo描述图片内容的

> 5. png jpg gif 这些图片格式解释一下，分别什么时候用？

    png：无损压缩，体积大，适合小图标，支持透明
    jpg：压缩算法，体积小一些
    gif：动图
    webp：同时支持有损和无损压缩，兼容性差一些

## CSS面试题

> 1. css盒子模型

    标准盒子模型：W3C标准 margin border padding content
    IE盒子模型：margin Content（border padding content）
    盒子模型css属性box-sizing：border-box/content-box（默认值，标准盒子模型）

> 2. line-height和hight的区别

    文字行高与元素的高度，行高可以撑起容器的高度

> 3. CSS的选择符有哪些？哪些属性可以继承？[参考](https://www.w3school.com.cn/cssref/css_selectors.asp)

    CSS选择符：
    通配 *
    id选择器 #
    类选择器 .
    标签选择器 标签名
    相邻选择器 + 下一个元素
    属性选择 div[带有的属性] a[herf]
    伪类选择器
    !important

    CSS属性那些可以继承：
    文字属性 font-size color line-height text-align···

> 4. CSS优先级算法

    css具有，继承性 层叠性 优先级
    四个维度【a，b，c，d】
    ！important 无穷大
    内联占第一个
    id占第二个
    类 伪类占第三个
    标签占第四个
    通配符、子选择器、相邻选择器等的不占权重，但任然比继承的样式优先

> 5. css画三角形

    用边框,内容为0时，边框是三角形，配合transparent透明边框形成三角形

> 6. 一个盒子不给宽高，怎么水平居中

    css内：{
        // 如果是作为父元素的唯一子元素，可以给父元素设置flex布局
        display: flex;
        justify-content: center;
        align-items: center
    }
    or
    css内：{
        // 父元素要设置 position：relative
        position: absolute;
        left: 50%;
        top: 50%;
        tansfrom: translate(-50%, -50%);
    }

> 7. display有哪些值？有什么作用？[参考](https://www.w3school.com.cn/cssref/pr_class_display.asp)

> 8. 对BFC(block formatting context)的理解。

    BFC就是页面上一个隔离的独立容器，容器里面的元素不会影响到外部的元素
    触发BFC：
        float的值非none
        overflow的值非visible
        display的值为inline-block table-cell flex、table-caption或者inline-flex
        position的值为 absoute fixed

> 9. 清楚浮动有哪些方式？

    1. 触发BFC可以
    2. 尾部添加额外块元素，css增加clear：both；
    3. 使用伪类 ：after代替第二种方案
        bq:after {
            content: '';
            display: block;
            clear: both;
        }
    
> 10. 在网页中应该使用奇数还是偶数的字体？

    偶数，首先普通的元素使用偶数宽高方便开发，其次中文字体是属于对称字体，偶数字体会更好看

> 11. position有几种值，分别是根据什么定位的？

    static：默认值，没有定位
    fixed：固定定位，相对于浏览器窗口
    relative：相对（自己）定位，不脱离文档流
    absolute：相对于第一个带有定位的父元素，脱离文档流
    sticky：粘性定位 css3新增
    inherit：继承

> 12. 写一个左中右布局，左右宽度固定，中间自适应，优先加载中间块

    1. 加载顺序是根据htnl文档顺序的，遇事不决上定位
    2. 使用flex布局
    3. float配合负margin，中间块配合padding

> 13. 什么是reset.css

    清除css默认样式的文件
    Normalize.css 增强跨浏览器的css一致性

> 14. css sprite是什么（雪碧图，精灵图），有什么优缺点？

    是什么？把多个小图标做成一个大图
    使用时需要用background-position调整位置
    减少了http请求的次数，提升了性能
    不太好修改维护

> 15. display:none visibility:hidden的区别

    两者都是隐藏元素，但是前者不占位置，后者任然占有位置
    解析渲染时会有区别

> 16. opacity rgba 的区别

    都能实现透明效果
    1. opacity 取值[0,1] 0表示完全透明，可以继承
    2. rgba 表示红绿蓝，a表示透明度，更多的表现在背景上

## JS面试题

> 1. 延迟加载JS有哪些方式？ 

    1. 动态创建script标签 或 settime函数
    2. <script async type="text/javascript" src="demo.js"></script> 在html解析过程中下载执行，先加载完的先执行
    3. <script defer type="text/javascript" src="demo.js"></script> 在html解析过程中下载，解析完后执行，有多个js顺序执行
    4. 在html文档中放在所有dom元素下面

> 2. JS数据类型有哪些？

    基本类型：string number boolean undefined null symbol bigint
    引用类型：object（）

    相关问题：类型的隐式转换

> 3. null 和 undefined 的区别

    1. 设计时先有null，借鉴java，null被设计成了对象
    2. null会被隐式转换成0，很不容易发现错误Number(null)=0 Number(undefined)=NaN
    3. 先有null后有undefined，表示无的值最好不要是引用类型

> 4. == === 的不同

    后者会比较类型，前者会有隐式转换（valueOf()函数转换）再比较

> 5. JS微任务和宏任务

    因为DOM的操作，决定JS脚本语言只能是单线程。
    单线程的JS如何执行异步？异步执行代码，事件循环。

    JS执行流程：同步执行完 ==> 事件循环
    事件循环（微任务，宏任务）
    进入事件循环：请求ajax 定时器 事件···
    微任务：promise.then
    宏任务：setTimeout
    每次执行宏任务前，都会把所有微任务执行完

> 6. JS作用域考题

    1. 除了函数外，js是没有块级作用域的
    2. 作用域链：内部可以访问外部的变量，优先找到最近的
    3. 注意声明是用的关键字，没有时会提升到全局变量
    4. js有变量（var）声明提升的机制（变量悬挂声明）
    5. 优先级，声明变量优先级>声明普通函数>参数>变量提升


> 7. JS对象考题

    对象是引用类型，存在堆里
    每个新对象都是new产生的，比较的总是引用地址而不是实际的内容 [1,2,3] == [1,2,3] //false
    对象的Key值总是字符串

    对象如何找属性or方法？顺着原型链

> 8. JS作用域+this指向+原型考题

    function Foo(){
        getName ＝ function()｛console.log(1)｝ ／／注意是全局的window．
        return this;
    }
    Foo.getName = function(){console.log(2)}
    Foo.prototype.getName = function(){console. log(3)}
    var getName = function(){console.log(4) }
    function getName(){ console.log(5) }

    Foo().getName(); //2
    getName();//4
    Foo().getName(); //1
    getName(); //1
    new Foo().getName(); //3
---
    var obj = {
        a: 10,
        b: {
            fn: function(){
                console.log(this.a);
                console.log(this);
            }
        }
    }
    obj.b.fn(); //undefined 和 对象b
---
    window.name='ByteDance';
    function A(){
        this.name = 123;
    }
    A.prototype.getA = function(){
        console.log( this );
        return this.name + 1;
    }
    let a = new A();
    let funcA = a.getA;
    funcA();
    // 打印 window ByteDance1
---
    var length = 10;
    function fn(){
        return this,length + 1;
    }
    var obj = {
        length: 5;
        test1: function(){
            // 闭包的情况下this总是指向window
            return fn();
        }
    }
    obj.test2 = fn;
    obj.test1(); // 1
    fn() === obj.test2(); // false
    obj.test1() === obj.test2(); // false

> 9. 判断变量是不是数组，有哪些方法？

    1. Array.isArray([1,2,3]) // ES6
    2. [1,2,3] instanceof Array // true
    [1,2,3] instanceof Object // 这也是true
    3. Object.prototype.toString.call([1,2,3]) // [object Array] 字符串
    4. Array.prototype.isPrototypeOf([1,2,3]) // true
    5. [1,2,3].constructor.toString() // [object Array] 字符串
    ps: '[object Array]'.indexOf('Array') > -1 

> 10. slice是干什么的,splice是否会改变原数组

    slice() 截取数组，不改变原数组
    arr.slice(start, end) 从start处开始选取（不包括该元素），从end处结束选取
    如果为空的话，那么选取从start到数组结束的所有元素。负数代表方向，从数组尾部开始计算位置

    splice() 更新数组，改变原数组
    arr.splice(index, howmany, item1, ..., itemX) 向/从数组中添加/删除项目，然后返回被删除的项目
    返回含有被删除的元素的数组，若没有删除元素则返回一个空数组。
    从index开始,删除howmany个元素,将item依次添加进删除的位置,没有空隙

> 11. 找出多维数组的最大值

    function(arr){
        var newArr = [];
        arr.forEach((item,index)=>{
            newArr.push(Math.max(...item))
        })
        return newArr
    }

> 12. 给字符串新增方法

    exp:添加指定前缀
    String.prototype.addPrefix = function(str=''){
        return str + this
    }

> 13. 找到字符串中出现次数最多的字符并统计次数

    // 注意in的用法,在数组索引或对象key里面找
    function(str){
        var maxStr = [];
        var maxStrNumber = 0;
        var sum = {};
        for(item of str){
            item in sum ? sum[item]++ : sum[item] = 1;

            if (sum[item] > maxStrNumber){
                maxStr = [item];
                maxStrNumber = sum[item];
            } else if (sum[item] == maxStrNumber){
                maxStr.push(item);
            }
        }

        return {
            maxStr: maxStr,
            maxStrNumber: maxStrNumber,
            sum: sum
        }
    }

> 14. new操作符具体做了什么

    1. 创建了一个空的对象
    2. 将空对象的原型指向构造函数的原型
    3. 将空对象作为构造函数的上下文(改变this执行)
    4. 对构造函数有返回值做一个判断处理,忽略基本类型,如果是引用类型,则会取代new 返回的新对象

> 15. 闭包

    1. 闭包是什么
        闭包是一个函数加上到创建函数的作用域的链接,闭包"关闭"了函数的自由变量
    2. 闭包可以解决什么问题
        内部函数可以访问到外部函数的局部变量,因为关闭了函数的自由变量,不会对变量进行回收
    3. 闭包的缺点
        变量始终驻留在内存中,造成内存损耗问题,低版本ie会造成内存泄漏
        需要把闭包的函数上设置为null解决

> 16. 原型链

    1. 原型可以解决什么问题
        对象共享属性和共享方法
    2. 谁有原型
        函数拥有prototype
        对象拥有__proto__ 

> 17. JS继承有哪些方式

    ES6 的class extends constructor() super()
---
    ES5 的原型链
    function Parent(){
        this.age = 20;
    }
    function Child(){
        this.name = '张三'
    }
    Child.prototype = new Parent();
---
    借用构造函数继承
    function Parent(){
        this.age = 20;
    }
    function Child(){
        Parent.call(this)
        this.name = '张三'
    }
---
    组合式继承
    function Parent(){
        this.age = 20;
    }
    function Child(){
        Parent.call(this)
        this.name = '张三'
    }
    Child.prototype = new Parent();

> 18. 说一下call bind apply的区别

    三者都是改变函数体内的this指向
    call：改变this指向并执行，fuc.call(other,arg1,arg2)
    bind：改变this指向但不执行，需要接受返回值再执行,fuc.bind(other,arg1,arg2)()
    apply：立即执行，更改this后，在第二个参数传入数组包含剩下的参数,fuc.call(other,[arg1,arg2])

> 19. sort背后的原理

    sort()方法用于对数组元素进行排序，并返回数组，默认排序是根据字符串Unicode码点。
    参数可选，为一个函数 arr.sort((a,b)=>(a-b)) 按照数字大小排序
    也可以根据对象中的某一个值进行排序

> 20. 深拷贝和浅拷贝

    基本类型和引用类型，浅拷贝只能复制基本类型，引用类型的拷贝任然会指向同一个内存地址，不会开辟新的空间

    简单的深拷贝: JSON.parse(JSON.stringify([1,2,3])),转成字符串再转对象，会丢失某些undefined的值
    or // 非尾递归会导致堆栈溢出
    function copyObj(obj){
        var newObj = Array.isArray(obj) ? [] : {}
        for(key of obj){
            if(typeof obj[key] == "object"){
                newObj[key] = copyObj(obj[key])
            }else{
                newObj[key] = Obj[key]
            }
        }
        return newObj
    }

> 21. localStorage sessionStorage cookie 的区别

    相同：在客户端存放数据,键值对
    localStorage：持久化存储，不删一直在 < 5M
    sessionStorage：关闭浏览器窗口就没了 < 5M
    cookie：自定义过期时间 < 4k

## H5C3面试题

> 1. 什么是语义化标签？

    header footer section button
    方便爬虫，方便阅读维护，IE8不兼容

> 2. ::before :after中的双冒号和单冒号有什么区别？

    :表示伪类  ::表示伪元素
    但是语法的不严谨让有些浏览器两者都可以使用
> 3. IOS优化

    1. 如何关闭IOS键盘首字母自动大写
        <input type="text" aoyocapitalize="off">
---
    2. IOS系统中元素被触摸时产生的半透明灰色遮罩怎么去掉
        a,button,input,textarea{
            -webkit-tap-highlight-color:rgba(0,0,0,0);
        }
---
    3. 禁止ios长按触发系统菜单、禁止ios Android长按时下载图片,禁止选择文字
        html,body{
            touch-callout: none;
            -webkit-touch-callout: none;
            user-select: none;
            -webkit-user-select: none;
        }        

> 4. 怎么让Chrome支持小于12px的文字?

    Chrome默认16px，小于12px需要CSS设置
        div{
            display: inline-block;
            -webkit-transform: scale(0.5);
        }

> 5. rem和em的区别

    当前父元素字体宽度 和 根元素设置的字体宽度

> 6. webkit表单输入框 placeholder 的颜色能改变嘛

    CSS伪元素 input::-webkit-input-placeholder{
        color: red;
    }

> 7. 自适应 

    媒体查询/window.onresize事件+rem单位调整，百分比布局，

> 8. 响应式

    一个页面同时可以适应PC和移动端
    响应式选择不同的图片：
    <picture>
        <source srcset="1.jpg" media="(min-width:1000px)">
        <source srcset="2.jpg" media="(min-width:700px)">
        <img srcset="3.jpg">
    </picture>
    懒加载图片：ntersectionObserver、标签的lazyload属性兼容性差点

> 9. 布局方案

    数据不是特别多，用户量不是特别大，纯展示类的项目适合响应式布局

## ES6面试题

> 1. var let const 的区别

    声明变量，最早有var，因为var没有块级作用域，所以加入了let
    let、const有块级作用域，并且没有变量提升，不可以重复声明同一个变量
    const用来定义常量，引用类型任然可以修改内部属性

> 2. 合并对象

    let obj = Object.assgin(obj1, obj2) // 相同属性，后者覆盖

    obj1 = {..obj1, ...obj2} //ES6

    or 最后，自己封装


> 3. 箭头函数和普通函数的区别

    1. this指向的问题，箭头函数中的this是在箭头函数定义时就决定的，而且是不可以修改的，指向定义时外层第一个普通函数的this
    2. 箭头函数不能new，不能做构造函数
    3. 箭头函数没有arguments，没有prototype

> 4. Promise有几种状态
    
    三种：pending进行中、fulfilled已成功、rejected已失败
    promise解决了异步操作中的地狱回调问题
    发展成=> Gennerator函数
    继续发展成=> async await

> 5. find filter 区别，some every区别

    都接受一个函数参数，函数依次接受每个数组项，返回boolen值
    find：返回具体内容，匹配到第一个元素
    filter：返回新数组

    都接受一个函数参数，函数依次接受每个数组项，返回boolen值
    some：有一个true就返回true
    every：每个都是ture最后才是true

> 6. for in , for of ， for each 的区别

    for of ES6 新增
    for in 会返回数组的索引，会碰到一些不存在的值【空】则不会返回索引，访问对象时是返回key
    for of 只能对数组使用，不会忽略【空】值=>变成undefined，是直接返回的值
    for of 和 forEach((item)=>{})

    for-in结构可以遍历 数组索引或对象键名，包括手动添加的键，甚至原型链上的键，而for-of在遍历值得时候无法遍历到手动添加的值或者通过原型添加的值。

## Vue面试题

渐进式框架，带有一系列组件可以扩展的，router vuex 等

MVVM框架：[链接](https://zhuanlan.zhihu.com/p/59467370)

> 1. vue2生命周期有哪些？

    组件创建：beforeCreate created、
    模板渲染：beforeMount mounted
    数据修改：beforeUpdate update
    组件销毁：beforeDestory destoryed
    keep-alive 专属：activited deactivated

> 2. 谈谈keep-alive的了解

    vue自带的缓存组件的组件，避免了组件的销毁和重新创建，保证了数据不会重新初始化，优化了性能，注意生命周期

> 3. v-if 和 v-for 的优先级

    v-for比v-if高，算是设计失误了吧

> 4. ref

    vue不建议直接操纵dom，所以给标签或组件加上ref进行访问

> 5. nextTick

    等待页面刷新后执行接受的回调函数，因为data
> 6. scoped原理

    给本组件的css加属性选择器，使得css只在本组件生效

    /deep/ div{} vue2的css穿透
    deep(div{}) vue3的css穿透

> 7. 组件通信

    父->子：子组件自定义属性props来自定义属性;父组件通过v-bind（：）绑定子组件

    子->父：在子组件中用this.$emit(事件名, 传参)来触发自定义事件;在父组件中用v-on（@）绑定事件

    兄弟间：新建EventBus并引入;发送方用bus.$emit(事件名, 传参);在接受方created中调用bus.$on(事件名，函数)
    
    eventBus.js #import Vue from 'vue'    export default new Vue()

> 8. computed methods watch 有什么区别？

    computed：计算属性，监听多个值的变化，返回一个值。有缓存，监听的数据没变不会多次执行函数。
    methods：没有缓存，在页面中每次调用都会执行一次。
    watch：监听单个值，监听数据的改变，并不会要求返回一个值。对象的监听有点不一样。

> 9. props和data的优先级谁更高？

    props > methods > data > computed > watch

> 10. Vuex有哪些属性？

    VueX是状态管理组件，state、getters、mutations、actions、modules

    state：类似data
    getters：类似计算属性
    mutations：类似方法，同步操作
    actions：类似方法，异步操作，但是要通过mutations操作
    modules：对以上的四个属性进行细分

> 11. Vuex是单向数据流还是双向数据流？

    单向

> 12. Vuex如何做持久化存储

    自己做或者插件，本质都是localStorage

> 13. Vue设置代理解决跨域

    vue.config.js 配置
    module.exports = {
        publicPath:'./', 
        devServer: {
            proxy: 'http://localhost:3000' 
        }
    }
    打包后代理设置就不生效了，只能解决开发时的跨域问题
    同样是修改vue.config.js的配置 publicPath，路由模式，history模式出现空白页需要后端配置

> 14.  代理和环境变量


> 15. Vue路由模式

    1. history：正常的，会发送请求，要后端配合
    2. hash：带#号，不会发送请求
    打包后前端自测要使用hash，history会出现空白页

> 16. SPA的优点和缺点

    SPA：单页面应用
    缺点：首页加载慢，SEO优化不好，需要服务器预渲染，性能会不好

> 17. vue路径传值

    vue-router，两种，query可以显示在地址里，params也可以不显示。

> 18. 路由导航守卫有哪些？

    1. 全局
        beforeEach(to, from, next)
        beforeResolve(to, from, next)
        afterEach(to, from)

    2. 路由独享
        beforeEnter(to, from, next)

    3. 组件内
        beforeRouteEnter(to, from, next)
        beforeRouteUpdate(to, from, next)
        beforeRouteLeave(to, from, next)

> 19. Vue动态路由

    路由后面跟冒号

> 20. Vue相关

    Vue模板解析
    Vue源码生命周期
    Vue添加事件
    data劫持
    更新视图
    v-model双向绑定原理
    diff算法，虚拟DOM
    for key的内部实现性能优化

## 其他

> 1. instanceof 原理

    const instanceofs = (target, obj) => {
        while(p){
            if(p == obj.prototype){
                return true
            }else{
                p = p.__proto__
            }
        }
        return false
    }

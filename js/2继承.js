// https://juejin.im/post/6854573210801995789


//1: 构造器继承

function fun(){
  this.name = 'fun'
}

fun.prototype.myLog = function() { console.info('mgLog->', this.name ) }


function Obj() {
    fun.call(this)
    this.type = 'child'
}

var o = new Obj()

console.info('o---->', o)

// 原理:通过call实现的继承本质只是改变了this的指向, 让父类里面的this指向了子类的上下文,这样父类里设置的属性，方法子类就可以使用了
// 缺点:不能继承父类原型上的属性与方法, 只能继承父类构造函数本身的属性和方法


//2: 原型链继承

function fun(){
  this.name = 'fun'
  this.arr = [1,2,3]
}

fun.prototype.myLog = function() { console.info('mgLog->', this.name ) }

function Obj(type){
  this.type = type
}

Obj.prototype = new fun()

Obj.prototype.__proto__ = fun.prototype


var obj1 = new Obj('o1')
var obj2 = new Obj('o2')
// 查找obj1(本身)---> (obj1.__proto__)Obj.prototype(fun实例) ---> （fun实例.__proto__）fun.prototype
console.info(obj1.myLog)
console.info(obj2.name)

// 原理: 通过原型__proto__向上继承父类所以属性和方法
// 缺点: obj1.__proto___ === obj2.__proto 当改变父类上属性时会相互影响
//!!!改变name未改变父类是因为, 设置属性时候会在自身查找，发现如果没有会在自身先设置name


//3: 构造函数+原型链接继承

function fun(){
  this.name = 'fun'
  this.arr = [1,2,3]
}

fun.prototype.myLog = function() { console.info('fun--->', 'myLog') }

function Obj(type){
  fun.call(this)
  this.type = type
}

Obj.prototype = new fun()


// 缺点: 当删除自身属性arr时候，原型链上仍然存在


//4: Object.create实现继承

function fun(){
  this.name = 'fun'
  this.arr = [1,2,3]
}

fun.prototype.myLog = function() { console.info('我是fun函数') }

function Obj(type){
  fun.call(this)
  this.type = type
}

Obj.prototype = Object.create()











 
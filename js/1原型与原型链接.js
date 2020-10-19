//https://juejin.im/post/6844903922138611725
//https://zhuanlan.zhihu.com/p/50494009


// 在js中万物皆对象，方法(Function)是对象，方法的原型（Function.prototype）是对象，对象具有属性（__proto__）称为隐式原型，对象的隐式原型指向构造该对象的构造函数的显式原型。
// JavaScript是基于原型的语言，因此语言本身至少要提供一个根对象，JavaScript根对象是 Object.prototype
// （有的人说跟对象是null，因为Object.prototype.__proto__为null，Object.prototype也是一个对象，只不过它是一个空的对象。）
// （记住一点：所有的原型都是对象，但不是函数，虽然函数也是对象，Object其实就是一个函数，而Object.prototype是一个对象）
// 我们在JavaScript遇到的每个对象，都是从Object.prototype对象克隆而来的。

// new的实现
function _new(fn,...args){
  //先用Object创建一个空的对象,
  const obj = Object.create(fn.prototype)  //fn.prototype代表 用当前对象的原型去创建
  //现在obj就代表Dog了,但是参数和this指向没有修改
  const rel = fn.apply(obj,args)
  //正常规定,如何fn返回的是null或undefined(也就是不返回内容),我们返回的是obj,否则返回rel
  return rel instanceof Object ? rel : obj
}
function _new(){
  var obj = new Object(null);
  var [Constructor, ...args] = [...arguments]
  obj.prototype = Constructor.prototype
  Constructor.apply(obj, args)
  return obj
}

// object的实现
// 1方法里面只有一个参数的时候用作继承
// 2第一个参数为null的时候说明将null复制给return的对象 实现一个纯净的对象
function create(o){
  var F = function(){}
  F.prototype = o
  return new F()
}

// instanceof的实现
// 用于判断一个变量是否某个对象的实例
// 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性

function _instanceof(A, B){
  var O = B.prototype // 显式原型
  A = A.__proto__; // 隐式原型
  while(true){
    if(A === null){
      return false
    }
    if (O === A){
      return true
    }
    A = A.__proto__
  }
}
"use strict";

/** 
 * 一、
 * 1. 函数默认值
 * ES6允许为函数的参数设置默认值，即直接卸载参数定义的后面
 * ES6写法的好处：
 * a.简洁
 * b.阅读代码的人，可以立刻意识到哪些参数是可以省略的，不用查看函数体或文档
 * c.有利于将来的代码优化，即使未来的版本在对外接口中，彻底拿掉这个参数，也不会导致以前的代码无法运行
 * 注意⚠️
 * 参数变量是默认声明的，所以不能用let或const再次声明。使用参数默认值时，函数不能有同名参数
*/
function log(x) {
  var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'world';
  console.log(x + y);
}

log('hello'); // helloworld

log('hello', 'Mary'); // helloMary

log('hello', ''); // hello

/** function foo(x,x,y=1) {
    // ....
    //报错
} **/
//参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。

var x = 99;

function sum() {
  var p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : x + 1;
  console.log(p);
}

sum(); // 100

sum(80); // 80

x = 100;
sum(); // 101

/** 
 * 2.与解构赋值默认值结合使用
*/

function func(_ref) {
  var x = _ref.x,
      _ref$y = _ref.y,
      y = _ref$y === void 0 ? 5 : _ref$y;
  console.log(x, y);
}

func({
  x: 12,
  y: 0
}); // 12,0

func({
  x: 10
}); // 12 5

func({}); //undefined 5
// func() //报错 TypeError:Cannot destructure property 'x' of 'undefined' as it is undefined

function func1() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      x = _ref2.x,
      _ref2$y = _ref2.y,
      y = _ref2$y === void 0 ? 5 : _ref2$y;

  console.log(x, y);
}

func1({}); //undefined 5

func1(); // undefined 5  如果没有提供参数，函数foo的参数默认为一个空对象。

function fetch(url, _ref3) {
  var _ref3$body = _ref3.body,
      body = _ref3$body === void 0 ? '' : _ref3$body,
      _ref3$methods = _ref3.methods,
      methods = _ref3$methods === void 0 ? 'Get' : _ref3$methods,
      _ref3$headers = _ref3.headers,
      headers = _ref3$headers === void 0 ? {} : _ref3$headers;
  console.log(methods);
}

fetch('https://www.baidu.com', {}); // 'Get'
// fetch('https://www.baidu.com') //报错
//将上述的fetch 改写为：

function fetchOne(url) {
  var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref4$body = _ref4.body,
      body = _ref4$body === void 0 ? '' : _ref4$body,
      _ref4$methods = _ref4.methods,
      methods = _ref4$methods === void 0 ? 'GET' : _ref4$methods,
      _ref4$headers = _ref4.headers,
      headers = _ref4$headers === void 0 ? {} : _ref4$headers;

  console.log(methods);
}

fetchOne('https://www.baidu.com'); // 'GET
// 写法一

function m1() {
  var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref5$x = _ref5.x,
      x = _ref5$x === void 0 ? 0 : _ref5$x,
      _ref5$y = _ref5.y,
      y = _ref5$y === void 0 ? 0 : _ref5$y;

  console.log([x, y]);
} // 写法二


function m2() {
  var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    x: 0,
    y: 0
  },
      x = _ref6.x,
      y = _ref6.y;

  console.log([x, y]);
}

m1(); // [0,0]

m2(); //[0,0]

m1({
  x: 1
}); //[1,0]

m2({
  x: 1
}); //[1,undefined]

m1({}); // [0,0]

m2({}); // [undefined，undefined]

/** 
 * 两种写法都对函数的参数设定了默认值。写法一的参数值是空对象，但是设置了对象解构的默认值
 * 写法二的参数默认值是一个具体的对象，没有设置对象解构的默认值
*/

/** 
 * 3.参数默认值的位置
 * 通常情况下，定义了默认值的参数，应该是函数的尾参数。
 * 因为这样比较容易看出来，到底省略了哪些参数。
 * 如果非尾部的参数设置默认值，实际上这个参数是没法省略的。
*/

function examOne() {
  var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var y = arguments.length > 1 ? arguments[1] : undefined;
  console.log([x, y]);
}

examOne(); // [1,undefined]

examOne(3); // [3,undefined]
// examOne(, 1)  //报错 SyntaxError: Unexpected token ','

examOne(undefined, 1); // [1,1]

function examTwo(x) {
  var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var z = arguments.length > 2 ? arguments[2] : undefined;
  console.log([x, y, z]);
}

examTwo(); // [undefined,1,undefined]
// examTwo(1, ,5) // 报错 SyntaxError: Unexpected token ','

examTwo(1, undefined, 5); //[1,1,5]

examTwo(1, 2); //[1,2,undefined]

examTwo(1, null, 2); // [1,null,2]
//有默认值的参数都不是尾参数。这时，无法只省略该参数，而不省略它后面的参数，除非显式输入undefined。
// ⚠️传入undefined可以出发参数默认值的情况，但是传入null则不会触发

/** 
 * 4. 函数的length属性
 * 返回的是没有指定默认值的参数个数
 * 如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了。
*/

console.log(function (a) {}.length); //1

console.log(function () {
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
}.length); // 0

console.log(function (a) {
  var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  var c = arguments.length > 2 ? arguments[2] : undefined;
}.length); // 1 

console.log(function (a, b) {
  var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
}.length); // 2

/** 
 * 作用域
*/

var examX = 1;

function f(examX) {
  var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : examX;
  console.log(y);
}

f(2); // 2

var examXX = 1;

function f1() {
  var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : examXX;
  return function () {
    var examXX = 2;
    console.log(y, 'y===');
  }();
}

f1(); // 1

function f2() {
  var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : examXXX;
  return function () {
    var examXXX = 2;
    console.log(y);
  }();
} // f2() //ReferenceError: examXXX is not defined


var y = 2;

function f3() {
  var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : y;
} //....
// f3() // ReferenceError: y is not defined
// 参数x = x形成一个单独作用域。实际执行的是let x = x，
// 因为y在全局已经定义了，let存在暂时性死区，所以报错
//如果参数的默认值是一个函数，该函数的作用域也遵守这个规则


var foo = 'outer';

function bar() {
  var func = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
    return foo;
  };
  var foo = 'inner';
  console.log(func());
}

bar(); //'outer'

function bar1() {
  var func = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
    return foo1;
  };
  var foo1 = 'inner';
  console.log(func());
} // bar1() //报错 ReferenceError: foo1 is not defined

/** var x = 1
function foo(x,y = function () {
    x = 2
}) {
    var x = 3
    y()
    console.log(x);
}
foo() // 3
console.log(x,'x==='); // 1
**/


var x1 = 1;

function foo1(x1) {
  var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
    x1 = 2;
  };
  x1 = 3;
  y();
  console.log(x1);
}

foo1(); // 2

console.log(x1, '===x==='); // 1

/** 
 * 二、rest 函数
 * ES6 引入 rest 参数（形式为...变量名），
 * 用于获取函数的多余参数，这样就不需要使用arguments对象了。
 * rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
*/

function sumNum() {
  var sum = 0;

  for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  for (var _i = 0, _values = values; _i < _values.length; _i++) {
    var val = _values[_i];
    sum += val;
  }

  console.log(sum);
  return sum;
}

sumNum(2, 3, 4); // 9
// function foos(a,...b,c){
// ...会报错
// rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。
// }
//可改写为

/** 
 * function foos(a,c,...b){
 *  //todo
 * }
*/
//函数的length属性，不包括 rest 参数。

console.log(function (a) {}.length); // 1

console.log(function () {}.length); // 0

/** 
 * 三、严格模式
*/
//ES5 严格模式

function a() {
  'use strict'; // code
} // ES6 严格模式；规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，
// 那么函数内部就不能显式设定为严格模式，否则会报错。
//设置严格模式的两种方式
// a.设定全局性的严格模式
// "use strict"
// function dosomething(){
//     //todo
// }
// b.把函数包在一个无参数的立即执行函数里面


var dosomething = function dosomething() {
  'use strict';

  return function () {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 42;
    return value;
  };
};
/** 
 * 四、name属性
*/

/** 
 * 五、箭头函数
*/
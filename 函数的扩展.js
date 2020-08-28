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
function log(x,y = 'world') {
    console.log(x + y);
}
log('hello') // helloworld
log('hello' ,'Mary'); // helloMary
log('hello','')// hello

/** function foo(x,x,y=1) {
    // ....
    //报错
} **/
//参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。
let x = 99
function sum(p = x + 1) {
    console.log(p);
}
sum() // 100
sum(80) // 80
x = 100
sum() // 101

/** 
 * 2.与解构赋值默认值结合使用
*/
function func({x,y = 5}) {
    console.log(x,y);
}
func({x:12,y:0}) // 12,0
func({x:10}) // 12 5
func({}) //undefined 5
// func() //报错 TypeError:Cannot destructure property 'x' of 'undefined' as it is undefined
function func1({x,y=5} = {}) {
    console.log(x,y);
}
func1({}) //undefined 5
func1() // undefined 5  如果没有提供参数，函数foo的参数默认为一个空对象。

function fetch(url,{ body = '',methods = 'Get',headers={} }) {
    console.log(methods);
}
fetch('https://www.baidu.com',{}) // 'Get'
// fetch('https://www.baidu.com') //报错

//将上述的fetch 改写为：
function fetchOne(url,{ body = '',methods = 'GET',headers = {}} = {}) {
    console.log(methods);
}
fetchOne('https://www.baidu.com') // 'GET
// 写法一
function m1({x = 0, y = 0} = {}) {
    console.log([x, y]);
}
  
// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
    console.log([x, y]);
}
m1() // [0,0]
m2() //[0,0]
m1({x:1}) //[1,0]
m2({x:1}) //[1,undefined]
m1({}) // [0,0]
m2({}) // [undefined，undefined]
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

function examOne(x=1,y) {
    console.log([x,y]);
}
examOne() // [1,undefined]
examOne(3) // [3,undefined]
// examOne(, 1)  //报错 SyntaxError: Unexpected token ','
examOne(undefined,1) // [1,1]

function examTwo(x,y=1,z) {
    console.log([x,y,z]);
}
examTwo() // [undefined,1,undefined]
// examTwo(1, ,5) // 报错 SyntaxError: Unexpected token ','
examTwo(1,undefined,5) //[1,1,5]
examTwo(1,2,) //[1,2,undefined]
examTwo(1,null,2) // [1,null,2]
//有默认值的参数都不是尾参数。这时，无法只省略该参数，而不省略它后面的参数，除非显式输入undefined。
// ⚠️传入undefined可以出发参数默认值的情况，但是传入null则不会触发

/** 
 * 4. 函数的length属性
 * 返回的是没有指定默认值的参数个数
 * 如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了。
*/
console.log((function(a){}).length); //1
console.log((function (a = 5){}).length); // 0
console.log((function (a,b= 3,c){}).length); // 1 
console.log((function (a,b,c = 3){}).length); // 2

/** 
 * 作用域
*/
let examX = 1
function f(examX,y = examX) {
    console.log(y);
}
f(2) // 2
let examXX = 1 ;
function f1(y = examXX) {
    let examXX = 2
    console.log(y,'y===');
}
f1() // 1

function f2(y = examXXX) {
    let examXXX = 2;
    console.log(y);
}
// f2() //ReferenceError: examXXX is not defined
let y = 2
function f3(y = y) {
    //....
}
// f3() // ReferenceError: y is not defined
// 参数x = x形成一个单独作用域。实际执行的是let x = x，
// 因为y在全局已经定义了，let存在暂时性死区，所以报错

//如果参数的默认值是一个函数，该函数的作用域也遵守这个规则
let foo = 'outer'
function bar(func = () => foo) {
    let foo = 'inner'
    console.log(func());
}
bar() //'outer'

function bar1(func = () => foo1) {
    let foo1 = 'inner'
    console.log(func());
}
// bar1() //报错 ReferenceError: foo1 is not defined


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



var x1 = 1
function foo1(x1,y = function () {
    x1 = 2
}) {
    x1= 3
    y()
    console.log(x1);
}
foo1() // 2
console.log(x1,'===x==='); // 1
/** 
 * 二、rest 函数
 * ES6 引入 rest 参数（形式为...变量名），
 * 用于获取函数的多余参数，这样就不需要使用arguments对象了。
 * rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
*/
function sumNum(...values) {
    let sum = 0
    for (const val of values) {
        sum += val
    }
    console.log(sum);
    return sum
}
sumNum(2,3,4) // 9
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
console.log((function(a){}).length); // 1
console.log((function(...a){}).length); // 0

/** 
 * 三、严格模式
*/
//ES5 严格模式
function a() {
    'use strict'
    // code
}
// ES6 严格模式；规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，
// 那么函数内部就不能显式设定为严格模式，否则会报错。
//设置严格模式的两种方式
// a.设定全局性的严格模式
// "use strict"
// function dosomething(){
//     //todo
// }
// b.把函数包在一个无参数的立即执行函数里面
const dosomething = (function () {
    'use strict';
    return function(value = 42) {
        return value;
    }
})

/** 
 * 四、name属性
*/

/** 
 * 五、箭头函数
*/
var f = v => v
console.log(f(2)); // 2
//如果函数不需要参数，或者需要多个参数，用圆括号表示
var add = (a,b) => {return a+b}
console.log(add(10,2)) //12
var add1 = (a,b) => a+b
console.log(add1(4,3)) // 7
// 箭头函数的一个用处是简化回调函数。
console.log([1,2,3].map(x=>x+x)) // [2,4,6]

//rest结合箭头函数的写法
const numbers = (...nums) => nums
console.log(numbers(1,2,3,4,5)) //[1,2,3,4,5]
const headAndTail = (head,...tail) => [head.tail]
console.log(headAndTail(1,2,3,4,5)) // [1,[2,3,4,5]]

/** 
 * 箭头函数注意事项：
 * 1、this指向 是定义是所在的对象，而不是使用时所在的对象
 * 2、不可以当作构造函数，也就是说，不能使用new 命令
 * 3、不可以使用arguments对象，该对象在函数体内不存在，如果使用的话，可用rest参数代替
 * 4、不能使用yield,因此箭头函数不能用作 Generator 函数
 * 第一点尤其值得注意。this对象的指向是可变的，但是在箭头函数中，它是固定的。
*/
function thisFunc(){
    setTimeout(()=>{
        console.log(`id:${this.id}`)
    },100)
}
var id = 21
thisFunc() //undefined
thisFunc.call({id:99}) // 99

function Timer() {
    this.s1 = 0;
    this.s2 = 0;
    // 箭头函数
    setInterval(() => this.s1++, 1000);
    // 普通函数
    setInterval(function () {
        this.s2++;
    }, 1000);
}

var timer = new Timer();

setTimeout(() => console.log('s1: ', timer.s1), 3100); // 3
setTimeout(() => console.log('s2: ', timer.s2), 3100); // 0
/** 
 * this指向的固定化，并不是因为箭头函数内部有绑定this的机制，
 * 实际原因是箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。
 * 正是因为它没有this，所以也就不能用作构造函数。
*/
//不适合的场合
// 第一个场合是定义对象的方法，且该方法内部包括this
const cat = {
    lives: 9,
    jumps: () => {
      this.lives--;
    }
} //箭头函数的this指向的是全局，在全局中没有lives的变量，因此，执行cat中的jump函数会报错

var button = document.getElementById('press');
button.addEventListener('click', () => {
  this.classList.toggle('on');
});
//button监听的事件应该是发生在button 上的，而不是全局的this，
// 在这个箭头函数中，this 指向全局的this，因此会报错
// 第二个场合是需要动态this的时候，也不应使用箭头函数。

/*** 
 *  六、尾调用优化
*/

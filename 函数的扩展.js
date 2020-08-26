/** 
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
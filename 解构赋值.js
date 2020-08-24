// let [a,b,c] = [1,2,3]
// console.log(a,b,c)
let [a,[b,c]] = [1,[2,3]]
console.log(a,b,c) // 1,2,3
let [head , ...tail] = [1,2,3,4]
console.log(head,tail) //1,[2,3,4]
// let [q,w,e] = [1,[2,3],4]
let [q,[w],e] = [1,[2,3],4]
console.log(q,w,e) 
//1,2,4
// 1,[2,3],4


// Set 结构也可以进行解构赋值
let [x,y,z] = new Set(['a','b','c'])
console.log(x,y,z); // 'a','b','c'

/**
 * ES6 解构赋值也可以使用默认值
 * **/
/**
 * ES6 内部使用严格相等运算符（===），判断一个位置是否有值.
 * 只有当一个数组成员严格等于undefined，默认值才会生效。
 * **/
let [foo = true] = []
console.log(foo,'foo====');
// let [foo1 = 'user'] = null
// console.log(foo1,'foo1=='); // TypeError: null is not iterable
let [exam = true] = [undefined]
console.log(exam,'exam=='); // true

let [ma,ya = 2] = [1,null]
console.log(ma,ya,'x,y==') 

/**
 * 对象的解构赋值,对象的属性没有次序，变量必须与属性同名，才能取到正确的值
 * **/
let {user,age} = {user:'Lili',age:24}
console.log(user,age);
let {username,keys} = {keys:'marys',username:'MAry'}
console.log(username,keys,'==username,keys==');
let {baz} = {fo:'user'}
console.log(baz,'==baz');
let {obj:baz1} = {obj:'aaa'}
console.log(baz1,'baz1===');

/** 
 * 函数参数的解构赋值
*/

function add([x,y]) {
    return x + y
}
console.log(add([1,2]),'=====');
let result = [[1,2],[2,3]].map(([a,b])=> a+b)
console.log( result,'===');


// function move({x = 0,y = 0} = {}) {
//     return [x,y]
// }
// move({x:3,y:8}) // [3,8]
// move({x:3}) // [3,0]
// move({}) // [0,0]

function move({x,y} = {x:0,y:0}) {
    return [x,y]
}

move({x:3,y:8}) // [3,8]
move({x:3}) //[3,undefined]
move({}) //[undefined,undefined]
move() // [0,0]


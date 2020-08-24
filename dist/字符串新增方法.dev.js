"use strict";

/** 
 * String.fromCodePoint() 
*/
var a = String.fromCodePoint(0x20BB7);
console.log(a, 'a===');
console.log(String.fromCodePoint(0x78, 0x1f680, 0x79) === "x\uD83D\uDE80y");
/** 
 * String.raw() 该方法返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，往往用于模板字符串的处理方法。
*/

var res = String.raw({
  raw: ['foo', 'baz']
}, 1 + 2);
console.log(res); // foo3baz

/** 
 * includes,startsWith,endWith
*/

var result = 'hello world';
console.log(result.includes('l')); // true

console.log(result.startsWith('h')); // true

console.log(result.endsWith('m')); // false
//第二个参数表示开始搜索的位置。

console.log(result.includes('l', 6)); //true

console.log(result.startsWith('h', 2)); // false

console.log(result.endsWith('m', 4)); // false

/** 
 * repeat()
*/

console.log(result.repeat('2')); // hello worldhello world

console.log('xxx'.repeat('4')); //xxxxxxxxxxxx
//参数如果是小数，会被取整。

console.log('x'.repeat(1.8)); //x 
// 如果repeat的参数是负数或者Infinity，会报错。
// console.log('x'.repeat(Infinity)); // RangeError: Invalid count value

console.log('x'.repeat(NaN)); // 输出来的是空的

/** 
 * padStart(),padEnd()
 * padStart()用于头部补全
 * padEnd()用于尾部补全
 * 
*/

console.log('x'.padStart(9, 'tab'));
console.log('abc'.padEnd(9, '==='));
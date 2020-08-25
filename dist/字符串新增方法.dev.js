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
 * 一共接受两个参数，第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串。
 * 如果省略第二个参数，默认使用空格补全长度。
*/

console.log('x'.padStart(9, 'tab'));
console.log('abc'.padEnd(9, '==='));
console.log('xyz'.padStart(4)); // xyz

/** 
 * trimStart()--消除字符串头部的空格,
 * trimEnd()--消除尾部的空格;
 * 返回的都是新字符串，不会修改原始字符串。
*/

var s = '  abc   ';
console.log(s.trimStart(), 's.trimStart()');
console.log(s, 's');
console.log(s.trimEnd(), 'trimEnd');
console.log(s, 's====');
console.log(s.trim()); //消除头部和尾部的空格

/** 
 * matchAll()方法返回一个正则表达式在当前字符串的所有匹配
*/
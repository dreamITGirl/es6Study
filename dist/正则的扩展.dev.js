"use strict";

/** 
 * ES5中 不允许此时使用第二个参数添加修饰符，否则会报错
 * var regex = new RegExp(/xyz/, 'i'); // 错误的
 * // Uncaught TypeError: Cannot supply flags when constructing one RegExp from another
 * var regex = new RegExp('xyz','i') // 正确的
 * var regex = new RegExp(/xyz/i) //正确的
 */

/** 
 * ES6中如果RegExp构造函数第一个参数是一个正则对象，
 * 那么可以使用第二个参数指定修饰符。
 * 而且，返回的正则表达式会忽略原有的正则表达式的修饰符，
 * 只使用新指定的修饰符。
*/
var regex = new RegExp(/abc/ig, 'i').flags;
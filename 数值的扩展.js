/** 
 * Number.isFinite() 用来检查一个数值是否为有限的（finite），即不是Infinity
 * Number.isNaN() 用来检查一个值是否为NaN。
*/
console.log(Number.isFinite(100)); // true
console.log(Number.isFinite(Infinity)); //false
console.log(Number.isFinite('100')); //false
console.log(Number.isNaN(NaN)); // true

/***
 * Number.parseInt()
 * Number.parseFloat()
 * ES6 将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。
 * 这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。
*/
console.log(Number.parseInt('12.33')); //12
console.log(Number.parseFloat('12.33')); // 12.33

/** 
 * Number.isInteger()用来判断一个数值是否为整数。
*/
console.log(Number.isInteger(12.32)); //false
console.log(Number.isInteger(12)); // true
console.log(Number.isInteger(12.00)); // true

/** 
 * Number.EPSILON 一个极小的常量,表示 1 与大于 1 的最小浮点数之间的差。
*/
console.log(Number.EPSILON === Math.pow(2, -52)); // true
console.log(Number.EPSILON); // 2.220446049250313e-16

/** 
 * ES6 引入了
 * Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER
 * 这两个常量，用来表示这个范围的上下限。
*/
console.log(Number.MAX_SAFE_INTEGER,'MAX_SAFE_INTEGER'); // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER,'MIN_SAFE_INTEGER'); // -9007199254740991

/** 
 * Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内。
*/
console.log(Number.isSafeInteger(20309882343432103)); // false
console.log(Number.isSafeInteger(100)); // true

/** 
 * Math对象的扩展
*/

/** 
 * Math.trunc()方法用于去除一个数的小数部分，返回整数部分。
 * 对于空值和无法截取整数的值，返回NaN
*/
console.log(Math.trunc(12.23)); // 12
console.log(Math.trunc(-4.34)); // -4
console.log(Math.trunc('12,34')); //NaN
console.log(Math.trunc(NaN)); //NaN

/** 
 * Math.sign方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。
 *  参数为正数，返回+1；
    参数为负数，返回-1；
    参数为 0，返回0；
    参数为-0，返回-0;
    其他值，返回NaN。
*/
console.log(Math.sign(0)); // 0
console.log(Math.sign(-0)); // -0
console.log(Math.sign(undefined)); // NaN
console.log(Math.sign(12.34)); // 1
console.log(Math.sign(-4.11)); // -1
console.log(Math.sign(true)); // 1
console.log(Math.sign(null)); // 0

/** 
 * Math.cbrt()方法用于计算一个数的立方根;
 * 内部也是先使用Number()方法将其转为数值
*/
console.log(Math.cbrt(-1));// -1
console.log(Math.cbrt(8)); // 2
console.log(Math.cbrt(0)); // 0
console.log(Math.cbrt(null)); // 0
console.log(Math.cbrt(true)); // 1


/** 
 * BigInt 数据类型
 * BigInt 只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示。
 * BigInt 类型的数据必须添加后缀n;
 * BigInt 可使用负号，不可使用+
 * BigInt 不能与普通数值进行混合运算。
 * BigInt 对应的布尔值，与 Number 类型一致，即0n会转为false，其他值转为true。
*/
const a = 217214134n
const b = 123452342n
console.log(a * b); // 26815593557801828n
console.log(Number(a) * Number(b)); //26815593557801828
console.log(typeof a); // bigint

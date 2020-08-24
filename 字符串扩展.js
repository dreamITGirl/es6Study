/** 
 * 字符串的遍历接口
*/
/* 
let str = 'hello es6'
for (const item of str) {
    console.log(item,'item==');
}
for (let i = 0; i < str.length; i++) {
    console.log(str[i],'str[i]');
} 
*/
/**
 * 这个遍历器最大的优点是可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点
 *  */
let text = String.fromCodePoint(0x20BB7);

for (const item of text) {
    console.log(item,'item==');
}
for (let i = 0; i < text.length; i++) {
    console.log(text[i],'str[i]');
}

/**模板字符串 */
let list = [
    {name:'lisa',age:10},
    {name:'mary',age:9},
    {name:'john',age:12},
]
//传统的拼接方式
let str = ''
for (let i = 0; i < list.length; i++) {
    str += '姓名：'+list[i].name +',年龄是:'+list[i].age +'\n'
}
console.log(str,'str====');

//模版字符串
let res = ''
for (let i = 0; i < list.length; i++) {
    res += `姓名：${list[i].name},年龄：${list[i].age}\n`
}
console.log(res);

//模板字符串的嵌套

const tmpl = list => `<table>
  ${list.map(addr => `
    <tr><td>${addr.name}</td></tr>
    <tr><td>${addr.age}</td></tr>
  `).join('')}
  </table>
`;
console.log(tmpl(list));

/**
 * 标签模版
 **/
console.log`hello` // ['hello']
console.log(['hello']) //['hello']
/** 
 * 标签模板其实不是模板，而是函数调用的一种特殊形式。
 * “标签”指的就是函数，紧跟在后面的模板字符串就是它的参数。
 * “标签模板”的一个重要应用，就是过滤 HTML 字符串，防止用户输入恶意内容。
*/

let a = 5;
let b = 10;

function tag(s, v1, v2) {
    console.log(s[0]);
    console.log(s[1]);
    console.log(s[2]);
    console.log(v1);
    console.log(v2);
    return "OK";
}
tag`Hello ${ a + b } world ${ a * b }`
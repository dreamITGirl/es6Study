/**
 * 1. 交换变量
 */
let x = 1;
let y = 2;
[x,y] = [y,x]
console.log(x,'x===',y,'y===');


/**
 * 从函数返回多个值
*/
function orderFunc([x,y,z]) {
    return x+y-z
}
let res = orderFunc([4,5,2])
console.log(res,'res===');

function notOrder({x,y,z}) {
    return x+y+z
}
let result = notOrder({y:1,z:2,x:9})
console.log(result,'result===');

/**
 * 提取 JSON 数据
 */
let jsonData = {
    id: 42,
    status: "OK",
    data: [867, 5309]
}
let {id,status,data:number} = jsonData
console.log(id,status,number);

/**
 * 函数参数的默认值
 * **/

/** 
 * 遍历Map结构
*/
const map = new Map()
map.set('user','Mary')
map.set('age',24)

for (const [,value] of map) {
    console.log(value);
}
for (const [key] of map) {
    console.log(key);
}
for (const [key,value] of map) {
    console.log(`${key} 是 ${value}`);
}
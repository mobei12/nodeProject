//千里马刷题，计算uv
var fs = require('fs');
console.log('count uv');

var buf = fs.readFileSync('uv.txt');
var uid = '',
visitors = {},
count = 0;

// 遍历行
buf.toString().split('\n').forEach(function (line) {
uid = line.split(' ');
// if (!visitors[uid[1]]) {
// 文本最后有个空行。。。
if (uid[1] && !visitors[uid[1]]) {
    visitors[uid[1]] = uid[2];
    count++;
}
});

console.timeEnd('count uv'); // 113.400ms
console.log(visitors); 
// {
//     '99995': 'buy',
//     '99998': 'add2cart',
//     ……
// }
console.log(count); // 57856
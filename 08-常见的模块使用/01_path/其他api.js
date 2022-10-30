const path = require("path");

const filepath = 'user/hwh/abc.txt'
console.log(path.dirname(filepath)) // 获取父文件夹 user/hwh
console.log(path.basename(filepath)) // 获取文件名 abc.txt
console.log(path.extname(filepath)) // 获取文件扩展名 .txt
const basename = '/user/hwh'
const filename = 'abc.txt'

// 路径的拼接 join不会加上根路径，resolve会加上根路径
console.log(path.join(basename, filename))
console.log(path.resolve(basename, filename))

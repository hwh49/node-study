const fs = require('fs')

let content = '你好啊, hwh'

// 写入操作 flag为写入的方式, callback只有一个error的回调
fs.writeFile('./a.txt', content,{flag: 'a+'}, err => {
  console.log(null)
})

// 不配置encoding是，会输出Buffer
fs.readFile('./a.txt', {encoding: 'utf8'},(err, data) => {
  console.log(data)
})

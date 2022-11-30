const fs = require('fs')

// 传统方式写入
// fs.writeFile('./bar', '写入的内容', err => {
//   if (err) return console.log('写入失败')
// })

// writable的使用
const writer = fs.createWriteStream('./bar', {
  flags: 'a',
  start: 2
})

// writer.write('hwh', error => {
//   if (error) return console.log('写入失败')
// })

// 如果没有执行这个函数，管道是一直开启的
// writer.close()

// 没有调用close，finish和close都不会触发
writer.on('finish', () => {
  console.log('文件写入结束')
})

writer.on('close', () => {
  console.log('文件关闭')
})

// end事件相当于做了write函数和close函数
writer.end('hello hwh')

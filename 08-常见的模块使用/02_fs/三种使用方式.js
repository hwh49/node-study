const fs = require("fs");

// 方式一： 同步读取文件
// const state = fs.statSync('./a.txt')
// console.log(state)
// console.log('后续代码执行')

// 方式二：异步读取
// fs.stat('./a.txt', (err, stats) => {
//   if (err) {
//     console.log('错误信息', err)
//     return
//   }
//   console.log(stats)
// })
//
// console.log('后续代码执行')

// 方式三：Promise方式
fs.promises.stat('./a.txt').then(state => {
  console.log(state)
  console.log(state.isDirectory()) // 判断是否是一个目录
}).catch(err => {
  console.log('错误信息', err)
})
console.log('后续代码执行')

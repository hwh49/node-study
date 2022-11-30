const fs = require('fs')

// 传统的读取文件 这种方式一次性将一个文件中所有的内容都读取到程序中
// fs.readFile('./foo', (err, data) => {
//   console.log(data) // buffer
// })

// 创建一个流
const read = fs.createReadStream('./foo', {
  start: 2, // 开始位置
  end: 6, // 结束位置
  highWaterMark: 2 // 一次读取多少
})

// 监听读取到数据
read.on('data', (data) => {
  console.log(data)

  read.pause()

  setTimeout(() => {
    read.resume()
  }, 2000)
})

read.on('open', (fd) => {
  console.log('文件被打开')
})

read.on('end', () => {
  console.log('文件读取结束')
})

read.on('close', () => {
  console.log('文件被关闭')
})


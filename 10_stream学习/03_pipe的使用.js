const fs = require('fs')

const reader = fs.createReadStream('./foo')
const writer = fs.createWriteStream('./abc')

// 拿到读取流，然后直接调用写入流的方法把数据写入
// reader.on('data', (data) => {
//   console.log(data)
//   writer.end(data)
//
// })

// pipe方法可以将读取到的输入流手动的放到输出流中进行写入
reader.pipe(writer)

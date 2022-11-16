const fs = require("fs");
const sharp = require('sharp')
fs.readFile('./xiaochou2.jpg', (err, data) => {
  console.log(data) // data是一个buffer 没有指定解码方式 默认为encoding: utf-8
})

// 使用sharp三方库对buffer做一些修改，然后写入文件
sharp('./xiaochou2.jpg') // 读取文件 返回buffer
    .resize(200, 200) // 修改大小
    .toFile('./xc.jpg', (err, info) => {
      console.log(info) // 写入文件
    })

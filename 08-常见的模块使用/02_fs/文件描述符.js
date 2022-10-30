const fs = require("fs");


// open方法用于分配新的文件描述符 'r'表示读取
fs.open('./a.txt', 'r', (err, fd) => {
  console.log(fd) // fd是number 文件描述符

  // 使用fstat方法放入文件描述符可以读取文件状态
  fs.fstat(fd, (err, state) => {
    console.log(state)
  })
})

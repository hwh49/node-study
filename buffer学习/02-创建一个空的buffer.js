const buffer = Buffer.alloc(8) // 创建一个空的buffer 里面的数据都为 00
buffer[0] = 11 // 可以通过索引的方式去修改buffer
console.log(buffer)

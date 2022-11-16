const message = 'hello'
const msg = '你好啊'
// 1. 编码 使用new Buffer.from方法可以把字符串编码成buffer, 第二个参数为编码方法 默认为utf8
const buffer = new Buffer.from(message)
console.log(buffer)
buffer[0] = 67
console.log(buffer)
// 2. 解码 使用toString()进行解码 默认解码方式为utf8
const str = buffer.toString()
console.log(str)

// 编码和解码的方式必须一直，否则就会变成乱码
const buffer2 = new Buffer.from(msg, 'utf16le')
const str2 = buffer2.toString('utf16le')
console.log(str2)

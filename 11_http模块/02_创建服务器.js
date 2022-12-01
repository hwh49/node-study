const http = require('http')

// 创建服务的第一种方式
const server = http.createServer((req, res) => {
  res.end('hello world')
})

// 创建服务的第二种方式
const serve2 = new http.Server((req, res) => {
  res.end('server2')
})

// 监听端口
// server.listen(8000, () => {
//   console.log('8000端口已启动')
// })

// localhost 默认会被解析为127.0.0.1 不指定的时候默认分配为0.0.0.0,为0.0.0.0的时候，使用localhost或者自己的电脑的ip地址都能访问到
server.listen(8000,'127.0.0.1', () => {
  console.log('8000端口已启动')
})

// serve2.listen(() => {
//   // console.log('8001端口已启动')
//   console.log(serve2.address().port) // serve2.address().port当我们没有指定端口号时，默认会分配空闲的端口号，而我们可以通过这种方式来获取端口号
// })

serve2.listen(8001, '192.168.1.10', () => {
  console.log('8001端口已启动')
})




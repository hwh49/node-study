const http = require('http')

// 创建一个服务
const server = http.createServer((req, res) => {
  console.log(req.headers)
  res.end('hello world')

})

// 监听端口
server.listen(8000, () => {
  console.log('8000端口已启动')
})

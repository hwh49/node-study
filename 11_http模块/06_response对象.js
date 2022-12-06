const http = require('http')

const server = http.createServer((req, res) => {
  // 1. 设置相应状态码的两种方式
  // res.statusCode = 500
  // res.writeHead(403)

  // 2. 设置响应头的两种方式 浏览器会根据对应的头信息去对响应进行对应的处理
  //serHeader 一次只能设置一个头部信息
  // res.setHeader("Content-Type", "application/json; charset=utf8")
  res.writeHead(200, {
    // "Content-Type": "application/json;charset=utf8"
    "Content-Type": "text/html;charset=utf8"
  })
  res.end('<h2>hello word</h2>')
})

server.listen(8800, () =>{
  console.log('8800已启动')
})

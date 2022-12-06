const qs = require('querystring')
const http = require('http')
const url = require('url')
const server = http.createServer((req, res) => {
  const {pathname} = url.parse(req.url)
  if (pathname === '/login') {
    if (req.method === 'POST') {
      // post请求参数在body中
      req.setEncoding('utf-8') // setEncoding 设置解析的编码格式
      req.on('data', (data) => {

        /*
         *  qs.parse 与 JSON.parse的区别
         *    qs.parse是用于转换 username=hwh&password=123 这种形式的字符串
         *    JSON.parse是用于转换 {username: hwh, password: 123} 这种形式的字符串
         */

        const {username, password} = JSON.parse(data)
        console.log(username, password)
        res.end(`Hello ${username}`)
      })

    } else {
      res.end('请求的方法不对')
    }
  }
})

server.listen(8888, () => {
  console.log('8888端口启动成功')
})


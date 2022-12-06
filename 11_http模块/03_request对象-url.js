const http = require('http')
const url = require('url')
const qs = require('querystring')

const server = http.createServer((req, res) => {
  const {pathname, query} = url.parse(req.url)
  // if (pathname === '/login') {
  //   res.end('登录信息')
  // } else if (pathname === '/register') {
  //   res.end('注册成功')
  // } else if (pathname === '/users') {
  //   res.end('用户列表')
  // } else {
  //   res.end('参数有问题')
  // }
  if (pathname === '/login') {
    console.log(query)
    console.log(qs.parse(query))
    const {username, password} = qs.parse(query)
    console.log(username, password)
    res.end('请求结果')
  }

})

server.listen(8000, () => {
  console.log('8000端口启动成功')
})

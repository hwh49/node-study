const express = require('express')

// 创建服务器
const app = express()

// 监听路径 这种方式只能监听到get的请求并且请求路径为 /
app.get('/', (req, res, next) => {
  res.end('hello express')
})

// 监听post请求并且路径为 /login
app.post('/login', (req, res, next) => {
  res.end('登陆请求')
})

app.listen(8000, () => {
  console.log('服务器启动成功~~~')
})

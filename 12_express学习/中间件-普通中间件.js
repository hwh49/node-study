const express = require('express')

// 使用use注册一个中间件
const app = express()

app.use((req, res, next) => {
  console.log('注入了第1个中间件')
  next() // next函数跳转到下一个中间件
})

app.use((req, res, next) => {
  console.log('注入了第2个中间件')
  next()
})

app.use((req, res, next) => {
  console.log('注入了第3个中间件')
  res.end('hell express')
})

app.listen(8000, () => {
  console.log('普通中间件服务器启动成功')
})

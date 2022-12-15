const express = require('express')

// 创建服务器
const app = express()

app.post('/login', (req, res, next) => {
  // 设置状态码
  res.status(204)

  // res.end只能返回string或者buffer
  // 返回JSON格式可以用json方法
  // res.json({name: 'hwh', age: 18})

  // 或者使用type方法设置返回值格式
  res.type('application/json')
  res.end(JSON.stringify({name: 'hwh', age: 18}))
})

app.listen(8000, () => {
  console.log('服务器启动成功~~~')
})

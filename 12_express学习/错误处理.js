const express = require('express')

// 创建服务器
const app = express()

const LOGIN_ERROR = 'user does not exist'
const REGISTER_ERROR = 'Registration failed'

app.get('/login', (req, res, next) => {
  const isLogin = true
  if (!isLogin) {
    res.end('登陆成功')
  } else {
    // next只要是有参数，那一定是错误信息
    next(new Error(LOGIN_ERROR))
  }
})


app.post('/register', (req, res, next) => {
  const isRegister = true
  if (!isRegister) {
    res.end('注册成功')
  } else {
    next(new Error(REGISTER_ERROR))
  }
})

app.use((err, req, res, next) => {
  let status = 400
  let message = ''
  switch (err.message) {
    case LOGIN_ERROR:
      message = LOGIN_ERROR
      break;
    case REGISTER_ERROR:
      message = REGISTER_ERROR
      break;
    default:
      message = 'corresponding path could not be found'
  }
  res.status(status)
  res.json({
    status,
    message
  })
})

app.listen(8000, () => {
  console.log('错误处理服务器启动成功~~~')
})

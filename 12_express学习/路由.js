const express = require('express')
const useRouter = require('./Routes/users')

const app = express()

app.use('/user', useRouter)

app.listen(8000, () => {
  console.log('路由服务器启动成功')
})

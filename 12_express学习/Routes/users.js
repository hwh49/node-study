const express = require('express')

const userRouter = express.Router()

userRouter.get('/', (req, res, next) => {
  res.json(['hwh', 'ldh', 'hr'])
})

userRouter.post('/', (req, res, next) => {
  res.end('创建用户成功')
})

userRouter.delete('/:id', (req, res, next) => {
  res.end(`删除${req.params.id}成功`)
})

module.exports = userRouter

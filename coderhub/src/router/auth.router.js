const Router = require('koa-router')
const {login, success} = require('../controller/auth.controller')
const {verifyPassword, verifyAuth} = require('../middleware/auth.middleware')
const authRouter = new Router()

authRouter.post('/login', verifyPassword, login)
authRouter.get('/test', verifyAuth, success)

module.exports = authRouter

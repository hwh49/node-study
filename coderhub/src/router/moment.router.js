const Router = require('koa-router')
const {verifyAuth} = require("../middleware/auth.middleware");
const {create, momentDetail, momentList} = require('../controller/moment.controller')
const userRouter = new Router({prefix: '/moment'})

userRouter.post('/', verifyAuth, create)
userRouter.get('/', momentList)
userRouter.get('/:momentId', momentDetail)


module.exports = userRouter

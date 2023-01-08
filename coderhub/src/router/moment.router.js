const Router = require('koa-router')
const {verifyAuth, verifyPermission} = require("../middleware/auth.middleware");
const {
  create,
  momentDetail,
  momentList,
  update,
  remove,
  addLabels,
  fileInfo
} = require('../controller/moment.controller')
const {verifyLabelExist} = require('../middleware/label.middleware')
const userRouter = new Router({prefix: '/moment'})

userRouter.post('/', verifyAuth, create)
userRouter.get('/', momentList)
userRouter.get('/:momentId', momentDetail)
userRouter.patch('/:momentId', verifyAuth, verifyPermission, update)
userRouter.delete('/:momentId', verifyAuth, verifyPermission, remove)
userRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExist, addLabels)
userRouter.get('/images/:filename', fileInfo)
module.exports = userRouter

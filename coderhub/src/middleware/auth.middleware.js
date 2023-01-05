const jwt = require('jsonwebtoken')
const errorType = require('../constants/error-types')
const service = require('../service/user.service')
const {md5password} = require('../utils/password-handle')
const {PUBLIC_KEY} = require('../app/config')
const {checkResource} = require('../service/auth.service')


const verifyPassword = async (ctx, next) => {
  // 1.获取用户名密码
  const {name, password} = ctx.request.body

  // 2.判断用户名或者密码不能为空
  if (!name || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  // 3. 判断当前是否有这个用户名
  const result = await service.getUserByName(name);
  const user = result[0]
  if (!user) {
    const error = new Error(errorType.USER_NAME_DOES_NOT_EXIST)
    return ctx.app.emit('error', error, ctx)
  }
  // 4. 判断密码是否与当前所查询到的一致
  if (!(md5password(password) === user.password)) {
    const error = new Error(errorType.PASSWORD_DOES_NOT_EXIST)
    return ctx.app.emit('error', error, ctx)
  }
  ctx.user = user
  await next()
}

const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers?.authorization
  if (!authorization) {
    const error = new Error(errorType.DID_NOT_CARRY_TOKEN)
    return ctx.app.emit('error', error, ctx)
  }
  const token = authorization.replace('Bearer ', '')
  try {
    // 验证token 拿到请求携带的token, PUBLIC_KEY为公玥，algorithms为解密的方法
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    ctx.user = result
    await next()
  } catch (e) {
    const error = new Error(errorType.UNAUTHORIZED)
    return ctx.app.emit('error', error, ctx)
  }
}

const verifyPermission = async (ctx, next) => {
  // 1.拿到数据库id和userId
  const [resourceKey] = Object.keys(ctx.params)
  const tableName = resourceKey.replace('Id', '')
  const resourceId = ctx.params[resourceKey]
  const {id} = ctx.user
  // 2.查询数据库是否有权限
  const isPermission = await checkResource(tableName, resourceId, id)
  if (!isPermission) {
    const error = new Error(errorType.UNAUTHPREMISSION)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}


module.exports = {
  verifyPassword,
  verifyAuth,
  verifyPermission
}

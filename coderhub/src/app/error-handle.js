const errorType = require('../constants/error-types')

const errorHandle = (error, ctx) => {
  let status, message;

  switch (error.message) {
    case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400;
      message = '用户名或密码不能为空'
      break;
    case errorType.USER_ALREADY_EXISTS:
      status = 409
      message = '用户名已经存在'
      break;
    case errorType.USER_NAME_DOES_NOT_EXIST:
      status = 400
      message = '用户名不存在'
      break;
    case errorType.PASSWORD_DOES_NOT_EXIST:
      status = 400
      message = '密码错误'
      break;
    case errorType.UNAUTHORIZED:
      status = 401
      message = 'token是无效的~'
      break;
    case errorType.DID_NOT_CARRY_TOKEN:
      status = 401
      message = '未携带token~'
      break;
    default:
      status = 404
      message = "NOT FOUND"
  }
  ctx.status = status
  ctx.body = message
}

module.exports = errorHandle

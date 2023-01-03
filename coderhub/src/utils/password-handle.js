const crypto = require('crypto')

const md5password = (password) => {
  const md5 = crypto.createHash('md5');

  // 是一个数值时调用这个加密方式会报错
  const result = md5.update(password + '').digest('hex')

  return result
}

module.exports = {
  md5password
}

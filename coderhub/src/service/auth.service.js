const connection = require('../app/database')

class AuthService {
  async checkResource(tableName, id, userId) {
    const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`
    // 查看是否有权限，查询数据库如果有返回值说明有权限
    const [result] = await connection.execute(statement, [id, userId])
    return result.length === 0 ? false : true
  }
}

module.exports = new AuthService()

const connection = require('../app/database')

const sqlFragment = `
SELECT 
  m.id id,
  m.content content,
  m.createAt createTime,
  m.updateAt updateTime,
JSON_OBJECT('id', u.id, 'name', u.name) author
FROM moment m
LEFT JOIN user u
ON m.user_id = u.id
`

class MomentService {
  async create(userId, content) {
    const statement = `INSERT INTO moment (user_id, content) VALUES (?, ?);`
    const result = await connection.execute(statement, [userId, content])
    return result;
  }

  async getMomentById(momentId) {
    const statement = `
        ${sqlFragment}
        WHERE m.id = ?;`
    const [result] = await connection.execute(statement, [momentId])
    return result[0];
  }

  async getMomentList(offset, size) {
    const statement = `
        ${sqlFragment}
        LIMIT ?, ?;`
    const [result] = await connection.execute(statement, [offset, size])
    return result;
  }
}

module.exports = new MomentService();

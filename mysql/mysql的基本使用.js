const mysql = require('mysql2')

// 1. 创建数据库连接
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  database: 'coderhub',
  user: 'root',
  password: 'hewanhua0322'
})

// 2. 执行sql语句
const statement = `
SELECT * FROM products WHERE price > 5000;
`

connection.query(statement, (err, result, fields) => {
  console.log(result)
})

const {Sequelize, Model, DataTypes, Op} = require('sequelize')

// 与数据库创建链接
const sequelize = new Sequelize('coderhub', 'root', 'hewanhua0322', {
  host: 'localhost',
  dialect: 'mysql'
})

// 关联表格
class Product extends Model {
}

// 与表格建立映射表
Product.init({
  // 键为关系表的键
  id: {
    type: DataTypes.INTEGER, // 字段类型
    primaryKey: true, // 是否是主键
    autoIncrement: true // 是否是自动增长的
  },
  title: {
    type: DataTypes.STRING,
    allowNotNull: false
  },
  price: DataTypes.DOUBLE,
  score: DataTypes.DOUBLE
}, {
  tableName: 'products', // 数据库与之对应的表名
  createdAt: false, // 是否有这个键
  updatedAt: false, // 是否有这个键
  sequelize // 数据库
})

async function queryProducts() {
  // 1.查询所有的内容
  // const result1 = await Product.findAll({})
  // console.log(result1)

  // 2.查询价格大于5000的手机 where为筛选的条件
  // const result2 = await Product.findAll({
  //   where: {
  //     price: {
  //       [Op.gt]: 5000
  //     }
  //   }
  // })
  // console.log(result2)

  // 3.新增数据
  // const result3 = await Product.create({
  //   title: '这是一个新品手机',
  //   price: 19999
  // })
  //
  // console.log(result3)

  // 4.更新数据
  // const result4 = await Product.update({
  //   title: '这是第一条数据'
  // }, {
  //   where: {
  //     id: 1
  //   }
  // })
  //
  // console.log(result4)

  // 5. 删除数据
  const result5 = await Product.destroy({
    where: {
      id: 109
    }
  })

  console.log(result5)
}

queryProducts()

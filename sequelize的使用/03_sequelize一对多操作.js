const {Sequelize, Model, DataTypes, Op} = require('sequelize')

// 与数据库创建链接
const sequelize = new Sequelize('coderhub', 'root', 'hewanhua0322', {
  host: 'localhost',
  dialect: 'mysql'
})

// 关联表格
class Brand extends Model {
}

// 与表格建立映射表
Brand.init({
  // 键为关系表的键
  id: {
    type: DataTypes.INTEGER, // 字段类型
    primaryKey: true, // 是否是主键
    autoIncrement: true // 是否是自动增长的
  },
  name: {
    type: DataTypes.STRING,
    allowNotNull: false
  },
  website: DataTypes.STRING,
  phoneRank: DataTypes.DOUBLE
}, {
  tableName: 'brand', // 数据库与之对应的表名
  createdAt: false, // 是否有这个键
  updatedAt: false, // 是否有这个键
  sequelize // 数据库
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
  score: DataTypes.DOUBLE,
  brandId: {
    type: DataTypes.INTEGER,
    references: {
      model: Brand,
      key: 'id'
    },
    field: 'brand_id'
  }
}, {
  tableName: 'products', // 数据库与之对应的表名
  createdAt: false, // 是否有这个键
  updatedAt: false, // 是否有这个键
  sequelize // 数据库
})

Product.belongsTo(Brand, {
  foreignKey: 'brand_id'
})

async function queryProducts() {
  // 1.查询所有的内容
  const result1 = await Product.findAll({
    include: {
      model: Brand
    }
  })
  console.log(result1)

}

queryProducts()

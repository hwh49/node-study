const app = require('./app')
const config = require('./app/config')
require('./app/database')
app.listen(config.APP_PORT, () => {
  console.log(`${config.APP_PORT}端口已启动`)
})

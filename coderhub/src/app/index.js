const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const errorHandle = require('../app/error-handle')
const useRouter = require('../router')

const app = new Koa();

app.useRoute = useRouter

app.use(bodyParser())
app.useRoute()

app.on('error', errorHandle)

module.exports = app


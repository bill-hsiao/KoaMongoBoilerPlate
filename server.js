const Koa = require('koa')
const Router = require('koa-router')
const Logger = require('koa-logger')
const Cors = require('@koa/cors')
const BodyParser = require('koa-bodyparser')
const Helmet = require('koa-helmet')
const respond = require('koa-respond')

const app = new Koa()
const router = new Router()
const errorHandler = require('src/middleware/error-handler')

const DbManager = require('src/db/DbManager')
const config = require('config')
const dbManager = new DbManager(config)
dbManager.connect()
dbManager.listen()()
// dbManager.reconnect()
// dbManager.test()


app.use(Helmet())


if (process.env.NODE_ENV === 'development') {
  app.use(Logger())
}
// app.on('error', (err, ctx) => {
//   errorHandler(err)
// })
app.use(Cors())
app.use(BodyParser({
  enableTypes: ['json'],
  jsonLimit: '5mb',
  strict: true,
  onerror: function (err, ctx) {
    ctx.throw('body parse error', 422)
  }
}))

app.use(respond())

// API routes
require('src/routes')(router)
app.use(router.routes())
app.use(router.allowedMethods())

module.exports = app
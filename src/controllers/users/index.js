const Router = require('koa-router')
const router = new Router()
const Controller = require('src/controllers/users/controller')

router.get('/', Controller.hello)
router.post('/register', Controller.register)
// router.post('/authenticate', sCtrl.authenticate)

module.exports = router.routes()

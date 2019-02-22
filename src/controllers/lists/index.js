const Router = require('koa-router')
const router = new Router()
const Controller = require('src/controllers/lists/controller')
//
// router.post('/register', Controller.register)
// router.post('/authenticate', Controller.authenticate)
// router.put('/:id', Controller.update)
// router.delete('/:id', Controller.delete)
// router.get('/:id', Controller.getById)
// router.get('/current', Controller.getCurrent)
router.get('/', Controller.hello)


module.exports = router.routes()

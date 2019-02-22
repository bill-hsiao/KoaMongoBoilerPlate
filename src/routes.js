module.exports = (router) => {
  router.prefix('/v1')
  router.use('/users', require('src/controllers/users/index'))
}

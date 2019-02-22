module.exports = (router) => {
  router.prefix('/v1')
  router.use('/users', require('src/controllers/users/index'))
  router.use('/users/lists', require('src/controllers/lists/index'))
}

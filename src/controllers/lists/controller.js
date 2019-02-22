const list = require('src/controllers/lists/services')

module.exports = {
  hello
}
async function hello(ctx, next) {
  try {
    ctx.response.body = await list.world

  } catch(err) {
    console.log(err);
    next(err)

  }
}

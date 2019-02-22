const user = require('src/controllers/users/services')

module.exports = {
  hello,
  register
}


function hello (ctx) {
  let user = ctx.request.query.user
  ctx.ok({ user })
}



async function register (ctx, next) {
  let userParam = ctx.request.body;
  console.log(userParam);
  await user.create(userParam)
  .then(()=> {
    ctx.response.body = userParam;
    return ctx
  })
  .catch(err => next(err));
}
//
//
//
// async function register (ctx, next) {
//   let userParam = ctx.request.body
//   console.log(userParam);
//   await user.create(userParam)
//   .then(()=> {
//     ctx.response.body = userParam;
//     return ctx
//   })
//   .catch(err => next(err));
// }

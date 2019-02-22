const user = require('src/controllers/users/services')

module.exports = {
  register,
  authenticate,
  update,
  delete: del,
  getById,
  getCurrent,
  getAll

}

async function register(ctx, next) {
  const userParam = ctx.request.body;
  console.log(userParam);
  try {
    const response = await user.create(userParam)
    ctx.response.body = await response
  } catch (error) {
    console.log(error);
    next(error)
  }
}

async function authenticate(ctx, next) {
  let userParam = ctx.request.body;
  console.log(userParam);
  try {
    const response = await user.authenticate(userParam)
    console.log(response);
    ctx.response.body = response
  } catch (error) {
    console.log(error);
    next(error)
  }
}

async function update(ctx, next) {
  const userParam = ctx.request.body;
  const id = ctx.request.query.id
  console.log(ctx.request.query.id, userParam);
  try {
    const response = await user.update(id, userParam)
    ctx.response.body = await response
  } catch (error) {
    console.log(error);
    next(error)
  }
}

async function del(ctx, next) {
  const id = ctx.request.query.id
  console.log(ctx.request.query.id);
  try {
    const response = await user.delete(id)
    ctx.response.body = await response
  } catch (error) {
    console.log(error);
    next(error)
  }
}

async function getById(ctx, next) {
  const id = ctx.request.query.id
  console.log(ctx.request.query.id);
  try {
    const response = await user.getById(id)
    ctx.response.body = await response
  } catch (error) {
    console.log(error);
    next(error)
  }
}

async function getCurrent(ctx, next) {
  const id = ctx.request.query.id
  console.log(ctx.request.query.id);
  try {
    const response = await user.getById(id)
    ctx.response.body = await response
  } catch (error) {
    console.log(error);
    next(error)
  }
}

async function getAll(ctx, next) {
  try {
    const response = await user.getAll()
    ctx.response.body = await response
  } catch (error) {
    console.log(error);
    next(error)
  }
}

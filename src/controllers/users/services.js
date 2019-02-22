const mongoose = require('mongoose')
const User = require('src/models/user')
const bcrypt = require('bcryptjs')

module.exports = {
  create
  // authenticate
}

async function create(userParam) {
  try {
    if (await User.findOne({ username: userParam.username })) {
      throw {message: 'userfound'}
    }
    const user = new User(userParam)
    user.hash = await bcrypt.hash(userParam.hash, 10);
    await user.save();
  } catch (err) {
    throw err
  }
}
//
// async function authenticate(userParam) {
//   const user = await User.findOne({ username: userParam.username })
//   if (user && bcrypt.compareSync(userParam.password, user.hash)) {
//
//
// }
// }

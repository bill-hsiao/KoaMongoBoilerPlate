const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('src/models/user')
const config = require('config')



module.exports = {
  create,
  authenticate,
  update,
  delete: del,
  getById,
  getAll
}

async function create(userParam) {
  try {
    //check db for existing user with the same username, throws error if found
    if (await User.findOne({ username: userParam.username })) {
      console.log('found!');
      throw new Error
    }
    //creates new user from mongoose model
    const user = new User(userParam)
    //hashes password asynchronously
    user.hash = await bcrypt.hash(userParam.hash, 10);
    await user.save();
  } catch (err) {
    throw err
  }
}

async function authenticate(userParam) {
  try {
    //get user from db
    const user = await User.findOne({ username: userParam.username })
    if (!user) throw new Error
    //async bcrypt compare user hash/db hash
    if (user && await bcrypt.compare(userParam.hash, user.hash)) {
      //deconstructed { hash } from { ...user }
      const { hash, ...userWithoutHash } = user.toObject();
      const token = await jwt.sign({ sub: user.id }, config.JWT_SECRET);
      console.log(token);
      // const response = { ...userWithoutHash, token: await token}
      return { ...userWithoutHash, token: await token}
    }
  } catch (err) {
    console.log(err);
  }
}



async function update(id, userParam) {
  try {
    //find user with id
    const user = await User.findById(id);
    //throw error if not found
    if (!user) throw new Error('User does not exist')
    //find user with new username parameter
    const queriedUser = await User.findOne({ username: userParam.username })
    //if current username is not new parameter and queried user exists
    if (user.username !== userParam.username && queriedUser) throw new Error('Username taken')
    //if password, hash it
    if (userParam.hash) {
      userParam.hash = await bcrypt.hash(userParam.hash, 10);
    }
    Object.assign(user, userParam)
    await user.save();
  } catch (err) {
    console.log(err);
    throw err
  }
}

async function del(id) {
  const user = await User.findByIdAndRemove(id);
}


async function getById(id) {
  const user = await User.findById(id).select('-hash');
  return user
}

async function getAll() {
  const users = await User.find().select('-hash');
  console.log(users);
  return users
}

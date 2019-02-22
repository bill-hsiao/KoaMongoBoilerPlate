const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  username: { type: String, unique: true, required: true },
  hash: { type: String, required: true },
  email: { type: String, required: true }
})

User.set('toJSON', { virtuals: true });


module.exports = mongoose.model('User', User);

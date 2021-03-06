const mongoose = require('mongoose')

class DbManager {
  constructor(config) {
    this.config = config
    mongoose.Promise = global.Promise;

  }
  getUri() {
    return this.config.MONGODB_URI
  }
  connect() {
    return mongoose.connect(this.getUri(), { useCreateIndex: true, useNewUrlParser: true })
  }
  listen() {
    return function() { mongoose.connection.once('open', () => {
      console.log(`connected to MongoDB at ${mongoose.connection.host}:${mongoose.connection.port}`)
    })}
  }
  
}

module.exports = DbManager

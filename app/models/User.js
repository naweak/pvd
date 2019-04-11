const shortid = require('shortid')
const db = require('./DB')
const md5 = require('md5')

class User {
  constructor (login = '', password = '', group = '', id = shortid.generate()) {
    this.id = id
    this.login = login
    this.password = password
    this.group = group
  }
  register () {
    db.get('users').push({
      id: this.id,
      login: this.login,
      password: md5(this.password),
      group: this.group
    }).write()
  }
  info () {
    return db.get('users').find({ login: this.login }).value()
  }
}

module.exports = User

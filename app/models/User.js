const shortid = require('shortid')
const db = require('./DB')
const md5 = require('md5')
const { arrayLast, random } = require('../lib.js')

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
  canLogin () {
    let password = md5(this.password)
    return db.get('users').find({ login: this.login, password }).value()
  }
  tokens () {
    let tokens = db.get('tokens').filter({ login: this.login }).value()
    return tokens
  }
  lastToken () {
    let tokens = this.tokens()
    return arrayLast(tokens)
  }
  hasToken () {
    let token = this.lastToken()
    return token && token.expires > Date.now() && this.info()
  }
  addToken () {
    db.get('tokens').push({
      id: shortid.generate(),
      code: random(),
      login: this.login,
      expires: Date.now() + 604800000,
      createDate: Date.now()
    }).write()
  }
}

module.exports = User

const shortid = require('shortid')
const db = require('./DB')
const md5 = require('md5')
const { arrayLast, random } = require('../lib.js')
const { chatDelay } = require('../config')

class User {
  constructor (login = '', password = '', group = '', ip = '', id = shortid.generate(), tokenCode = '') {
    this.id = id
    this.login = login
    this.password = password
    this.group = group
    this.tokenCode = tokenCode
    this.ip = ip
  }
  register () {
    db.get('users').push({
      id: this.id,
      login: this.login,
      password: md5(this.password),
      group: this.group,
      ip: this.ip
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
  infoByToken () {
    let token = db.get('tokens').find({ code: this.tokenCode }).value()
    if (token)
      this.login = token.login
    return this.info()
  }
  lastChatMessage () {
    return db.get('chat')
      .filter({ author: this.login })
      .orderBy('createDate', 'desc')
      .value()[0]
  }
  canPostWithoutDelay() {
    return db.get('users').find({ login: this.login }).value().canPostWithoutDelay
  }
  chatDelayExpired () {
    return !this.lastChatMessage() || this.lastChatMessage().createDate + chatDelay < Date.now() || this.canPostWithoutDelay()
  }
  chatDelayRemainingTime() {
    return (this.lastChatMessage().createDate + chatDelay - Date.now()) / 1000
  }
}

module.exports = User

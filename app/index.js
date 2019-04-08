const express = require('express')
var config = require('./config')
const bodyParser = require('body-parser')
const history = require('connect-history-api-fallback')
const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = lowdb(adapter)
const shortid = require('shortid')
const md5 = require('md5')
const unzalgo = require('unzalgo')

db.defaults({
  point: 'http://www.kursksu.ru/',
  users: [],
  tokens: [],
  chat: []
}).write()

function arrayLast (array) {
  return array[array.length - 1]
}

function choice (array) {
  return array[Math.floor(Math.random() * array.length)]
}

function random (length = 32) {
  if (typeof length != 'number') {
    console.log("Length isn't number")
  }
  let chars = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('')
  let result = ''
  for (var i = 0; i < length; i++) {
    result += choice(chars)
  }
  return result
}

function apiError (data, code) {
  return { error: { data, code } }
}

function apiErrorNoLogged () {
  return apiError('Залогинься сука тупая', 12)
}

function apiSuccess (success) {
  return { success }
}

function point () {
  return db.get('point').value()
}

function userInfo (login) {
  let user = db.get('users').find({ login }).value()
  return user
}

function register (login, password) {
  db.get('users').push({
    id: shortid.generate(),
    login: login,
    password: md5(password),
    group: 'users'
  }).write()
}

function loginIsValid (login, password) {
  password = md5(password)
  return db.get('users').find({ login, password }).value()
}

function genToken (login) {
  let id = shortid.generate()
  db.get('tokens').push({
    id,
    code: random(),
    login,
    expires: Date.now() + 604800000,
    createDate: Date.now()
  }).write()
  let data = db.get('tokens').find({ id }).value()
  return data
}

function getTokenByCode (code) {
  return db.get('tokens').find({ code }).value()
}

function tokenIsValid (token) {
  if (typeof token == 'string')
    token = getTokenByCode(token)
  return token && token.expires > Date.now() && userInfo(token.login)
}

function getToken (login) {
  let tokens = db.get('tokens').filter({ login }).sortBy('createDate').value()
  if (tokens.length == 0 || !tokenIsValid(arrayLast(tokens))) {
    return genToken(login)
  }
  else {
    return arrayLast(tokens)
  }
}

function userInfo (login) {
  return db.get('users').find({ login }).value(login)
}

function userInfoByToken (code) {
  let token = getTokenByCode(code)
  return db.get('users').find({ login: token.login }).value()
}

function chatMessages () {
  let chat = db.get('chat').value()
  chat.forEach((elem, index) => {
    chat[index] = parseChatMessage(chat[index])
  })
  return chat
}

function parseChatMessage (message) {
  message.raw = message.text
  message.text = unzalgo.clean(message.text)
  return message
}

function apiMiddleware(req, res) {
  res.set('Access-Control-Allow-Origin', '*')
  var params = req.method == 'POST' ? req.body : req.query
  switch (params.method) {
    case 'helloWorld':
      res.send(apiSuccess('Hello world!'))
    case 'point':
      res.send(apiSuccess(point()))
    case 'register':
      if (!params.login)
        res.send(apiError('Введи логин сука', 21))
      else if (!params.password)
        res.send(apiError('Введи пароль сука', 22))
      else if (!params.passwordVerify || params.password != params.passwordVerify)
        res.send(apiError('Подтверди пароль сука', 23))
      else {
        if (!userInfo(params.login)) {
          register(params.login, params.password)
          res.send(apiSuccess('Зарегано наху'))
        }
        else {
          res.send(apiError('Юзер уже существует', 24))
        }
      }
    case 'getToken':
      if (!params.login)
        res.send(apiError('Введи логин сука', 31))
      else if (!params.password)
        res.send(apiError('Введи пароль сука', 32))
      else if (!loginIsValid(params.login, params.password))
        res.send(apiError('Нихуя неверно блять!!1', 33))
      else {
        console.log(getToken(params.login))
        res.send(apiSuccess(getToken(params.login)))
      }
    case 'createChatMessage':
      if (!params.token || !tokenIsValid(params.token))
        res.send(apiErrorNoLogged())
      else if (!params.text)
        res.send(apiError('Вставить текст', 41))
      else {
        db.get('chat').push({
          id: shortid.generate(),
          text: params.text,
          author: userInfoByToken(params.token).login,
          createDate: Date.now()
        }).write()
        res.send(apiSuccess('Мессаг отправлен'))
      }
    case 'chatMessages':
      res.send(apiSuccess(chatMessages()))
    case 'userInfo':
      if (!params.token || !tokenIsValid(params.token))
        res.send(apiErrorNoLogged())
      else
        res.send(apiSuccess(userInfoByToken(params.token)))
    default:
      res.send(apiError('Метод не существует', 11))
  }
}

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', apiMiddleware)
app.use(history())
app.use(express.static('../public/dist/'))
app.listen(config.port, config.host, () => console.log('Server is running'))

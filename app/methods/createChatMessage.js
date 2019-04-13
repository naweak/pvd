const User = require('../models/User')
const Response = require('../models/Response')
const ChatMessage = require('../models/ChatMessage')
const ResponseErrorNotLogged = require('../models/ResponseErrorNotLogged')

module.exports = {
  run (params) {
    let user = new User(tokenCode = params.token)
    let userInfo = user.infoByToken()
    if (!userInfo)
      return new ResponseErrorNotLogged()
    else if (!params.text)
      return new Response('вставить текст', 41, true)
    else {
      let message = new ChatMessage(params.text, userInfo.login)
      message.create()
      return new Response('вставил текст')
    }
  }
}

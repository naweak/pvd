const User = require('../models/User')
const Response = require('../models/Response')
const ChatMessage = require('../models/ChatMessage')
const ResponseErrorNotLogged = require('../models/ResponseErrorNotLogged')

module.exports = {
  run (params, ip) {
    let user = new User()
    user.tokenCode = params.token
    console.log(user)
    let userInfo = user.infoByToken()
    if (!userInfo)
      return new ResponseErrorNotLogged()
    else if (!params.text)
      return new Response('вставить текст', 41, true)
    else {
      let message = new ChatMessage(params.text, userInfo.login, ip)
      message.create()
      return new Response('вставил текст')
    }
  }
}

const Response = require('../models/Response')
const Chat = require('../models/Chat')

module.exports = {
  run () {
    let chat = new Chat()
    return new Response(chat.messages())
  }
}

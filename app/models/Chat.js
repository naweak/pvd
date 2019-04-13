const db = require('../models/DB')

class Chat {
  messages () {
    let messages = db.get('chat').value()
    messages.forEach((elem, index) => {
      delete(messages[index].ip)
    })
    return messages
  }
}

module.exports = Chat

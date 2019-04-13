const db = require('../models/DB')

class Chat {
  messages () {
    return db.get('chat').value()
  }
}

module.exports = Chat

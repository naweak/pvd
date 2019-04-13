const db = require('./DB')
const shortid = require('shortid')

class ChatMessage {
  constructor (text = '', author = '', ip = '', createDate = Date.now(), id = shortid.generate()) {
    this.text = text
    this.author = author
    this.createDate = createDate
    this.id = id,
    this.ip = ip
  }
  create () {
    db.get('chat').push({
      id: this.id,
      text: this.text,
      author: this.author,
      createDate: this.createDate,
      ip: this.ip
    }).write()
  }
}

module.exports = ChatMessage

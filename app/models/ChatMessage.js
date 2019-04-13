const db = require('./DB')
const shortid = require('shortid')

class ChatMessage {
  constructor (text = '', author = '', createDate = Date.now(), id = shortid.generate()) {
    this.text = text
    this.author = author
    this.createDate = createDate
    this.id = id
  }
  create () {
    db.get('chat').push({
      id: this.id,
      text: this.text,
      author: this.author,
      createDate: this.createDate
    }).write()
  }
}

module.exports = ChatMessage

const db = require('./DB')
class Point {
  constructor () {
    this.address = db.get('point').value()
  }
  getAddress () {
    return this.address
  }
}

module.exports = Point

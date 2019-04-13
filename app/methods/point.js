const Response = require('../models/Response')
const Point = require('../models/Point')

module.exports = {
  run () {
    let point = new Point().getAddress()
    return new Response(point)
  }
}

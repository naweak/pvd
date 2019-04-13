const Response = require('./Response')

class ResponseErrorNotLogged {
  constructor () {
    return new Response('залогинься сука тупая', 12, true)
  }
}

module.exports = ResponseErrorNotLogged

const User = require('../models/User')
const Response = require('../models/Response')
const ResponseErrorNotLogged = require('../models/ResponseErrorNotLogged')

module.exports = {
  run (params) {
    let user = new User()
    user.tokenCode = params.token
    let userInfo = user.infoByToken()
    if (!userInfo)
      return new ResponseErrorNotLogged()
    else
      return new Response(userInfo)
  }
}

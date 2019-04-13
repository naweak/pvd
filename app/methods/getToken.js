const Response = require('../models/Response')
const User = require('../models/User')

module.exports = {
  run (params) {
    if (!params.login)
      return new Response('введи логин сука', 31, true)
    else if (!params.password)
      return new Response('введи пароль сука', 32, true)
    else {
      let user = new User(params.login, params.password)
      if (!user.canLogin())
        return new Response('Нихуя неверно блядь!!1', 33, true)
      else {
        if (!user.hasToken())
          user.addToken()
        return new Response(user.lastToken())
      }
    }
  }
}

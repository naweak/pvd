const User = require('../models/User')
const Response = require('../models/Response')

module.exports = {
  run (params, ip) {
    if (!params.login)
      return new Response('введи логин сука', 21, true)
    else if (!params.password)
      return new Response('введи пароль сука', 22, true)
    else if (!params.passwordVerify || params.password != params.passwordVerify)
      return new Response('подтверди пароль', 23, true)
    else {
      let user = new User(params.login, params.password, 'users', ip)
      if (user.info())
        return new Response('такой юзер уже существует', 24, true)
      else {
        user.register()
        return new Response('зарегано наху')
      }
    }
  }
}

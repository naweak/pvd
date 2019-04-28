const history = require('connect-history-api-fallback')
const { static } = require('express')
const config = require('./config')
const Framework = require('@naweak/n')
const app = new Framework({
  methodsDir: __dirname + '/methods/',
  host: config.host,
  port: config.port
})
app.app.use(history())
app.app.use('/smileys', static('../public/smileys/'))
app.app.use(static('../public/dist/'))
app.runServer()

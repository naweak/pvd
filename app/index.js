const express = require('express')
const history = require('connect-history-api-fallback')
const app = express()
const bodyParser = require('body-parser')
const config = require('./config')
const Response = require('./models/Response')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  let params = req.method == 'POST' ? req.body : req.query
  try {
    res.send(require('./methods/' + params.method).run(params))
  }
  catch (e) {
    console.log(e)
    res.send(new Response('Метод не существует', 11, true))
  }
})
app.use(history())
app.use(express.static('../public/dist/'))
app.listen(config.port, config.host, () => console.log(`Server running in ${config.host}:${config.port}`))

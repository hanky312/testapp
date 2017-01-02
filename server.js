"use strict";
let express = require('express')
let path = require('path')
let app = express()

app.use(express.static(path.join(__dirname, 'dist')))

var sendApp = function (req, res) {
  res.sendfile('./dist/index.html')
}

app.get('/connect', sendApp)
app.get('/sign', sendApp)

app.set('port', (process.env.PORT || 3000))

app.listen(app.get('port'), function () {
  console.log('App served at: http://localhost:' + app.get('port'))
})

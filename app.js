let express = require('express')
let app = express()
let port = 5000

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(5000, function () {
  console.log('Example app listening on port ' + port)
})
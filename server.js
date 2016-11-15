let express = require('express')
let bodyParser= require('body-parser')
let app = express()
let port = 5000

app.use(bodyParser.urlencoded({extended: true}))

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html')
//   // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
//   // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
// })

app.get('/api/book', (req, res) => {
	console.log("GOT")
	console.log(req.body)
})

app.post('/api/book', (req, res) => {
	console.log("POST")
	console.log(req.body)
})

app.listen(5000, function () {
})
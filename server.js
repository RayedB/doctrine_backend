require("babel-polyfill")

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')

app.use(bodyParser.json({limit: '500kb'}))
app.use(express.static(__dirname + '/views'))
app.use('/scripts', express.static(__dirname + '/node_modules/angular'));


app.set('views', [path.join(__dirname, 'views')])
app.set('view engine', 'ejs')


app.use('/', require('./routes'))
app.use((req, res, next) => {
	res.setHeader('Content-type', 'text/plain')
	res.status(404).send('Page doesn\'t exist')
})

app.use(function errorHandler(err, req, res, next) {
	 console.error(err.message)
   // No HTTP error code specified? Make it an error 500
   const error_status = err.status || 500
	 res.status(500).sendFile(path.join(__dirname, 'views') + '/error.html')
})

app.listen(8080)

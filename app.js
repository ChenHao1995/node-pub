var express = require('express')
var app = express()
// var consolidate = require('consolidate')
var HTMLing = require('htmling')
var router = require('./router')
const { spawn } = require('child_process')

// const ls = spawn('ls', ['-lh', '/usr'])
// ls.stdout.on('data', data => {
//   console.log(`stdout: ${data}`)
// })

// ls.stderr.on('data', data => {
//   console.error(`stderr: ${data}`)
// })

// ls.on('close', code => {
//   console.log(`child process exited with code ${code}`)
// })

// app.engine('html', consolidate.ejs)
// app.set('view engine', 'html')
// app.set('views', __dirname + '/views')

app.engine('html', HTMLing.express(__dirname + '/views/'))
app.set('view engine', 'html')

app.use(express.json())

// mount the router on the app
app.use('/', router)
app.on('connection', function(req, cltSocket, head) {
  console.log('close')
})
app.listen(8888, '127.0.0.1', () => {
  console.log('-->')
})

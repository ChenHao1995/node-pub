var express = require('express')
var app = express()
// var consolidate = require('consolidate')
var HTMLing = require('htmling')
var router = require('./router')
var path = require('path')
var http = require('http')

let port = Math.round((1 + Math.random()) * 1000)

// const { spawn } = require('child_process')
// const open = require('open')

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

// app.engine('html', consolidate.htmling)
// app.set('view engine', 'html')
// app.set('views', __dirname + '/views')

app.engine('html', HTMLing.express(__dirname + '/views/'))
app.set('view engine', 'html')

// 静态服务
app.use('/source', express.static('static'))

app.use(express.json())

// mount the router on the app
app.use('/', router)
// app.on('connection', function(req, cltSocket, head) {
//   console.log('connection')
// })

// app.listen(port, '127.0.0.1', () => {
//   console.log(`port:${port}-->`)
//   // open('http://localhost:8888/')
// })

const server = http.createServer(app)

server.on('connection', function(socket) {
  console.log('connection-http')
})

var workerTcp
process.on('message', function(data, tcp) {
  // console.log('this is a child' + data.num)
  // process.send({ msg: 'child' + data + 'success' })
  if (data.includes('server')) {
    port = data.split(':')[1]
    server.listen(port, '127.0.0.1', () => {
      console.log(`port:${port}-->`)
    })
    workerTcp = tcp
    tcp.on('connection', socket => {
      // socket.end(`by child ${process.pid}`)
      server.emit('connection', socket)
    })
  }
})

// setInterval(function() {
//   throw '模拟未补货的异常'
// }, 5000)
process.on('uncaughtException', function() {
  workerTcp.close(function() {
    process.exit(1)
  })
})

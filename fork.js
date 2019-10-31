const fork = require('child_process').fork
const cpus = require('os').cpus()
const net = require('net')

var server = net.createServer()
server.on('connection', socket => {
  console.log('connection-tcp')
  socket.end('by parent')
})
server.on('close', () => {
  console.log('tcp close')
})

server.listen(1337, function() {
  console.log('listen sucess')
  for (var i = 0; i < cpus.length; i++) {
    let child = fork('./app.js')
    child.on('message', function(data) {
      console.log(data)
    })
    // child.send({ num: i })
    child.send(`server_child_${i}`, server)
  }
  server.close()
})

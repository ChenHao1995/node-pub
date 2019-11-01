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
    // let child = fork('./app.js')
    // child.on('message', function(data) {
    //   console.log(data)
    // })
    // // child.send({ num: i })
    // child.send(`server_child_${i}`, server)
    createworker('./app.js', server)
  }
  // server.close()
})

const createworker = (url, sendServer) => {
  createworker.wirkers = {}
  const worker = fork(url)
  worker.on('exit', function() {
    console.log(`child process exit ${worker.pid}, create new process`)
    delete createworker.wirkers[worker.pid]
    createworker(url, sendServer)
  })
  worker.send(`server:${createworker.port}`, sendServer)
  createworker.port += 1
  createworker.wirkers[worker.pid] = worker
  console.log(`create ${worker.pid}`)
}
createworker.port = 4000

process.on('exit', function() {
  console.log('exit all')
  for (var key in createworker.wirkers) {
    createworker.wirkers[key].kill()
  }
})

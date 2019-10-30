const fork = require('child_process').fork
const cpus = require('os').cpus()

for (var i = 0; i < cpus.length; i++) {
  var child_i = fork('./app.js')
  child_i.on('message', function(data) {
    console.log(data)
  })
  child_i.send({ num: i })
}

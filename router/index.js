var express = require('express')
var router = express.Router()
var fs = require('fs')
// const jquery = require('jquery')

router.use(function(req, res, next) {
  console.log('first', Date.now())
  // var str = '深入浅出node.js'
  // var buf = new Buffer(str, 'utf-8')
  next()
})

router.use('/file', function(req, res, next) {
  fs.readFile(__dirname + '/../static/excel/node_test.xlsx', function(
    error,
    data
  ) {
    console.log(error)
    console.log(data)
    res.setHeader('Content-Type', 'application/vnd.ms-excel;charset=UTF-8')
    res.setHeader('Content-Disposition', 'attachment;filename=a.xls')
    res.send(data)
  })
})

router.use(
  '/user/:id',
  function(req, res, next) {
    console.log('req.body', req.body)
    next()
  },
  function(req, res, next) {
    console.log('Request Type:', req.method)
    next()
  }
)

router.get(
  '/user/:id',
  function(req, res, next) {
    // if the user ID is 0, skip to the next router
    if (req.params.id === '0') {
      req.chenhao = 'chenhao'
      next('route')
    } else next()
  },
  function(req, res, next) {
    res.render('home', { title: 'id === 0', content: 'chenhao' })
    // res.end('home')
  }
)

router.get('/user/:id', function(req, res, next) {
  // fs.readFile(__dirname + '/../views/home.html', function(error, data) {
  //   const result = data
  //     .toString()
  //     .replace(
  //       'jquery',
  //       `<script>window.jquery=${jquery}</script><script>window.jquery(window)</script>`
  //     )
  //   fs.writeFile(__dirname + '/../views/home.html', result, err => {
  //     if (err) throw err
  //     console.log('The file has been saved!')
  //   })
  //   console.log(
  //     data
  //       .toString()
  //       .replace(
  //         'jquery',
  //         `<script>window.jquery=${jquery}</script><script>window.jquery(window)</script>`
  //       )
  //   )
  // })
  res.render('home', { title: 'id === 0', content: process.pid })
  // res.render('home')
})

router.use('/test/process', function(req, res) {
  res.end(`use child process ${process.pid}`)
})

module.exports = router

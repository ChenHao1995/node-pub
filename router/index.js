var express = require('express')
var router = express.Router()
const fs = require('fs')
const jquery = require('jquery')

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function(req, res, next) {
  console.log('first', Date.now())
  var str = '深入浅出node.js'
  var buf = new Buffer(str, 'utf-8')
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

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
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

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get(
  '/user/:id',
  function(req, res, next) {
    // if the user ID is 0, skip to the next router
    if (req.params.id === '0') {
      req.chenhao = 'chenhao'
      next('route')
    }
    // otherwise pass control to the next middleware function in this stack
    else next()
  },
  function(req, res, next) {
    // render a regular page
    res.render('home', { title: 'id === 0', content: 'chenhao' })
  }
)

// handler for the /user/:id path, which renders a special page
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
  res.render('home', { title: 'id === 0', content: 'Home' })
})

module.exports = router

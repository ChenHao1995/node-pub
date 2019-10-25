var express = require('express')
var router = express.Router()

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function(req, res, next) {
  console.log('first', Date.now())
  var str = '深入浅出node.js'
  var buf = new Buffer(str, 'utf-8')
  console.log(buf)

  next()
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
  console.log('----')
  console.log(req.chenhao)
  res.render('home', { title: 'id === 0', content: 'wuhaha' })
})

module.exports = router

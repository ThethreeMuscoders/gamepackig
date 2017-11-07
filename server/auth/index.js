const router = require('express').Router()
const User = require('../db/models/user')
const Cart = require('../db/models/cart')
module.exports = router

router.post('/login', (req, res, next) => {
  User.findOne({where: {email: req.body.email}, include:[Cart]})
    .then((user) => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      } else {
        // Here we eager load the users cart if they have any......
        // we can write a function that takes the req.session.car and the user.carts
        // loop through req.session.cart and user the Cart instance method, add Quantity if there's
        // a match, if there isn't a match, then a new cart should be created using the userId and
        // the product id in the req.session.cart object
        // the session cart should be destroyed at this point.
        console.log('sessionCart', req.session.cart, 'registered cart', user.carts[0]);
        // req.login(user, err => (err ? next(err) : res.json(user)))
      }
    })
    .catch(next)
})

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => (err ? next(err) : res.json(user)))
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
})

router.post('/logout', (req, res) => {
  //Note: reset the req.session.cart here
  req.session.cart = [];
  req.logout()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  if (!req.user) {
    req.session.cart = req.session.cart || [];
    req.user = {
      sessionID: req.sessionID,
      isGuest: true,
      cart: req.session.cart,
    };
  }
  res.json(req.user)
})

router.use('/google', require('./google'))

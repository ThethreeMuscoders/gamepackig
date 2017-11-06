const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

router.post('/login', (req, res, next) => {
  User.findOne({where: {email: req.body.email}})
    .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)))
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

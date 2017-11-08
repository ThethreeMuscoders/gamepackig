const router = require('express').Router();
const User = require('../db/models/user');
const Cart = require('../db/models/cart');
const Product = require('../db/models/product');

module.exports = router;

function addQuantity(sessionCart, user) {
  const newCarts = [];
  console.log(user)
  if (!user.carts || (user.carts.length < 1)) {
    for (let i = 0; i < sessionCart.length; i++) {
      const { price, quantity, productId } = sessionCart[i];
      const userId = user.id;
      let newItem = {
        price,
        quantity,
        productId,
        userId,
      };
      newCarts.push(Cart.create(newItem));
    }
    Promise.all(newCarts)
      .then((array) => {
        console.log(array);
      });
  }
};

router.post('/login', (req, res, next) => {
  User.findOne({ where: { email: req.body.email }, include: [Cart] })
    .then((user) => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      } else {
        if (user.carts.length < 0) {
          console.log('in here')
          addQuantity(req.session.cart, user);
        }
        req.login(user, err => (err ? next(err) : res.json(user)))
      }
    })
    .catch(next)
})

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then((user) => {
      addQuantity(req.session.cart, user);
      req.login(user, err => (err ? next(err) : res.json(user)))
    })
    .catch((err) => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
})

router.post('/logout', (req, res) => {
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

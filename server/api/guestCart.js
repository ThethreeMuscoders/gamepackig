// This api is going to be used to persist data to the session of our guestUser
const router = require('express').Router();
const { Cart, Product } = require('../db/models');

module.exports = router;

// get a all carts from the session, though I don't think I'll be needing this one.
router.get('/', (req, res, next) => {

});

// I could probaby just use the api from products here......
router.get('/productId', (req, res, next) => {

});

router.post('/', ({ session, body }, res, next) => {
  const newItem = Object.assign({}, body);
  let didSplice = false;
  if (session.cart.length < 1) {
    session.cart.push(body);
    res.json(session.cart).end();
  } else {
    for (let i = 0; i < session.cart.length; i++) {
      const sessionItem = session.cart[i];
      if (sessionItem.productId === body.productId) {
        newItem.quantity = sessionItem.quantity + body.quantity;
        session.cart.splice(i, 1, newItem);
        didSplice = true;
        break;
      }
    }
    if (!didSplice) {
      session.cart.push(newItem);
    }
    res.json(session.cart);
  }
});

// update cart from the session
router.put('/', (req, res, next) => {

});

// remove cart from the session
router.delete('/', (req, res, next) => {
  console.log(req.session)
});

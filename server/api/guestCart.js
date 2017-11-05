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
  if (session.cart.length < 1) {
    session.cart.push(body);
    res.json(session.cart).end();
  } else {
    // console.log('newItem', newItem)
    console.log(session.cart.length)
    for (let i = 0; i < session.cart.length; i++) {
      const sessionItem = session.cart[i];
      console.log(sessionItem.productId, body.productId)
      
      if (sessionItem.productId === body.productId) {
        console.log(sessionItem.productId, body.productId)
        newItem.quantity = sessionItem.quantity + body.quantity;
        session.cart.splice(i, 1, newItem);
        break;
      }
    }
    session.cart.push(newItem);
    res.json(session.cart);
  }
  //   console.log(newCart)
});

// update cart from the session
router.put('/', (req, res, next) => {

});

// remove cart from the session
router.delete('/', (req, res, next) => {

});

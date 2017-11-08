// This api is going to be used to persist data to the session of our guestUser
const router = require('express').Router();
const { Cart, Product } = require('../db/models');

module.exports = router;


function axiosFetchProduct(cartItem) {
  return Product.findById(cartItem.productId)
    
    .catch(err => console.log(err))
}


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
    const allProductPromises = session.cart.map(item => axiosFetchProduct(item));
    Promise.all(allProductPromises)
      .then((updatedProducts) => {
        session.cart.forEach((el, i) => {
          el = updatedProducts[i];
        });
        res.json(session.cart);
      });
  }
});

router.delete('/:itemId', (req, res, next) => {
  const itemId = parseInt(req.params.itemId, 10);
  const sessionCart = req.session.cart;

  for (let i = 0; i < sessionCart.length; i++) {
    if (sessionCart[i].productId === itemId) {
      sessionCart.splice(i, 1);
    }
  }
  res.json(req.session.cart);
});

router.post('/removeCart', (req, res, next) => {
  req.session.cart = [];
  res.json(req.session.cart);
})
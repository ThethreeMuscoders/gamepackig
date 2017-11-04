const router = require('express').Router();
const { Cart, Product } = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  Cart.findAll()
    .then(carts => res.json(carts))
    .catch(next);
});

router.get('/:userId', (req, res, next) => {
  Cart.findAll({
    where: {
      userId: req.params.userId,
    },
    include: [
      { model: Product, as: 'product' },
    ],
  })
    .then(carts => res.json(carts))
    .catch(next);
});

router.get('/:userId/:productId', (req, res, next) => {
  Cart.findOne({
    where: {
      userId: req.params.userId,
      productId: req.params.productId,
    },
    include: [
      { model: Product, as: 'product' },
    ],
  })
    .then(cart => res.json(cart))
    .catch(next);
});

// Creates single row in cart for one item
router.post('/', (req, res, next) => {
  Cart.create(req.body)
    .then(cart => res.status(201).json(cart))
    .catch(next);
});

router.put('/:cartId', (req, res, next) => {
  console.log(req.params.cartId, 'API')
  Cart.findById(req.params.cartId)
    .then(cart => cart.update(req.body))
    .then(cart => res.send(cart))
    .catch(next);
});

router.delete('/:cartId', (req, res, next) => {
  Cart.destroy({
    where: {
      id: req.params.cartId,
    },
  })
    .then(() => res.status(204).end())
    .catch(next);
});

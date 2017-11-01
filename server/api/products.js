const router = require('express').Router();
const { Product } = require('../db/models');

module.exports = router;

// router.param('productId', )

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.json(products))
    .catch(next);
});

router.get('/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => res.json(product))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Product.findOrCreate({
    where: req.body,
  })
    .then(product => res.status(201).json(product))
    .catch(next);
});

router.put('/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => product.update(req.body))
    .then(product => res.send(product))
    .catch(next);
});

router.delete('/:productId', (req, res, next) => {
  Product.destroy({
    where: {
      id: req.params.productId,
    },
  })
    .then(() => res.status(204).end())
    .catch(next);
});

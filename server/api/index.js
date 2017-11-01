const router = require('express').Router()
module.exports = router

router.use('/carts', require('./cart'));
router.use('/users', require('./users'));
router.use('/products', require('./products'));
router.use('/reviews', require('./review'));
router.use('/history', require('./purchaseHistory'));
router.use('/categories', require('./category'));

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

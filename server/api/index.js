const router = require('express').Router()
const { isAdmin } = require('../middleware/auth')
module.exports = router

router.use('/carts', require('./cart'));
router.use('/users', require('./users'));
router.use('/products', require('./products'));
router.use('/reviews', require('./review'));
router.use('/history', require('./purchaseHistory'));
router.use('/category', require('./category'));

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

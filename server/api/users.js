const router = require('express').Router();
const { User, Cart, PurchaseHistory } = require('../db/models');

module.exports = router;

const attributes = ['id', 'email', 'billingAddress', 'shippingAddress', 'isAdmin'];

// Gets finds userby id
router.param('id', (req, res, next, id) => {
  User.findById(id, {
    attributes,
    include: [
      { model: Cart, as: 'product' },
      { model: PurchaseHistory, as: 'purchases' },
    ],
  })
    .then((user) => {
      req.selectedUser = user;
      next(); // important to have next() otherwise the server will hang here!
    })
    .catch(next);
});

// Get all users
router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes,
  })
    .then(users => res.json(users))
    .catch(next);
});

// Get specific User
router.get('/:id', (req, res, next) => {
  req.selectedUser.reload({
    attributes,
    include: [Cart, PurchaseHistory],
  })
    .then((user) => {
      res.json(user);
    })
    .catch(next);
});

// Update user
router.put('/:id', (req, res, next) => {
  req.selectedUser.update(req.body)
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch(next);
});

// Post User
router.post('/', (req, res, next) => {
  User.create(req.body)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch(next);
});

// Delete Single User
router.delete('/:id', (req, res, next) => {
  req.selectedUser.destroy()
    .then(() => {
      res.status(204).send('User Deleted').end();
    })
    .catch(next);
});

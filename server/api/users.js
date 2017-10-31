const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router


router.param('userId', (req, res, next, userId) => {
  User.findById(userId)
  .then(user => {
    req.selectedUser = user;
  })
  .catch(next)
})

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:userId', (req, res, next) => {
  res.status(200).json(req.selectedUser);
});




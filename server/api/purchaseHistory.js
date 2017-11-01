const router = require('express').Router();
const { PurchaseHistory } = require('../db/models');

module.exports = router;

// router.param('historyId', )

router.get('/', (req, res, next) => {
  PurchaseHistory.findAll()
    .then(histories => res.json(histories))
    .catch(next);
});

router.get('/:userId', (req, res, next) => {
  PurchaseHistory.findAll({
    where: {
      userId: req.params.userId,
    },
  })
    .then(history => res.json(history))
    .catch(next);
});

router.post('/', (req, res, next) => {
  PurchaseHistory.create(req.body)
    .then(history => res.status(201).json(history))
    .catch(next);
});

router.put('/:historyId', (req, res, next) => {
  PurchaseHistory.findById(req.params.historyId)
    .then(history => history.update(req.body))
    .then(history => res.send(history))
    .catch(next);
});

// used strictly for admins
router.delete('/:historyId', (req, res, next) => {
  PurchaseHistory.destroy({
    where: {
      id: req.params.historyId,
    },
  })
    .then(() => res.status(204).end())
    .catch(next);
});

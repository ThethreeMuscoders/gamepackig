const router = require('express').Router()
const { Category } = require('../db/models')
module.exports = router


router.param('categoryId', (req, res, next, categoryId) => {
  Category.findById(categoryId)
    .then(category => {
      req.selectedCategory = category;
      next();
    })
    .catch(next)
})

router.get('/', (req, res, next) => {
  Category.findAll()
    .then(categories => res.json(categories))
    .catch(next);
})

router.get('/:categoryId', (req, res, next) => {
  req.selectedCategory.reload()
    .then((category) => {
      res.json(category).status(200);
    })
    .catch(next)
});


router.post('/', (req, res, next) => {
  const category = req.body;
  Category.create(category)
    .then(category => {
      res.status(201).json(category);
    })
    .catch(next);
})

router.put('/:categoryId', (req, res, next) => {
  req.selectedCategory.update(req.body)
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch(next);
})

router.delete('/:categoryId', (req, res, next) => {
  req.selectedCategory.destroy()
    .then((category) => {
      res.status(204).send(category);
    })
    .catch(next)
})


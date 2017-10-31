const router = require('express').Router()
const {Category} = require('../db/models')
module.exports = router


router.param('categoryId', (req, res, next, categoryId) => {
  Category.findById(categoryId)
  .then(review => {
    req.selectedCategory = category;
    next();
  })
  .catch(next)
})

router.get('/', (req, res, next) => {
  Category.findAll({
  })
    .then(categories => res.json(categories))
    .catch(next)
})

router.get('/:categoryId', (req, res, next) => {
  res.status(200).json(req.selectedCategory);
});


router.post('/newCategory', (req, res, next) => {
  const category = req.body;
  Review.create(category)
    .then(category => {
      res.status(201).json(category);
    })
    .catch(next);
})

router.put('/:categoryId', (req, res, next) => {
  req.selectedCategory.update(req.body)
    .then(
    res.status(201)
    )
    .done();
})

router.delete('/:categoryId', (req, res, next) => {
  const categoryId = req.params.categoryId;

  req.selectedCategory.destroy()
  .then(() => {
    res.status(204).send('deleted category').end();
  })
  
  .catch(next)
  
  
  findById(categoryId)
  .then(category => {
    return category.destroy()
  })
  .then(() => {
    return res.status(204);
  })
  .catch(next);
  })


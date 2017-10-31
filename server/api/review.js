const router = require('express').Router()
const {Review} = require('../db/models')
module.exports = router


router.param('reviewId', (req, res, next, reviewId) => {
  Review.findById(reviewId)
  .then(review => {
    req.selectedReview = review;
    next();
  })
  .catch(next)
})

router.get('/', (req, res, next) => {
  Review.findAll({
  })
    .then(reviews => res.json(reviews))
    .catch(next)
})

router.get('/:reviewId', (req, res, next) => {
  res.status(200).json(req.selectedReview);
});


router.post('/newReview', (req, res, next) => {
  const review = req.body;
  Review.create(review)
    .then(review => {
      res.status(201).json(review);
    })
    .catch(next);
})

router.put('/:reviewId', (req, res, next) => {
  req.selectedReview.update(req.body)
    .then(
    res.status(201)
    )
    .done();
})

router.delete('/:reviewId', (req, res, next) => {
  const reviewId = req.params.reviewId;

  req.selectedReview.destroy()
  .then(() => {
    res.status(204).send('deleted review').end();
  })
  
  .catch(next)
  
  
  findById(reviewId)
  .then(review => {
    return review.destroy()
  })
  .then(() => {
    return res.status(204);
  })
  .catch(next);
  })


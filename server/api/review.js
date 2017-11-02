const router = require('express').Router();
const { Review } = require('../db/models');
module.exports = router;


router.param('reviewId', (req, res, next, reviewId) => {
  Review.findById(reviewId)
    .then((review) => {
      req.selectedReview = review;
      next(); // Next is called here to move on to the appropriate route.
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  Review.findAll()
    .then(reviews => res.json(reviews))
    .catch(next);
});

router.get('/:reviewId', (req, res, next) => {
  req.selectedReview.reload()
    .then((review) => {
      res.json(review).status(200);
    })
    .catch(next);
});


router.post('/', (req, res, next) => {
  const review = req.body;
  Review.create(review)
    .then((createdReview) => {
      res.status(201).json(createdReview);
    })
    .catch(next);
});

router.put('/:reviewId', (req, res, next) => {
  req.selectedReview.update(req.body)
    .then((updatedReview) => {
      res.json(updatedReview);
    })
    .catch(next);
});

router.delete('/:reviewId', (req, res, next) => {
  req.selectedReview.destroy()
    .then((review) => {
      res.status(204).send(review);
    })
    .catch(next);
});


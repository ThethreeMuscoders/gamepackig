/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('./index')
const Review = db.model('review')

describe('Review routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/review/', () => {
    const review = {
      description: 'this is a test product',
      rating: 5,
    };

    beforeEach(() => {
      return Review.create({
        description: review['description'],
        rating: review['rating'],
      })
    })

    it('GET /api/review', () => {
      return request(app)
        .get('/api/review')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].description).to.be.equal(review.description);
          expect(res.body[0].rating).to.be.equal(review.rating);
        })
    })
    

    it('POST /api/review', () => {
      return request(app)
      .post('/api/newReview')
      .expect(201)
      .then(res => {
      })
    })

    it('PUT /api/review', () => {
      return request(app)
      .put('/api/newReview')
      .expect(201)
      .then(res => {
      })
    })

    it('DELETE /api/review', () => {
      return request(app)
      .delete('/api/review')
      .expect(201)
      .then(res => {
      })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')

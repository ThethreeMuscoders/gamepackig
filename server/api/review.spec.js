/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Review = db.model('review')
const User = db.model('user');
const Product = db.model('product');

describe('Review routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('/api/reviews/', () => {

    const review = {
      description: 'test description',
      rating: 5,
      productId: 0,
      userId: 0,
    }

    const userObj = {
      email: 'bonddavis@gmail.com',
      password: '007',
      billingAddress: 'Bond street',
      shippingAddress: 'bond street',
    }

    const productObj = {
      name: 'computer1',
      image: 'randomimg',
      description: 'a really god pc',
      price: 1500000.51,
      quantity: 5,
      categoryId: 1

    }

    let userInstance;
    let productInstance;
    let reviewId;

    beforeEach((done) => {
      User.create(userObj)
        .then((user) => {
          review.userId = user.id
          userInstance = user
          return Product.create(productObj)
        })
        .then(product => {
          review.productId = product.id;
          productInstance = product;
          return Review.create(review)
        })
        .then((newReview) => {
          reviewId = newReview.id
          done()
        })
    })

    afterEach((done) => {
      Review.destroy({
        where: review
      })
        .then(() => userInstance.destroy())
        .then(() => productInstance.destroy())
        .then(() => {
          done()
        })
    })

    it('GET /api/reviews', () => {
      return request(app)
        .get('/api/reviews/')
        .expect(200)
        .then(res => {
          
          expect(res.body).to.be.an('array')
          expect(res.body[0].description).to.be.equal(review.description);
          expect(res.body[0].rating).to.be.equal(review.rating);
        })
    })

    it('GET /api/reviews/:reviewId', () => {
      return request(app)
      .get(`/api/reviews/${reviewId}`)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object')
        expect(res.body.description).to.be.equal(review.description);
        expect(res.body.rating).to.be.equal(review.rating);
        expect(res.body.userId).to.be.equal(review.userId);
        expect(res.body.productId).to.be.equal(review.productId);        
        
      })
    })

    it('POST /api/reviews', () => {
      const reviewToPost = {
        description: 'test description to post',
        rating: 1,
        productId: 1,
        userId: 1,
      }
      return request(app)
        .post('/api/reviews/')
        .send(reviewToPost)
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.description).to.be.equal(reviewToPost.description);
          expect(res.body.rating).to.be.equal(reviewToPost.rating);
          expect(res.body.userId).to.be.equal(reviewToPost.userId);
          expect(res.body.productId).to.be.equal(reviewToPost.productId); 
        })
    })

    it('PUT /api/reviews', () => {
      const update = {
        description: 'Updated description',
        rating: 3.2
      }
      return request(app)
        .put(`/api/reviews/${reviewId}`)
        .send(update)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.description).to.be.equal(update.description);
          expect(res.body.rating).to.be.equal(update.rating);
        })
    })

    it('DELETE /api/reviews', () => {
      return request(app)
        .delete(`/api/reviews/${reviewId}`)
        .expect(204)
        .then(res => {
           Review.findById(reviewId)
          .then(review => {
            expect(review).to.be.equal(null)
          })
      })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')

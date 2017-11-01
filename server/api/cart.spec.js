/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');

const Cart = db.model('cart');
const Product = db.model('product');
const User = db.model('user');

describe('Cart Routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/carts/', () => {
    const userObj = {
      email: 'bonddavis@gmail.com',
      password: '007',
      billingAddress: 'Bond street',
      shippingAddress: 'bond street',
    };

    const productObj = {
      name: 'computer1',
      image: 'randomimg',
      description: 'a really god pc',
      price: 1500000.51,
      quantity: 5,
      categoryId: 1,
    };

    const cartObj = {
      quantity: 1,
    };

    let productId;
    let userId;
    let cartId;

    beforeEach((done) => {
      Product.create(productObj)
        .then((product) => {
          productId = product.id;
          cartObj.productId = product.id;
          cartObj.price = product.price;

          return User.create(userObj);
        })
        .then((user) => {
          userId = user.id;
          cartObj.userId = user.id;

          return Cart.create(cartObj);
        })
        .then((cart) => {
          cartId = cart.id;
          done();
        });
    });

    afterEach((done) => {
      Product.destroy({
        where: {
          id: productId,
        },
      })
        .then(() => User.destroy({
          where: {
            id: userId,
          },
        }))
        .then(() => {
          done();
        });
    });

    it('GET /api/carts', () => {
      return request(app)
        .get('/api/carts/')
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an('array');
          expect(body[0].price).to.be.equal(cartObj.price);
          expect(body[0].quantity).to.be.equal(cartObj.quantity);
          expect(body[0].userId).to.be.equal(cartObj.userId);
          expect(body[0].productId).to.be.equal(cartObj.productId);
        });
    });

    it('GET /api/carts/:userId', () => {
      return request(app)
        .get(`/api/carts/${userId}`)
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an('array');
          expect(body[0].price).to.be.equal(cartObj.price);
          expect(body[0].quantity).to.be.equal(cartObj.quantity);
          expect(body[0].userId).to.be.equal(cartObj.userId);
          expect(body[0].productId).to.be.equal(cartObj.productId);
        });
    });

    it('POST /api/carts', () => {
      const cartToPost = {
        price: 19.69,
        quantity: 4,
        userId: 1,
        productId: 1,
      };

      return request(app)
        .post('/api/carts/')
        .send(cartToPost)
        .expect(201)
        .then(({ body }) => {
          expect(body).to.be.an('object');
          expect(body.price).to.be.equal(cartToPost.price);
          expect(body.quantity).to.be.equal(cartToPost.quantity);
          expect(body.userId).to.be.equal(cartToPost.userId);
          expect(body.productId).to.be.equal(cartToPost.productId);
        });
    });

    it('PUT /api/carts', () => {
      const update = {
        quantity: 999,
        price: 30.22,
      };

      return request(app)
        .put(`/api/carts/${cartId}`)
        .send(update)
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an('object');
          expect(body.price).to.be.equal(update.price);
          expect(body.quantity).to.be.equal(update.quantity);
          expect(body.userId).to.be.equal(cartObj.userId);
          expect(body.productId).to.be.equal(cartObj.productId);
        });
    });

    it('DELETE /api/carts', () => {
      return request(app)
        .delete(`/api/carts/${cartId}`)
        .expect(204)
        .then(() => {
          Cart.findById(cartId)
            .then((cart) => {
              expect(cart).to.be.equal(null);
            });
        });
    });
  }); // end describe('/api/users')
}); // end describe('User routes')

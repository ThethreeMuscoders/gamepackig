/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');

const PurchaseHistory = db.model('purchaseHistory');
const User = db.model('user');
const Product = db.model('product');

describe('PurchaseHistory Routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/history/', () => {
    const userObj = {
      email: 'damian@gmail.com',
      password: '001',
      billingAddress: 'FSA',
      shippingAddress: 'secret street',
    };

    const productObj = {
      name: 'computer1',
      image: 'randomimg',
      description: 'a really god pc',
      price: 23.54,
      quantity: 5,
      categoryId: 1,
    };

    const historyObj = {
      deliveryDate: '10/20/2017',
      expectedDate: '10/20/2017',
      status: 'COMPLETED',
      price: 23.54,
      userId: 1,
      productId: 1,
    };

    let historyId;
    let userId;
    let productId;

    beforeEach((done) => {
      User.create(userObj)
        .then((user) => {
          userId = user.id;
          return Product.create(productObj);
        })
        .then((product) => {
          productId = product.id;
          return PurchaseHistory.create(historyObj);
        })
        .then((history) => {
          historyId = history.id;
          done();
        });
    });

    afterEach((done) => {
      PurchaseHistory.destroy({
        where: {
          id: historyId,
        },
      })
        .then(() =>
          Product.destroy({
            where: {
              id: productId,
            },
          }))
        .then(() =>
          User.destroy({
            where: {
              id: userId,
            },
          }))
        .then(() => {
          done();
        });
    });

    it('GET /api/history', () => {
      return request(app)
        .get('/api/history/')
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an('array');
          expect(body[0].status).to.be.equal(historyObj.status);
          expect(body[0].price).to.be.equal(historyObj.price);
          expect(body[0].userId).to.be.equal(historyObj.userId);
          expect(body[0].productId).to.be.equal(historyObj.productId);
        });
    });

    it('GET /api/history/:userId', () => {
      return request(app)
        .get(`/api/history/${userId}`)
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an('array');
          expect(body[0].status).to.be.equal(historyObj.status);
          expect(body[0].price).to.be.equal(historyObj.price);
          expect(body[0].userId).to.be.equal(historyObj.userId);
          expect(body[0].productId).to.be.equal(historyObj.productId);
        });
    });

    it('POST /api/history', () => {
      const historyToPost = {
        deliveryDate: '10/29/2017',
        expectedDate: '10/20/2017',
        status: 'CREATED',
        price: 23.54,
        userId: 1,
        productId: 1,
      };

      return request(app)
        .post('/api/history/')
        .send(historyToPost)
        .expect(201)
        .then(({ body }) => {
          expect(body).to.be.an('object');
          expect(body.status).to.be.equal(historyToPost.status);
          expect(body.price).to.be.equal(historyToPost.price);
          expect(body.userId).to.be.equal(historyToPost.userId);
          expect(body.productId).to.be.equal(historyToPost.productId);
        });
    });

    it('PUT /api/history', () => {
      const update = {
        status: 'CANCELLED',
      };

      return request(app)
        .put(`/api/history/${historyId}`)
        .send(update)
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an('object');
          expect(body.status).to.be.equal(update.status);
          expect(body.price).to.be.equal(historyObj.price);
          expect(body.userId).to.be.equal(historyObj.userId);
          expect(body.productId).to.be.equal(historyObj.productId);
        });
    });

    it('DELETE /api/history', () => {
      return request(app)
        .delete(`/api/history/${historyId}`)
        .expect(204)
        .then(() => {
          PurchaseHistory.findById(historyId)
            .then((history) => {
              expect(history).to.be.equal(null);
            });
        });
    });
  }); // end describe('/api/users')
}); // end describe('User routes')

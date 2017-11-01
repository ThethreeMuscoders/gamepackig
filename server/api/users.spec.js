/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');

const User = db.model('user');

describe('User Routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/users/', () => {
    const userObj = {
      email: 'bonddavis@gmail.com',
      password: '007',
      billingAddress: 'Bond street',
      shippingAddress: 'bond street',
      name: 'bond',
    };

    let userId;

    beforeEach((done) => {
      User.create(userObj)
        .then((user) => {
          userId = user.id;
          done();
        });
    });

    afterEach((done) => {
      User.destroy({
        where: {
          id: userId,
        },
      })
        .then(() => {
          done();
        });
    });

    it('GET /api/users', () => {
      return request(app)
        .get('/api/users/')
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an('array');
          expect(body[0].email).to.be.equal(userObj.email);
          expect(body[0].billingAddress).to.be.equal(userObj.billingAddress);
          expect(body[0].shippingAddress).to.be.equal(userObj.shippingAddress);
          expect(body[0].isAdmin).to.be.equal(false);
        });
    });

    it('GET /api/users/:userId', () => {
      return request(app)
        .get(`/api/users/${userId}`)
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an('object');
          expect(body.email).to.be.equal(userObj.email);
          expect(body.billingAddress).to.be.equal(userObj.billingAddress);
          expect(body.shippingAddress).to.be.equal(userObj.shippingAddress);
          expect(body.isAdmin).to.be.equal(false);
        });
    });

    it('POST /api/users', () => {
      const userToPost = {
        email: 'damian@damian.com',
        password: '011',
        billingAddress: 'Damians Den',
        shippingAddress: 'Damians House',
        name: 'bond',
      };

      return request(app)
        .post('/api/users/')
        .send(userToPost)
        .expect(201)
        .then(({ body }) => {
          expect(body).to.be.an('object');
          expect(body.email).to.be.equal(userToPost.email);
          expect(body.billingAddress).to.be.equal(userToPost.billingAddress);
          expect(body.shippingAddress).to.be.equal(userToPost.shippingAddress);
          expect(body.isAdmin).to.be.equal(false);
        });
    });

    it('PUT /api/users', () => {
      const update = {
        email: 'damian@damian.damian',
        billingAddress: 'Damians House',
        shippingAddress: 'Damians Den',
        isAdmin: true,
      };

      return request(app)
        .put(`/api/users/${userId}`)
        .send(update)
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an('object');
          expect(body.email).to.be.equal(update.email);
          expect(body.billingAddress).to.be.equal(update.billingAddress);
          expect(body.shippingAddress).to.be.equal(update.shippingAddress);
          expect(body.isAdmin).to.be.equal(update.isAdmin);
        });
    });

    it('DELETE /api/users', () => {
      return request(app)
        .delete(`/api/users/${userId}`)
        .expect(204)
        .then(() => {
          User.findById(userId)
            .then((user) => {
              expect(user).to.be.equal(null);
            });
        });
    });
  }); // end describe('/api/users')
}); // end describe('User routes')

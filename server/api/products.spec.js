/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');

const Product = db.model('product');

describe('Product Routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/products/', () => {
    const productObj = {
      name: 'computer1',
      image: 'randomimg',
      description: 'a really god pc',
      price: 1500000.51,
      quantity: 5,
      categoryId: 1,
    };

    let productId;

    beforeEach((done) => {
      Product.create(productObj)
        .then((product) => {
          productId = product.id;
          done();
        });
    });

    afterEach((done) => {
      Product.destroy({
        where: {
          id: productId,
        },
      })
        .then(() => {
          done();
        });
    });

    it('GET /api/products', () => {
      return request(app)
        .get('/api/products/')
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an('array')
          expect(body[0].name).to.be.equal(productObj.name);
          expect(body[0].image).to.be.equal(productObj.image);
          expect(body[0].description).to.be.equal(productObj.description);
          expect(body[0].price).to.be.equal(productObj.price);
          expect(body[0].quantity).to.be.equal(productObj.quantity);
          expect(body[0].categoryId).to.be.equal(productObj.categoryId);
        });
    });

    it('GET /api/products/:productId', () => {
      return request(app)
        .get(`/api/products/${productId}`)
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an('object');
          expect(body.name).to.be.equal(productObj.name);
          expect(body.image).to.be.equal(productObj.image);
          expect(body.description).to.be.equal(productObj.description);
          expect(body.price).to.be.equal(productObj.price);
          expect(body.quantity).to.be.equal(productObj.quantity);
          expect(body.categoryId).to.be.equal(productObj.categoryId);
        });
    });

    it('POST /api/products', () => {
      const productToPost = {
        name: 'graphic card',
        image: 'image 8',
        description: 'super awesome card',
        price: 4.51,
        quantity: 2,
        categoryId: 2,
      };

      return request(app)
        .post('/api/products/')
        .send(productToPost)
        .expect(201)
        .then(({ body }) => {
          // findOrCreate returns array
          const [product] = body;
          expect(product).to.be.an('object');
          expect(product.name).to.be.equal(productToPost.name);
          expect(product.image).to.be.equal(productToPost.image);
          expect(product.description).to.be.equal(productToPost.description);
          expect(product.price).to.be.equal(productToPost.price);
          expect(product.quantity).to.be.equal(productToPost.quantity);
          expect(product.categoryId).to.be.equal(productToPost.categoryId);
        });
    });

    it('PUT /api/products', () => {
      const update = {
        description: 'Not an awesome card',
        price: 0.99,
        quantity: 999,
      };

      return request(app)
        .put(`/api/products/${productId}`)
        .send(update)
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an('object');
          expect(body.name).to.be.equal(productObj.name);
          expect(body.image).to.be.equal(productObj.image);
          expect(body.description).to.be.equal(update.description);
          expect(body.price).to.be.equal(update.price);
          expect(body.quantity).to.be.equal(update.quantity);
          expect(body.categoryId).to.be.equal(productObj.categoryId);
        });
    });

    it('DELETE /api/products', () => {
      return request(app)
        .delete(`/api/products/${productId}`)
        .expect(204)
        .then(() => {
          Product.findById(productId)
            .then((product) => {
              expect(product).to.be.equal(null);
            });
        });
    });
  }); // end describe('/api/users')
}); // end describe('User routes')

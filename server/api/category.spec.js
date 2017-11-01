/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Category = db.model('category')

describe('Category routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('/api/categories/', () => {


    let category;

    let categoryId;

    beforeEach(() => {
     return Category.create({
       category: 'Software'
     })
      .then((newCat) => {
        category = newCat
        categoryId = newCat.id;
      })
    })

    afterEach((done) => {
      category.destroy()
      .then(() => {
        done();
      })
    })

    it('GET /api/categories', () => {
      return request(app)
        .get('/api/categories/')
        .expect(200)
        .then(res => {
          
          expect(res.body).to.be.an('array')
          expect(res.body[0].category).to.be.equal('Software');
        })
    })

    it('GET /api/categories/:categoryId', () => {
      return request(app)
      .get(`/api/categories/${categoryId}`)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object')
        expect(res.body.category).to.be.equal('Software');        
        
      })
    })

    it('POST /api/categories', () => {
      const categoryToPost = {
        category: 'Hardware'
      }
      return request(app)
        .post('/api/categories/')
        .send(categoryToPost)
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.category).to.be.equal(categoryToPost.category);           
        })
    })

    it('PUT /api/categories', () => {
      const updateCategory = {
        category: 'Video Games',
      }
      return request(app)
        .put(`/api/categories/${categoryId}`)
        .send(updateCategory)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.category).to.be.equal(updateCategory.category);
        })
    })

    it('DELETE /api/categories', () => {
      return request(app)
        .delete(`/api/categories/${categoryId}`)
        .expect(204)
        .then(res => {
           Category.findById(categoryId)
          .then(category => {
            expect(category).to.be.equal(null)
          })
      })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('./category')
const Category = db.model('category')

describe('Category routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/category/', () => {
    const hardwareCategory = 'Hardware'

    beforeEach(() => {
      return Category.create({
        category: hardwareCategory
      })
    })

    it('GET /api/category', () => {
      return request(app)
        .get('/api/category')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].category).to.be.equal(hardwareCategory)
        })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')

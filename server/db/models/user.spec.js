/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const User = require('./user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody;

      beforeEach((done) => {
        User.create({
          email: 'cody@puppybook.com',
          password: 'bones',
          billingAddress: '123 S Nowhere',
          shippingAddress: '123 S Nowhere',
        })
          .then((user) => {
            cody = user;
            done();
          });
      });

      xit('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      });

      xit('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')

  describe('User Model Schema', () => {

    xit('Has email, password, salt, googleId, isAdmin, billingAddress, shippingAddress', () => {
      expect(User.attributes.email).to.exist;
      expect(User.attributes.password).to.exist;
      expect(User.attributes.salt).to.exist;
      expect(User.attributes.googleId).to.exist;
      expect(User.attributes.isAdmin).to.exist;
      expect(User.attributes.billingAddress).to.exist;
      expect(User.attributes.shippingAddress).to.exist;
    });

    xit('Has notNull validations for email, password, billingAddress, shippingAddress', () => {
      const user = User.build();
      return user.validate()
        .then(() => {
          throw new Error('Promise should have rejected')
        })
        .catch((err) => {
          expect(err).to.exist;
          expect(err).to.be.an('error');
          expect(err.errors[0]).to.include({
            type: 'notNull Violation',
            path: 'email',
          });
          expect(err.errors[1]).to.include({
            type: 'notNull Violation',
            path: 'password',
          });
          expect(err.errors[2]).to.include({
            type: 'notNull Violation',
            path: 'billingAddress',
          });
          expect(err.errors[3]).to.include({
            type: 'notNull Violation',
            path: 'shippingAddress',
          });
        });
    });
  });// end desctribe('User Model Schema')
}); // end describe('User model')

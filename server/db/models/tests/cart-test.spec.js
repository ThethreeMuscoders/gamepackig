import db from '../../db';
import Cart from '../cart';
import chai from 'chai';

const { expect } = chai.expect;


describe('Cart Table', () => {
  beforeEach('Synchronise and clear db', () => db.sync({ force: true }));
  afterEach('Syncronize and clear db', () => db.sync({ force: true }));

  describe('Cart model', () => {
    xit('Should Have the correct schema definition', () => {
      expect('yes').to.equal('yes');
    });
  });
});

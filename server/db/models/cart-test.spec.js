import db from '../../db';
import Cart from './cart';
import chai from 'chai';

const { expect } = chai;


describe('Cart Table', () => {
  beforeEach('Synchronise and clear db', () => db.sync({ force: true }));
  afterEach('Syncronize and clear db', () => db.sync({ force: true }));

  describe('Cart model', () => {

    it('Should Have the correct schema definition', () => {
      expect(Cart.attributes.quantity).to.exist;
      expect(Cart.attributes.price).to.exist;
      expect(Cart.attributes.userId).to.exist;
      expect(Cart.attributes.productId).to.exist;
    });

    it('Should Have the following validations', () => {
      const cart = Cart.build();
      return cart.validate()
        .then(() => {
          throw new Error('Promise Should have rejected');
        })
        .catch((err) => {
          expect(err.errors[0].path).to.be.equal('quantity');
          expect(err.errors[0].type).to.be.equal('notNull Violation');
          expect(err.errors[1].path).to.be.equal('price');
          expect(err.errors[1].type).to.be.equal('notNull Violation');
        });
    });
  });
});

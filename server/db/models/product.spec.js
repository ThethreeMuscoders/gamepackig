import db from '../../db';
import Product from './product';
import chai from 'chai';

const { expect } = chai;


describe('Product Table', () => {
  beforeEach('Synchronise and clear db', () => db.sync({ force: true }));
  afterEach('Syncronize and clear db', () => db.sync({ force: true }));

  describe('Product model', () => {
    it('Should Have the correct schema definition', () => {
      expect(Product.attributes.name).to.exist;
      expect(Product.attributes.image).to.exist;
      expect(Product.attributes.description).to.exist;
      expect(Product.attributes.price).to.exist;
      expect(Product.attributes.price).to.exist;
    });

    it('Should Have the following validations', () => {
      const category = Category.build();
      return category.validate()
        .then(() => {
          throw new Error('Promise Should have rejected');
        })
        .catch((err) => {
          expect(err.errors[0].path).to.be.equal('category');
          expect(err.errors[0].type).to.be.equal('notNull Violation');
        });
    });
  });
});

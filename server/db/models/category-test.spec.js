import db from '../../db';
import Category from './category';
import chai from 'chai';

const { expect } = chai;


describe('Category Table', () => {
  beforeEach('Synchronise and clear db', () => db.sync({ force: true }));
  afterEach('Syncronize and clear db', () => db.sync({ force: true }));

  describe('Category model', () => {
    it('Should Have the correct schema definition', () => {
      expect(Category.attributes.category).to.exist;
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

import db from '../../db';
import Review from './review';
import chai from 'chai';

const { expect } = chai;


describe('Review Table', () => {
  beforeEach('Synchronise and clear db', () => db.sync({ force: true }));
  afterEach('Syncronize and clear db', () => db.sync({ force: true }));

  describe('Review model', () => {
    xit('Should Have the correct schema definition', () => {
      expect(Review.attributes.description).to.exist;
      expect(Review.attributes.rating).to.exist;
    });

    xit('Should Have the following validations', () => {
      const review = Review.build();
      return review.validate()
        .then(() => {
          throw new Error('Promise Should have rejected');
        })
        .catch((err) => {
          expect(err.errors[0]).to.include({
            path: 'description',
            type: 'notNull Violation',
          });
        });
    });
  });
});

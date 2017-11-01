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
      expect(Product.attributes.quantity).to.exist;
      expect(Product.attributes.categoryId).to.exist;
    });

    it('Should Have the following validations', () => {
      const product = Product.build();
      return product.validate()
        .then(() => {
          throw new Error('Promise Should have rejected');
        })
        .catch((err) => {
          expect(err).to.exist;
          expect(err).to.be.an('error')
          expect(err.errors[0]).to.include({
            path: 'name',
            type: 'notNull Violation',
          });
          expect(err.errors[1]).to.include({
            path: 'description',
            type: 'notNull Violation',
          });
          expect(err.errors[2]).to.include({
            path: 'price',
            type: 'notNull Violation',
          });
          expect(err.errors[3]).to.include({
            path: 'categoryId',
            type: 'notNull Violation',
          });
        });
    });
    describe('Products instance methods', () => {
      let product;
      beforeEach('create a product new product', () => {
        return Product.create({ // We have to return this otherwise product might not be assigned before running a test
          name: 'GTX 980',
          description: 'New top of the line graphics card from Nvidia back in 2015',
          price: 800.00,
          categoryId: 1,
          quantity: 10,
        })
          .then((newProduct) => {
            product = newProduct;
          })
          .catch(console.error);
      });

      it('Should have a class method called addQuantity that increases the product quantity', () => {
        expect(product.quantity).to.equal(10);
        product.addQuantity(5);
        expect(product.quantity).to.equal(15);
        product.addQuantity(5);
        expect(product.quantity).to.equal(20);
      });

      it('Should have a class method called removeQuantity that decreases the products quantity', () => {
        expect(product.quantity).to.equal(10);
        product.removeQuantity(2);
        expect(product.quantity).to.equal(8);
        product.removeQuantity(4);
        expect(product.quantity).to.equal(4);
      });
    });
  });
});

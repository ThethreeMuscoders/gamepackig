const User = require('./user')
const Cart = require('./cart');
const Category = require ('./category');
const Product = require('./product');
const PurchaseHistory = require('./purchaseHistory');
const Review = require('./review');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */


Cart.belongsTo(User);
Cart.belongsTo(Product);

Review.belongsTo(User);
Review.belongsTo(Product);

PurchaseHistory.belongsTo(User);
PurchaseHistory.belongsTo(Product);

<<<<<<< HEAD
User.hasOne(Cart);
User.hasOne(PurchaseHistory);

=======
>>>>>>> master

module.exports = {
  User,
  Cart,
  Category,
  Product,
  PurchaseHistory,
  Review,
};

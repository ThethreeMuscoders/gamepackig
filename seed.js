const {
  User,
  Cart,
  Category,
  Product,
  PurchaseHistory,
  Review,
} = require('./server/db/models');
const db = require('./server/db');
const avatar = require('cartoon-avatar');
const chance = require('chance')(3);

const amountOfUsers = 100;
const sameBillingChance = 80;
let users = [
  {
    email: 'zeke@zeke.zeke',
    password: '123',
    isAdmin: true,
    shippingAddress: '123 Jump Street',
    billingAddress: '123 Jump Street',
  },
  {
    email: 'bond@bond.bond',
    password: 'bond',
    isAdmin: false,
    shippingAddress: '69 Bond Street',
    billingAddress: '69 Bond Street',
  },
];

const amountOfProducts = 200;
const maxPrice = 500;
const maxQuantityProducts = 50;
const minQuantityProducts = 0;
let products = [];

const amountOfCarts = 50;
const maxQuantityCarts = 10;
const minQuantityCarts = 1;
let carts = [];


const amountOfReviews = 200;
let reviews = [];

const amountOfHistories = 500;
const lateDayChance = 80;
const minLateDays = 1;
const maxLateDays = 10;
let purchaseHistories = [];

const statuses = [
  'CANCELLED',
  'COMPLETED',
  'CREATED',
  'PROCESSING',
];

const categories = [
  { category: 'Graphic Cards' },
  { category: 'Motherboards' },
  { category: 'Peripherals' },
  { category: 'Cables' },
  { category: 'Gaming System' },
  { category: 'Computer Case' },
  { category: 'Computer System' },
  { category: 'Laptop' },
];

const selectUser = () => {
  const selectUserId = Math.floor(Math.random() * users.length);
  return { user: users[selectUserId], userId: selectUserId + 1 };
};

const selectProduct = () => {
  const selectProductId = Math.floor(Math.random() * products.length);
  return { product: products[selectProductId], productId: selectProductId + 1 };
};

const createUsers = () => {
  for (let i = 0; i < amountOfUsers; i += 1) {
    const email = chance.email();
    const password = chance.string({ length: 5 });
    const isAdmin = chance.bool({ likelihood: 10 });
    const shippingAddress = chance.address();
    const billingAddress = chance.bool({ likelihood: sameBillingChance })
      ? shippingAddress
      : chance.address();

    users.push({
      email,
      password,
      isAdmin,
      shippingAddress,
      billingAddress,
    });
  }
};

const createProducts = () => {
  for (let i = 0; i < amountOfProducts; i += 1) {
    const name = chance.word();
    const image = avatar.generate_avatar();
    const description = chance.paragraph();
    const price = +(Math.random() * maxPrice).toString().slice(0, 5);
    const quantity = Math.floor(Math.random() * maxQuantityProducts) + minQuantityProducts;
    const categoryId = Math.floor(Math.random() * categories.length) + 1;

    products.push({
      name,
      image,
      description,
      price,
      quantity,
      categoryId,
    });
  }
};

const createCarts = () => {
  for (let i = 0; i < amountOfCarts; i += 1) {
    const { product, productId } = selectProduct();
    const { price } = product;
    const { userId } = selectUser();
    const quantity = Math.floor(Math.random() * maxQuantityCarts) + minQuantityCarts;

    carts.push({
      quantity,
      price,
      productId,
      userId,
    });
  }
};

const createReviews = () => {
  for (let i = 0; i < amountOfReviews; i += 1) {
    const description = chance.paragraph();
    const rating = Math.floor(Math.random() * 5) + 1;
    const { productId } = selectProduct();
    const { userId } = selectUser();

    reviews.push({
      description,
      rating,
      productId,
      userId,
    });
  }
};

const lateDateGenerator = (date) => {
  const randDays = Math.floor(Math.random() * maxLateDays) + minLateDays;
  const lateDate = date.split('/');
  lateDate[1] = +lateDate[1] - randDays;
  return lateDate.join('/');
};

const createPurchaseHistories = () => {
  for (let i = 0; i < amountOfHistories; i += 1) {
    const { product, productId } = selectProduct();
    const { price } = product;
    const { userId } = selectUser();
    const deliveryDate = chance.date({ string: true });
    const expectedDate = chance.bool({ likelihood: lateDayChance })
      ? deliveryDate
      : lateDateGenerator(deliveryDate);
    const randStatus = Math.floor(Math.random() * statuses.length);
    const status = statuses[randStatus];

    purchaseHistories.push({
      deliveryDate,
      expectedDate,
      status,
      price,
      productId,
      userId,
    });
  }
};

createUsers();
createProducts();
createReviews();
createPurchaseHistories();
createCarts();

const seed = () =>
  Promise.all(users.map(user =>
    User.create(user))
  )
    .then(() =>
      Promise.all(categories.map(category =>
        Category.create(category))
      )
    )
    .then(() =>
      Promise.all(products.map(product =>
        Product.create(product))
      )
    )
    .then(() =>
      Promise.all(reviews.map(review =>
        Review.create(review))
      )
    )
    .then(() =>
      Promise.all(carts.map(cart =>
        Cart.create(cart))
      )
    )
    .then(() =>
      Promise.all(purchaseHistories.map(history =>
        PurchaseHistory.create(history))
      )
    )


const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch((err) => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();

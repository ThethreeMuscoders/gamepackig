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
    name: 'Zeke',
    email: 'zeke@zeke.zeke',
    password: '123',
    isAdmin: true,
    shippingAddress: '123 Jump Street',
    billingAddress: '123 Jump Street',
  },
  {
    name: 'bond',
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

const adjectives = [
  'Decent',
  'Refurbished',
  'Meh',
  'Awesome',
  'Super Cool',
  'Trash',
  'Fantastic',
];

const pictures = {
  'Graphic Cards': [
    { src: '/assets/graphic-cards/graphics-card-black.png', name: 'Titan' },
    { src: '/assets/graphic-cards/graphics-card-blue.png', name: 'Ryzen' },
    { src: '/assets/graphic-cards/graphics-card-green.png', name: 'GeForce GTX 1080 Ti' },
    { src: '/assets/graphic-cards/graphics-card-purple.png', name: 'Ryzen Pro' },
    { src: '/assets/graphic-cards/graphics-card-red.png', name: 'Ryzen Threadripper' },
  ],
  Motherboards: [
    { src: '/assets/motherboards/motherboard-red.png', name: 'MSI' },
    { src: '/assets/motherboards/motherboard-blue.png', name: 'Asus' },
    { src: '/assets/motherboards/motherboard-green.png', name: 'ASRock' },
    { src: '/assets/motherboards/motherboard-colored.png', name: 'Gigabyte' },
    { src: '/assets/motherboards/motherboard-purple.png', name: 'Biostar' },
  ],
  Peripherals: [
    { src: '/assets/peripherals/gamepad-blue.png', name: 'Super Nintendo Controller' },
    { src: '/assets/peripherals/gamepad-black.png', name: 'Super Nintendo Controller' },
    { src: '/assets/peripherals/gamepad-red.png', name: 'Super Nintendo Controller' },
    { src: '/assets/peripherals/gamepad-green.png', name: 'Super Nintendo Controller' },
    { src: '/assets/peripherals/gamepad-yellow.png', name: 'Super Nintendo Controller' },
    { src: '/assets/peripherals/gamepad-purple.png', name: 'Super Nintendo Controller' },
    { src: '/assets/peripherals/controller-red.png', name: 'XBox Controller' },
    { src: '/assets/peripherals/controller-blue.png', name: 'XBox Controller' },
    { src: '/assets/peripherals/controller-green.png', name: 'XBox Controller' },
    { src: '/assets/peripherals/keyboard-red.png', name: 'Blackwidow' },
    { src: '/assets/peripherals/keyboard-purple.png', name: 'Blackwidow' },
    { src: '/assets/peripherals/keyboard-blue.png', name: 'Blackwidow' },
    { src: '/assets/peripherals/keyboard-yellow.png', name: 'Blackwidow' },
    { src: '/assets/peripherals/mouse-red.png', name: 'Logitech' },
    { src: '/assets/peripherals/mouse-green.png', name: 'Logitech' },
    { src: '/assets/peripherals/mouse-purple.png', name: 'Logitech' },
    { src: '/assets/peripherals/mouse-yellow.png', name: 'Logitech' },
  ],
  Cables: [
    { src: '/assets/cables/cable.png', name: 'USB-C Cable' },
    { src: '/assets/cables/charger.png', name: 'Lightning Cable' },
    { src: '/assets/cables/hdmi.png', name: 'HDMI Cable' },
    { src: '/assets/cables/sound-cable.png', name: 'Aux Cable' },
    { src: '/assets/cables/usb.png', name: 'USB2.0 Cable' },
  ],
  'Gaming System': [
    { src: '/assets/consoles/nintendo-64-console-blue.png', name: 'Nintendo 64' },
    { src: '/assets/consoles/nintendo-64-console-green.png', name: 'Nintendo 64' },
    { src: '/assets/consoles/nintendo-64-console-purple.png', name: 'Nintendo 64' },
    { src: '/assets/consoles/nintendo-64-console-red.png', name: 'Nintendo 64' },
    { src: '/assets/consoles/nintendo-64-console-yellow.png', name: 'Nintendo 64' },
    { src: '/assets/consoles/playstation-black.png', name: 'Playstation 4' },
    { src: '/assets/consoles/playstation-blue.png', name: 'Playstation 4' },
    { src: '/assets/consoles/playstation-green.png', name: 'Playstation 4' },
    { src: '/assets/consoles/playstation-red.png', name: 'Playstation 4' },
    { src: '/assets/consoles/xbox-blue.png', name: 'XBox One' },
    { src: '/assets/consoles/xbox-green.png', name: 'XBox One' },
    { src: '/assets/consoles/xbox-purple.png', name: 'XBox One' },
    { src: '/assets/consoles/xbox-red.png', name: 'XBox One' },
    { src: '/assets/consoles/xbox-yellow.png', name: 'XBox One' },
  ],
  'Computer Case': [
    { src: '/assets/case/case-black.png', name: 'Full-Size Case' },
    { src: '/assets/case/case-blue.png', name: 'Full-Size Case' },
    { src: '/assets/case/case-red.png', name: 'Full-Size Case' },
    { src: '/assets/case/case-purple.png', name: 'Full-Size Case' },
    { src: '/assets/case/case-green.png', name: 'Full-Size Case' },
  ],
  'Computer System': [
    { src: '/assets/computer-system/computer.png', name: 'Alienware' },
    { src: '/assets/computer-system/mac-blue.png', name: 'Mac Pro' },
    { src: '/assets/computer-system/mac-red.png', name: 'Mac' },
    { src: '/assets/computer-system/mac-green.png', name: 'Mac Pro' },
  ],
  Laptop: [
    { src: '/assets/laptops/laptop.png', name: 'Acer Laptop' },
    { src: '/assets/laptops/laptop-two.png', name: 'HP Laptop' },
    { src: '/assets/laptops/macbook-red.png', name: 'Macbook Air' },
    { src: '/assets/laptops/macbook-purple.png', name: 'Macbook' },
    { src: '/assets/laptops/macbook.png', name: 'Macbook Pro' },
  ],
};

const selectPicture = ({ category }) => {
  const cat = pictures[category];
  const randomIndex = Math.floor(Math.random() * cat.length);
  return cat[randomIndex];
};

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
    const name = chance.name();
    const email = chance.email();
    const password = chance.string({ length: 5 });
    const isAdmin = chance.bool({ likelihood: 10 });
    const shippingAddress = chance.address();
    const billingAddress = chance.bool({ likelihood: sameBillingChance })
      ? shippingAddress
      : chance.address();

    users.push({
      name,
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
    const description = chance.paragraph();
    const price = +(Math.random() * maxPrice).toString().slice(0, 5);
    const quantity = Math.floor(Math.random() * maxQuantityProducts) + minQuantityProducts;
    const categoryId = Math.floor(Math.random() * categories.length) + 1;
    const { src, name } = selectPicture(categories[categoryId - 1]);
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];

    products.push({
      name: `${randomAdjective} ${name}`,
      image: src,
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
    const quantity = Math.floor(Math.random() * 10) + 1;
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
      quantity,
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

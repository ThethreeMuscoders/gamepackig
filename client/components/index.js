/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Main } from './main';
export { default as HomePage} from './HomePage';
export { default as UserAccount } from './UserProfile/UserAccount';
export { default as UserSidebar} from './UserProfile/UserSidebar';
export { default as UserSettings} from './UserProfile/UserSettings';
export { default as UserOrders} from './UserProfile/UserOrders';
export { default as OrderedProduct} from './UserProfile/OrderedProduct';
export { default as NewReview} from './newReview';
export { Login } from './Login';
export { Signup } from './Signup';
export { default as Navbar } from './navbar';
export { default as ProductList } from './product-list';
export { default as ProductSinglePage } from './productSinglePage';
export { default as FilterSidebar } from './filterSidebar';
export { default as Cart } from './cart';
export { default as Checkout } from './checkout';

export { default as CheckoutSuccess } from './checkoutSuccess';
export { default as ErrorForm } from './error';

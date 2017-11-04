/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Main } from './main';
export { default as UserHome } from './user-home';
export { Login } from './Login';
export { Signup } from './Signup';
export { default as Navbar } from './navbar';
export { default as ProductList } from './product-list';
export { default as FilterSidebar } from './filterSidebar';
export { default as Cart } from './cart';

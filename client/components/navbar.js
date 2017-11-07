import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { logout, filterProductsInStore } from '../store';

import '../css/_navbar.scss';


export const Navbar = (props) => {
  const {
    products,
    isLoggedIn,
    isAdmin,
    handleClick,
    submitSearch,
    searchButton,
    filterProducts
  } = props;

  return (
    <div>
      <div className="nav">
        <div className="logo">
          <img src="assets/gamepad.svg" alt="game controller icon" />
          <h1>gamepackig</h1>
        </div>
        <nav>
          {
            isLoggedIn
              ? isAdmin
                ?
                <div>
                  {/* The navbar will show these links after you log in if you're an admin */}
                  <Link to="/home">Home</Link>
                  <Link to="/admin">Admin Dashboard</Link>
                  <a href="#" onClick={handleClick}>Logout</a>
                </div>
                :
                <div>
                  {/* The navbar will show these links after you log in if you're not an admin*/}
                  <Link to="/home">Home</Link>
                  <a href="#" onClick={handleClick}>Logout</a>
                </div>
              :
              <div>
                {/* The navbar will show these links before you log in */}
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
          }
          <div>
            <Link to="/cart"><i className="fa fa-shopping-cart" aria-hidden="true"></i>Cart
          </Link>
          </div>
        </nav>

      </div>
      <div className="sub-nav">
        <div className="nav-cat">
          <Link to="/products">All Products</Link>
        </div>
        <div className="nav-search">
          <input
            id="nav-search"
            type="text"
            placeholder="search"
            list="auto-fill-products"
            onKeyPress={e => submitSearch(e, products, filterProducts, searchButton)}
          />
          <datalist id="auto-fill-products">
            {
              products.map(product => (
                <option key={product.id} value={product.name}></option>
              ))
            }
          </datalist>
          <button onClick={e => searchButton(products, filterProducts)}>Search</button>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin,
    products: state.products,
    filteredProducts: state.filteredProducts,
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleClick() {
      dispatch(logout());
    },
    submitSearch(e, products, filterProducts, searchButton) {
      if (e.key === "Enter") {
        searchButton(products, filterProducts, e.target.value)
      }
    },
    searchButton(products, filterProducts, name) {
      if (!name) name = document.getElementById("nav-search").value;
      filterProducts(products, name);
      ownProps.history.push(`/products/?search=${name}`);
    },
    filterProducts(products, search) {
      const filtered = products.filter(product => (
        product.name.toUpperCase().match(search.toUpperCase())
      ));
      const action = filterProductsInStore(filtered);
      dispatch(action);
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Navbar));

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

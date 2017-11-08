import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import Product from './product';
import '../css/_userHome.scss';

/**
 * COMPONENT
 */



export const HomePage = (props) => {
  const { email, products} = props
  const featuredProducts = Array(6).fill(1).map(x =>  Math.floor(200 * Math.random()))

  return (
    <div className="homePage-wrapper">

      <div className="homePage-carousel-wrapper">
        <h2>Welcome to gamepackig!</h2>
        <h3>The go to place for all your gaming needs</h3>

      </div>
      <h4>Featured Products</h4>
      <div className="product-list-wrapper">
      
        <div className="product-list">
        <div className="wrap">
          {
            
            products.filter(product => featuredProducts.indexOf(product.id) !== -1)
            .map(product => (<div className="featuredProduct">
              <NavLink to={`/products/${product.id}`}><img src={product.image} /></NavLink>
              <NavLink to={`/products/${product.id}`}><h4>{product.name}</h4> </NavLink>
              </div>))
           
          }
          </div>
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
    products: state.filteredProducts,
  };
};

// const mapDispatch = (dispatch) => {
//   return {
//     fetchAllProducts: function () {

//     },
//   }
// }

export default connect(mapState)(HomePage);

/**
 * PROP TYPES
 */
HomePage.propTypes = {

};

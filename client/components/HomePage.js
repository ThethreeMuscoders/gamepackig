import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Product from './product';

/**
 * COMPONENT
 */
export const HomePage = (props) => {
  const { email, products} = props
  // products on state get length, pick random number between it, use it
  return (
    <div className="homePage-wrapper">

      <div className="homePage-carousel-wrapper">
        <h3>Products</h3>

      </div>
      <div className="homepage-product-wrapper">
        <div className="product-list">
          {
            products.map(product =>
              <Product key={product.id} product={product} />)
          }
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

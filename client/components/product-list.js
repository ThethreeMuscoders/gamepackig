import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Product from './product';

/**
 * COMPONENT
 */
export const ProductList = (props) => {
  const { products } = props;

  return (
    <div className="product-list-wrapper">
      <div className="product-list">
        {
          products.map(product =>
            <Product key={product.id} product={product} />)
        }

      </div>
    </div>
  );
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    products: state.products,
  };
};

// const mapDispatch = (dispatch) => {
//   return {
//     fetchAllProducts: function () {

//     },
//   }
// }

export default connect(mapState)(ProductList);

/**
 * PROP TYPES
 */
ProductList.propTypes = {

};

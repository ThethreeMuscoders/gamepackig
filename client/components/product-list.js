import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/**
 * COMPONENT
 */
export const ProductList = (props) => {
  const { products } = props;
  console.log(products);
  return (
    <div>

    </div>
  )
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

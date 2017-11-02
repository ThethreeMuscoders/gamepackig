import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/**
 * COMPONENT
 */
export const ProductList = (props) => {
  const { products } = props;
  const dir = 'grid';
  return (
    <div className="product-list-wrapper">
      <div className="product-list">
        {
          dir === 'no'
            ? <div>
              <div className="product-item-grid">

              </div>
              <div className="product-item-grid">

              </div>
              <div className="product-item-grid">

              </div>
              <div className="product-item-grid">

              </div>
              <div className="product-item-grid">

              </div>
              <div className="product-item-grid">

              </div>
            </div>

            : <div>
              <div className="product-item">

              </div>
              <div className="product-item">

              </div>
              <div className="product-item">

              </div>
              <div className="product-item">

                            </div>
            </div>
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

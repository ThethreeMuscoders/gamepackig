import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../css/_adminDashboard.scss';

/**
 * COMPONENT
 */
export const AdminProducts = (props) => {
  const { products } = props;

  return (
    <div className="admin-main">
      <table>
        <thead>
          <tr>
            <th>{/*edit & delete button column*/}</th>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Reviews</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map(({
                id,
              name,
              description,
              image,
              price,
              quantity,
              reviews,
              category
              }) => (
                <tr key={id}>

                  <td>
                    <button className="delete-btn">
                      <i className="fa fa-times" />
                    </button>
                    <Link to={`/admin/products/${id}`}>
                      <button className="edit-btn">
                        <i className="fa fa-pencil" />
                      </button>
                    </Link>
                  </td>

                  <th>
                    {id}
                  </th>

                  <td>
                    <Link to={`/admin/products/${id}`} >
                      {name}
                    </Link>
                  </td>

                  <td>
                    {description.slice(0, 7) + '...'}
                  </td>

                  <th>
                    {image.split('/')[3].slice(0, -4)}
                  </th>

                  <th>
                    {price}
                  </th>

                  <th>
                    {quantity}
                  </th>

                  <th>
                    <Link to={`/admin/products/${id}/reviews`}>{reviews.length}</Link>
                  </th>

                  <th>
                    {category.category}
                  </th>

                </tr>
              ))
          }
        </tbody>
      </table>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapState = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatch = (dispatch) => {
  return {

  };
};

export default connect(mapState, mapDispatch)(AdminProducts);

/**
 * PROP TYPES
 */
AdminProducts.propTypes = {

};

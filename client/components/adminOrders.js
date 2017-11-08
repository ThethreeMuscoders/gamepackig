import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../css/_adminDashboard.scss';

/**
 * COMPONENT
 */
export const AdminOrders = (props) => {
  const { orders } = props;

  return (
    <div className="admin-main">
      <table>
        <thead>
          <tr>
            <th>{/*edit & delete button column*/}</th>
            <th>#</th>
            <th>UserID</th>
            <th>ProductID</th>
            <th>Status</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Order Date</th>
            <th>Expected Date</th>
            <th>Delivery Date</th>
          </tr>
        </thead>
        <tbody>
          {
            orders.map(({
                id,
              userId,
              productId,
              status,
              price,
              quantity,
              createdAt,
              expectedDate,
              deliveryDate
              }) => (
                <tr key={id}>

                  <td>
                    <button className="delete-btn">
                      <i className="fa fa-times" />
                    </button>
                    <Link to={`/admin/users/${id}`}>
                      <button className="edit-btn">
                        <i className="fa fa-pencil" />
                      </button>
                    </Link>
                  </td>

                  <th>
                    {id}
                  </th>

                  <td>
                    <Link to={`/admin/users/${userId}`} >
                      {userId}
                    </Link>
                  </td>

                  <td>
                    <Link to={`/admin/products/${productId}`} >
                      {productId}
                    </Link>
                  </td>

                  <th>
                    {status}
                  </th>

                  <th>
                    {price}
                  </th>

                  <th>
                    {quantity}
                  </th>

                  <th>
                    {createdAt.slice(0, 10)}
                  </th>

                  <th>
                    {expectedDate.slice(0, 10)}
                  </th>

                  <th>
                    {deliveryDate && deliveryDate.slice(0, 10)}
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
    orders: state.purchaseHistory,
  };
};

const mapDispatch = (dispatch) => {
  return {

  };
};

export default connect(mapState, mapDispatch)(AdminOrders);

/**
 * PROP TYPES
 */
AdminOrders.propTypes = {

};

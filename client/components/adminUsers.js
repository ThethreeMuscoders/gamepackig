import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { deleteUser } from '../store';

import '../css/_adminDashboard.scss';

/**
 * COMPONENT
 */
export const AdminUsers = (props) => {
  const { user, adminUsers, submitDeleteUser } = props;

  return (
    <div className="admin-main">
      <table>
        <thead>
          <tr>
            <th>{/*edit & delete button column*/}</th>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Billing Address</th>
            <th>Shipping Address</th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody>
          {
            adminUsers.map(({
                id,
              name,
              email,
              billingAddress,
              shippingAddress,
              isAdmin
              }) => (
                <tr key={id}>

                  <td>
                    <button className="delete-btn" onClick={() => submitDeleteUser(id)}>
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
                    <Link to={`/admin/users/${id}`} >
                      {name}
                    </Link>
                  </td>

                  <td>
                    <a href={`mailto:${email}`}>{email}</a>
                  </td>

                  <th>
                    {billingAddress}
                  </th>

                  <th>
                    {shippingAddress}
                  </th>

                  <th>
                    {isAdmin.toString()}
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
    user: state.user,
    adminUsers: state.adminUsers,
  };
};

const mapDispatch = (dispatch) => {
  return {
    submitDeleteUser(id) {
      const confirmation = confirm(`Are you sure you want to delete user id #${id}`);
      confirmation && dispatch(deleteUser(id))
        .then(() => {
          alert(`Deleted user id: ${id}`);
          ownProps.history.push('/admin/users/')
        })
    },
  };
};

export default connect(mapState, mapDispatch)(AdminUsers);

/**
 * PROP TYPES
 */
AdminUsers.propTypes = {

};

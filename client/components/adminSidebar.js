import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../css/_adminDashboard.scss';

/**
 * COMPONENT
 */
export const AdminSidebar = (props) => {
  return (
    <div className="admin-sidebar">
      <h3>Admin Dashboard</h3>
      <Link to="/admin/users">Users</Link>
      <Link to="/admin/products">Products</Link>
      <Link to="/admin/orders">Orders</Link>
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
const mapState = null;

const mapDispatch = null;

export default connect(mapState, mapDispatch)(AdminSidebar);

/**
 * PROP TYPES
 */
AdminSidebar.propTypes = {

};

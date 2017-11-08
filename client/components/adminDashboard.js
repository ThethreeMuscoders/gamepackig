import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchAllUsers, fetchAllHistories } from '../store';
import {
  AdminSidebar,
  AdminUsers,
  AdminEditUser,
  AdminProducts,
  AdminEditProduct,
  AdminOrders,
} from './';

import '../css/_adminDashboard.scss';

/**
 * COMPONENT
 */
export class AdminDashboard extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    return (
      <div className="admin-dash-wrapper">

        <Switch>
          <Route path="/admin/products/:productId" component={AdminEditProduct} />
          <Route path="/admin/users/:userId" component={AdminEditUser} />
          <Route path="/admin/" component={AdminSidebar} />
        </Switch>

        <Switch>
          <Route path="/admin/users" component={AdminUsers} />
          <Route path="/admin/products" component={AdminProducts} />
          <Route path="/admin/orders" component={AdminOrders} />
        </Switch>

      </div>
    );
  }
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapState = null;

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(fetchAllUsers());
      dispatch(fetchAllHistories());
    },
  };
};

export default connect(mapState, mapDispatch)(AdminDashboard);

/**
 * PROP TYPES
 */
AdminDashboard.propTypes = {

};

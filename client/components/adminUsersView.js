import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

const adminUsersView = props => (
  <div className='product-single-page-wrapper'>
    <h1>AdminUsersViews</h1>
  </div>
);

const mapState = ({ user, products, orders }) => ({
  user,
  products,
  orders,
});

const mapDispatch = dispatch => ({ // I think the individual tabs should be in charge of fetching data.


});

export default connect(mapState, mapDispatch)(adminUsersView);

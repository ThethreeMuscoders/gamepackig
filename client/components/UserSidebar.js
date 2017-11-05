import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { filterProductsInStore } from '../store';
import { urlToProperty } from "query-string-params";

/**
 * COMPONENT
 */
export class UserSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 1000,
      sort: 'ASC-Price',
      search: '',
    };
  }

  render() {
    const { products, filterProducts, location, submitSearch } = this.props;
    const { price } = this.state;
    const defaultSearchVal = location.search ? urlToProperty(location.search).search[0] : '';

    return (
      <div className="filter-sidebar-wrapper">
        <h3>Account</h3>

        <button>Change Info</button>
        <button>Orders</button>
        <button>Purchase History</button>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    filterProducts(products, { price, sort, search }) {
      const filtered = products.filter(product => (
        product.price < price
        && product.name.toUpperCase().match(search.toUpperCase())
      ))
        .sort((a, b) => sort === 'ASC-Price' ? a.price - b.price : b.price - a.price);
      const action = filterProductsInStore(filtered);
      dispatch(action);
    },
    submitSearch(e) {
      if (e.key === "Enter") {
        document.getElementById("filter-submit-btn").click();
      }
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(UserSidebar));

/**
 * PROP TYPES
 */
UserSidebar.propTypes = {

};

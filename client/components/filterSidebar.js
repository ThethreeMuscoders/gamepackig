import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { filterProductsInStore } from '../store';
import { urlToProperty } from "query-string-params";

import '../css/_filterSidebar.scss';

/**
 * COMPONENT
 */
export class FilterSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 1000,
      sort: 'ASC-Price',
      search: '',
      category: 'All Categories',
    };
  }

  render() {
    const { products, filterProducts, location, submitSearch, categories } = this.props;
    const { price } = this.state;
    const defaultSearchVal = location.search ? urlToProperty(location.search).search[0] : '';

    return (
      <div className="filter-sidebar-wrapper">
        <h3>Filter</h3>

        <input
          className="search"
          type="text"
          placeholder="search"
          defaultValue={defaultSearchVal}
          onChange={e => this.setState({ search: e.target.value })}
          onKeyPress={submitSearch}
        />

        <div className="sort-by">
          <label htmlFor="sort-by">Sort By</label>
          <select name="sort-by" onChange={e => this.setState({ sort: e.target.value })}>
            <option value="ASC-Price" selected>Lowest Price</option>
            <option value="DESC-Price">Highest Price</option>
          </select>
        </div>

        <div className="category-filter">
          <label htmlFor="cat-filter">By Category</label>
          <select name="cat-filter" onChange={e => this.setState({ category: e.target.value })}>
            <option value="All Categories" selected>All Categories</option>
            {
              categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.category}</option>
              ))
            }
          </select>
        </div>

        <div className="max-price">
          <label htmlFor="max-price">Maximum Price - ${this.state.price}</label>
          <input
            name="max-price"
            type="range"
            min="0"
            max="1000"
            step="10"
            value={price}
            onChange={e => this.setState({ price: e.target.value })}
          />
        </div>

        <button id="filter-submit-btn" onClick={() => filterProducts(products, this.state)}>Set Filter</button>
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
    categories: state.categories,
  };
};

const mapDispatch = (dispatch) => {
  return {
    filterProducts(products, { price, sort, search, category }) {
      let filtered;

      if (category === 'All Categories') {
        filtered = products.filter(product => (
          product.price < price
          && product.name.toUpperCase().match(search.toUpperCase())
        ))
          .sort((a, b) => sort === 'ASC-Price' ? a.price - b.price : b.price - a.price);
      } else {
        filtered = products.filter(product => (
          product.price < price
          && product.categoryId === +category
          && product.name.toUpperCase().match(search.toUpperCase())
        ))
          .sort((a, b) => sort === 'ASC-Price' ? a.price - b.price : b.price - a.price);
      }

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

export default withRouter(connect(mapState, mapDispatch)(FilterSidebar));

/**
 * PROP TYPES
 */
FilterSidebar.propTypes = {

};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterProductsInStore } from '../store';

/**
 * COMPONENT
 */
export class FilterSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 1000,
      sort: 'ASC-Price',
    };
  }

  componentDidMount() {

  }

  render() {
    const { products, filterProducts } = this.props;
    const { price, sort } = this.state;

    return (
      <div className="filter-sidebar-wrapper">
        <label htmlFor="sort-by">Sort By</label>
        <select className="sort-by" name="sort-by" onChange={e => this.setState({ sort: e.target.value })}>
          <option value="ASC-Price" selected>Lowest Price</option>
          <option value="DESC-Price">Highest Price</option>
        </select>
        <label htmlFor="max-price">Maximum Price - ${this.state.price}</label>
        <input
          className="max-price"
          name="max-price"
          type="range"
          min="0"
          max="1000"
          step="10"
          value={price}
          onChange={e => this.setState({ price: e.target.value })}
        />
        <button onClick={() => filterProducts(products, { price, sort })}>Set Filter</button>
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
    filterProducts: function (products, { price, sort }) {
      const filtered = products.filter(product => product.price < price)
        .sort((a, b) => sort === 'ASC-Price' ? a.price - b.price : b.price - a.price);
      const action = filterProductsInStore(filtered);
      dispatch(action);
    },
  };
};

export default connect(mapState, mapDispatch)(FilterSidebar);

/**
 * PROP TYPES
 */
FilterSidebar.propTypes = {

};

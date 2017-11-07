import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { fetchOneProduct } from '../store';

import '../css/_adminDashboard.scss';

/**
 * COMPONENT
 */
export class AdminEditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      image: '',
      price: 0.00,
      quantity: 0,
      category: '',
    };
    this.changeField = this.changeField.bind(this);
  }

  componentDidMount() {
    this.props.loadUser(this.props.match.params.productId, this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.match.params.productId !== this.props.match.params.productId) {
      this.props.loadUser(newProps.match.params.productId, this);
    }
  }

  changeField(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { name, description, image, price, quantity, category } = this.state;

    return (
      <div className="admin-sidebar">
        <div className="sidebar-back-btn">
          <Link to="/admin/products"><i className="fa fa-arrow-left" aria-hidden="true"></i>
          </Link>
        </div>
        <h3>Edit Product</h3>

        <div className="input-row">
          <label>Name</label>
          <input name="name" type="text" value={name} onChange={this.changeField} />
        </div>

        <div className="input-row description-row">
          <label>Description</label>
          <textarea name="description" type="text" value={description} rows="15" onChange={this.changeField}></textarea>
        </div>

        <div className="input-row">
          <label>Image</label>
          <input name="image" type="text" value={image} onChange={this.changeField} />
        </div>

        <div className="input-row">
          <label>Price</label>
          <input name="price" type="text" value={price} onChange={this.changeField} />
        </div>

        <div className="input-row">
          <label>Quantity</label>
          <input name="quantity" type="text" value={quantity} onChange={this.changeField} />
        </div>

        <div className="input-row">
          <label>Category</label>
          <input name="category" type="text" value={category} onChange={this.changeField} />
        </div>

        <button>Submit Changes</button>

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
const mapState = (state) => {
  return {
    adminSelectedProduct: state.adminSelectedProduct,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadUser(id, mySelf) {
      dispatch(fetchOneProduct(id))
        .then(product => {
          product.category = product.category.category;
          mySelf.setState(product)
        })
        .catch(console.error);
    },
  };
};


export default withRouter(connect(mapState, mapDispatch)(AdminEditProduct));

/**
 * PROP TYPES
 */
AdminEditProduct.propTypes = {

};

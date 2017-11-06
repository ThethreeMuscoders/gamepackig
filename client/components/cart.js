import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCart, updateCart, } from '../store';

import '../css/_cart.scss';

/**
 * COMPONENT
 */
export const Cart = (props) => {
  const { cart, deleteItem, updateItem } = props;
  let subtotal = 0.00;
  let items = 0;
  if (cart.length) {
    cart.forEach((a) => {
      subtotal += a.price * a.quantity;
      items += a.quantity;
    });
  }
  const tax = subtotal * 0.1025;
  const shipping = subtotal > 0 ? 8.95 * items : 0.00;
  const total = subtotal + tax + shipping;

  return (
    <div className="cart-wrapper">
      <div className="cart-list">
        {
          cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.product.image} />
              <p>{item.product.name}</p>
              <p>${item.price}</p>
              <p>Quantity:
              <input
                  name="quantity"
                  type="number"
                  defaultValue={item.quantity}
                  onChange={e => updateItem(e, item.id, item)}
                />
              </p>
              <button onClick={e => deleteItem(item.id)}>Remove Item</button>
            </div>
          ))
        }
      </div>
      <div className="cart-sidebar">
        <h3>Cart Summary</h3>
        <p>Sub-Total: ${subtotal.toFixed(2)}</p>
        <p>Tax: ${tax.toFixed(2)}</p>
        <p>Shipping & Handling: ${shipping.toFixed(2)}</p>
        <p><b>Total: ${total.toFixed(2)}</b></p>
        <Link to="/checkout">Checkout</Link>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    deleteItem(id) {
      const action = deleteCart(id);
      dispatch(action);
    },
    updateItem(e, id, body) {
      const newBody = Object.assign({}, body);
      newBody.quantity = e.target.value;
      const action = updateCart(id, newBody);
      dispatch(action);
    },
  };
};

export default connect(mapState, mapDispatch)(Cart);

/**
 * PROP TYPES
 */
Cart.propTypes = {
  fetchGuestCart: PropTypes.func,
};

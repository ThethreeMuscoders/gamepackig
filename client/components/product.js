import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addCartItemToDatabase, addCartItemToGuestSession } from '../store';

function Product(props) {
  const { user, cart, product, addItem } = props;
  const { id, name, image, description, price } = product;

  return (
    <div className='product-item'>

      <div className="img-wrapper">
        <div>
          <NavLink to={`/products/${id}`}>
            <img alt={`${name} product`} src={image} />
          </NavLink>
        </div>
      </div>

      <div className="description-wrapper">
        <span>{name}</span>
        <p>{description}</p>
      </div>

      <div className="info-wrapper">
        <div>
          <p>{`$${price}`}</p>
        </div>
        <div className="btns">
          <NavLink to={`/products/${id}`}>View Item</NavLink>
          <button onClick={() => addItem(user, product)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

const mapState = (state) => {
  return {
    cart: state.cart,
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addItem(user, { price, id }) {
      let item = {
        price,
        quantity: 1,
        productId: id,
        userId: user.id || null,
      };
      const action = user.isGuest
        ? addCartItemToGuestSession(item, user)
        : addCartItemToDatabase(item);
      dispatch(action);
    },
  };
};

export default connect(mapState, mapDispatch)(Product);

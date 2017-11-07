import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addCartItemToDatabase, fetchSingleHistory, } from '../../store';
import '../../css/_orderedProduct.scss';

function OrderedProduct(props) {
  const { user, cart, product, addItem, fetchHistory } = props;
  const { id, name, image, description, price } = product;


  return (
    <div className='product-item'>
    <div className='TopSection'>
    <h1>Ordered</h1>
    <h2>11/29</h2>
    </div>

      <div className="img-wrapper">
          <div>
          <NavLink to={`/products/${id}`}>
            <img alt={`${name} product`} src={image} />
          </NavLink>
        </div>
      </div>

      <div className="description-wrapper">
        <span>{name}</span>
        <h4>${price}</h4>
      </div>

      <div className="info-wrapper">
        <div className="btns">
          <button onClick={() => addItem(user, product)}>Write Review</button>
        </div>
      </div>
    </div>
  );
}

const mapState = (state) => {
  return {
    cart: state.cart,
    user: state.user,
    history: state.history,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addItem(user, { price, id }) {
      let item = {
        price,
        quantity: 1,
        productId: id,
        userId: user.id,
      };
      const action = addCartItemToDatabase(item);
      dispatch(action);
    },
  };
};

export default connect(mapState, mapDispatch)(OrderedProduct);

import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { addCartItemToDatabase, fetchSingleHistory, fetchProduct } from '../../store';
import '../../css/_orderedProduct.scss';

class OrderedProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product
    }
  }

  componentDidMount() {
    this.props.getProduct(1);
  }
  render() {
    const { user, cart, product, addItem, getProduct } = this.props;
    // const { id, name, image, description, price } = product;
    // console.log(product.productId, 'props');
    console.log(this.state, 'the state');
    return (
      <div className='product-item'>
        <div className='TopSection'>
          <h1>Ordered</h1>
          <h2>11/29</h2>
        </div>

        <div className="img-wrapper">
          <div>
            <NavLink to={`/products/${1}`}>
              <img alt={`${'1'} product`} src={'1'} />
            </NavLink>
          </div>
        </div>

        <div className="description-wrapper">
          <span>{'1'}</span>
          <h4>${'1'}</h4>
        </div>

        <div className="info-wrapper">
          <div className="btns">
            <button><Link to={`/newReview/${1}`}>Write Review</Link></button>
            <Link to="/account/orders">Orders</Link>
          </div>
        </div>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    cart: state.cart,
    user: state.user,
    history: state.history,
    product: state.product
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProduct(id) {
      const action = fetchProduct(id);
      dispatch(action);
    },
  };
};

export default connect(mapState, mapDispatch)(OrderedProduct);

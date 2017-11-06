import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchProduct, addCartItemToDatabase, deleteReview } from '../store';
import ReviewItem from './reviewItem';

import '../css/_productSinglePage.scss';

export class ProductSinglePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      reviews: []
    };
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleRemoveReview = this.handleRemoveReview.bind(this);
  }

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct() {
    const { productId } = this.props.match.params;
    this.props.fetchProduct(productId).then(({ product }) => {
      const { reviews } = product;
      this.setState({
        reviews,
      });
    })
  }

  handleQuantityChange(e) {
    this.setState({ quantity: e.target.value });
  }

  handleRemoveReview(reviewId) {
    this.props.removeReview(reviewId).then(() => {
      this.fetchProduct();
    })
  }

  render() {
    const { product, user, addItem } = this.props;
    const { reviews } = this.state;
    const { isAdmin } = user;
    return (
      <div className='product-single-page-wrapper'>
        <h1>This is the Product Single Page for {product.name} </h1>
        <hr />
        <div className='product-description-container'>
          <div id='product-form'>
            <img src={product.image} alt={` image of ${product.name}`} />
            <h3>Price: {`$${product.price}`} </h3>
            <form onSubmit={e => addItem(user, product, e)}>
              <input type='number' name='quantity' min='1' max='10' value={this.state.quantity} onChange={this.handleQuantityChange}/>
              <button type='submit'> <i className='fa fa-cart-plus'/> Add to cart </button>
            </form>
          </div>
          <div id='productDescription'>
            <h3>Description</h3>
            <hr/>
            <p>{product.description}</p>
          </div>
        <div className='review-container'>
          <h3>Reviews</h3>
          <hr/>
            <ul className='reviewListContainer'>
              {
                reviews && reviews.map((review) => {
                  return (
                    <div key={review.id}>
                      <ReviewItem review={review} isAdmin={isAdmin} removeReview={this.handleRemoveReview}/>
                    </div>
                  );
                })
              }
            </ul>
        </div>
        </div>
        <hr />
      </div>
    )
  }
};

const mapState = ({ selectedProduct, user }) => {
  return {
    product: selectedProduct,
    user,
  }
};
const mapDispatch = (dispatch, ownProps) => {
  return {

    fetchProduct(productId) {
      return dispatch(fetchProduct(productId));
    },

    addItem(user, {price, id}, e) {
      e.preventDefault();
      const quantity = Number(e.target.quantity.value);
      const item = {
        price,
        quantity,
        productId: id,
        userId: user.id,
      };
      //NOTE this should have an option for guests
      const action = addCartItemToDatabase(item);
      dispatch(action);
      ownProps.history.push("/cart/");
    },

    removeReview(reviewId) {
      const action = deleteReview(reviewId);
      return dispatch(action);
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(ProductSinglePage));

ProductSinglePage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  selectedProduct: PropTypes.object,
  fetchProduct: PropTypes.func,
  removeReview: PropTypes.func,
}

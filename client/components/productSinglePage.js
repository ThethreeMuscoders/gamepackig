import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchProduct, addCartItemToDatabase } from '../store';
import '../_productSinglePage.scss';
import ReviewItem from './reviewItem';


export class ProductSinglePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  componentDidMount() {
    const { productId } = this.props.match.params;
    this.props.fetchProduct(productId);
  }

  handleQuantityChange(e) {
    this.setState({ quantity: e.target.value });
  }

  render() {
    const { product, user, addItem } = this.props;
    let reviews = product.reviews;
    return (
      <div className='product-single-page-wrapper'>
        <h1>This is the Product Single Page for {product.name} </h1>
        <hr />
        <div className='product-description-container'>
          <div id='product-form'>
            <img src={product.image} alt={` image of ${product.name}`} />
            <h3>Price: {`$${product.price}`} </h3>
            <form onSubmit={(e) => addItem(user, product, e)}>
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
                      <ReviewItem review={review}/>
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
      dispatch(fetchProduct(productId));
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
      const action = addCartItemToDatabase(item);
      dispatch(action);
      ownProps.history.push("/cart/");
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
} 
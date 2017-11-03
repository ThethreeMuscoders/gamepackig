import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchProduct } from '../store';
import '../_productSinglePage.scss';
import ReviewItem from './reviewItem';


export class ProductSinglePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { productId } = this.props.match.params;
    this.props.fetchProduct(productId);
  }

  render() {
    const product = this.props.selectedProduct;
    let reviews = product.reviews;
    return (
      <div className='product-single-page-wrapper'>
        <h1>This is the Product Single Page for {product.name} </h1>
        <hr />
        <div className='product-description-container'>
          <div>
            <img src={product.image} alt={` image of ${product.name}`} />
            <form>
              <input type='number' name='quantity' min='1' max='10' />
              <button type='submit'> Add to cart </button>
            </form>
          </div>
          <div>
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
        </div>
        <hr />
        <div>
          <h3>Reviews</h3>
            <ul>
              {
                reviews && reviews.map((review) => {
                  return (
                    <div>
                      <ReviewItem />
                    </div>
                  );
                }) 
              }
            </ul> 
        </div>
      </div>
    )
  }
};

const mapState = ({ selectedProduct }) => {
  return {
    selectedProduct,
  }
};
const mapDispatch = (dispatch) => {
  return {
    fetchProduct(productId) {
      dispatch(fetchProduct(productId));
    },
  }
};

export default withRouter(connect(mapState, mapDispatch)(ProductSinglePage));

ProductSinglePage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  selectedProduct: PropTypes.object,
  fetchProduct: PropTypes.func,
} 
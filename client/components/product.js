import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

function Product(props) {
  const { id, name, image, description, price } = props.product;

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
          <button>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = null;

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Product);

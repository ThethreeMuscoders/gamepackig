import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import '../css/_checkoutSuccess.scss';

function CheckoutSuccess(props) {

  return (
    <div className="checkout-success-wrapper">
    <div className="checkout-success">
    <Link to="/"><i class="fa fa-times" aria-hidden="true"></i></Link>
        <div>
          <h2>Order Received!</h2>
        </div>
      </div>
    </div>
  );
}

const mapState = null;

const mapDispatch = null;

export default connect(mapState, mapDispatch)(CheckoutSuccess);

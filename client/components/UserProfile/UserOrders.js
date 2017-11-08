import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OrderedProduct from './OrderedProduct';
import { addCartItemToDatabase, fetchSingleHistory, } from '../../store';

import '../../css/_userOrders.scss';


/**
 * COMPONENT
 */
class UserOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.user.id,
      purchaseHistory: this.props.purchaseHistory,
    }
  }

  render() {
    const { products, fetchHistory, user, purchaseHistory } = this.props;

    const histories = user.purchaseHistories || [];
    return (
      <div className="product-list-wrapper">
        <div className="product-list">
          {
            histories.map(history => {
              return <OrderedProduct key={history.id} product={history} productId={history.id} deliveryDate={history.deliveryDate} price={history.price} />
            })
            // products.map(product =>
            //   <OrderedProduct key={product.id} product={product} />)
          }

        </div>
      </div>
    );
  };
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user,
    products: state.filteredProducts,
    cart: state.cart,
    purchaseHistory: state.purchaseHistory,
  };
};

// const mapDispatch = (dispatch) => {
//   return {
//     fetchAllProducts: function () {

//     },
//   }
// }
const mapDispatch = (dispatch) => {
  return {
    fetchHistory(id) {
      const action = fetchSingleHistory(id);
      dispatch(action)
    },
  };
};

export default connect(mapState, mapDispatch)(UserOrders);

/**
 * PROP TYPES
 */
UserOrders.propTypes = {

};



// import React from 'react'
// import {connect} from 'react-redux'
// import PropTypes from 'prop-types'
// import {auth} from '../store'

/**
 * COMPONENT
 */
// const AuthForm = (props) => {
//   const {name, displayName, handleSubmit, error} = props

//   return (
//     <div>
//       <form onSubmit={handleSubmit} name={name}>
//         <div>
//           <label htmlFor="email"><small>Email</small></label>
//           <input name="email" type="text" />
//         </div>
//         <div>
//           <label htmlFor="password"><small>Password</small></label>
//           <input name="password" type="password" />
//         </div>
//         <div>
//           <button type="submit">{displayName}</button>
//         </div>
//         {error && error.response && <div> {error.response.data} </div>}
//       </form>
//       <a href="/auth/google">{displayName} with Google</a>
//     </div>
//   )
// }

// const mapLogin = (state) => {
//   return {
//     name: 'login',
//     displayName: 'Login',
//     error: state.user.error
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
//     handleSubmit (evt) {
//       evt.preventDefault()
//       const formName = evt.target.name
//       const email = evt.target.email.value
//       const password = evt.target.password.value
//       dispatch(auth(email, password, formName))
//     }
//   }
// }


// export const Login = connect(mapLogin, mapDispatch)(AuthForm)

// AuthForm.propTypes = {
//   name: PropTypes.string.isRequired,
//   displayName: PropTypes.string.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
//   error: PropTypes.object
// }

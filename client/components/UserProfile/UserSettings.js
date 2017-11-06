import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Product from '.././product';

import '../../css/_userSettings.scss';


/**
 * COMPONENT
 */
export const UserSettings = (props) => {
  const { products, user } = props;
  console.log(user, 'user');
  return (
    <div className="user-settings-wrapper">
      <div className="settings-list">
      <form className="form-horizontalTest">
      <fieldset>
        <legend>Update Account</legend>
      
        <div className="form-input">
          <div className="input-area">
            <h4 className="testClass">Name</h4>
            <input
              className=""
              type="text"
              value={user.name}
            />
          </div>
        </div>

        <div className="form-input">
        <div className="input-area">
          <h4 className="testClass">Email</h4>
          <input
            className=""
            type="text"
          />
        </div>
      </div>
      <div className="form-input">
      <div className="input-area">
        <h4 className="testClass">Shipping Address</h4>
        <input
          className=""
          type="text"
        />
      </div>
    </div>
        
    <div className="form-input">
    <div className="input-area">
      <h4 className="testClass">Billing Address</h4>
      <input
        className=""
        type="text"
      />
    </div>
  </div>

        <div className="">
          <div className="">
            <button
              type="submit"
              className=""
              >
              Update Account
        </button>
          </div>
        </div>
      </fieldset>
    </form>

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
  };
};

// const mapDispatch = (dispatch) => {
//   return {
//     fetchAllProducts: function () {

//     },
//   }
// }

export default connect(mapState)(UserSettings);

/**
 * PROP TYPES
 */
UserSettings.propTypes = {

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

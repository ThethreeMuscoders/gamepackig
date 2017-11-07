import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Product from '.././product';

import '../../css/_userSettings.scss';
import { updateUserInDatabase } from '../../store'


/**
 * COMPONENT
 */
class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      email: this.props.user.email,
      shippingAddress: this.props.user.shippingAddress,
      billingAddress: this.props.user.billingAddress,

    }

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  // componentWillMount() {
  //   this.setState ({
      
  //   });
  // }

  componentWillReceieveProps() {
    this.render();
  }
  handleNameChange (e) {
    this.setState({
      name: e.target.value
    })
  }
  handleNameChange(e) {
    this.setState({
      name: e.target.value
    })
  }
  render() {
    const { products, user, updatingUser } = this.props;
    console.log(user, 'user');
    return (
      <div className="user-settings-wrapper">
        <div className="settings-list">
          <form className="form-horizontalTest" onSubmit={(e) => updatingUser(user.id, e)}>
            <fieldset>
              <legend>Update Account</legend>

              <div className="form-input">
                <div className="input-area">
                  <h4 className="testClass">Name</h4>
                  <input
                    className=""
                    name="name"
                    type="text"
                    defaultValue={user.name}
                    placeholder={
                      "What's your name?"
                    }
                  />
                </div>
              </div>

              <div className="form-input">
                <div className="input-area">
                  <h4 className="testClass">Email</h4>
                  <input
                    className=""
                    type="text"
                    name="email"
                    defaultValue={user.email}
                    placeholder={
                      "What's your email?"
                    }

                  />
                </div>
              </div>
              <div className="form-input">
                <div className="input-area">
                  <h4 className="testClass">Shipping Address</h4>
                  <input
                    className=""
                    type="text"
                    name="shippingAddress"
                    placeholder={
                      'Where should we ship this?'
                    }
                    defaultValue={user.shippingAddress}
                  />
                </div>
              </div>

              <div className="form-input">
                <div className="input-area">
                  <h4 className="testClass">Billing Address</h4>
                  <input
                    className=""
                    type="text"
                    name="billingAddress"
                    placeholder={'Where should we bill you?'}
                    defaultValue={user.billingAddress}
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
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    updatingUser: function (id, e) {
      e.preventDefault();
      const name = e.target.name.value
      const email = e.target.email.value
      const shippingAddress = e.target.shippingAddress.value
      const billingAddress = e.target.billingAddress.value


      dispatch(updateUserInDatabase(id, { name, email, shippingAddress, billingAddress }))
    },
  }
}

export default connect(mapState, mapDispatch)(UserSettings);

/**
 * PROP TYPES
 */
UserSettings.propTypes = {

};


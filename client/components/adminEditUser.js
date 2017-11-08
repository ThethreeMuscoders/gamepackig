import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { fetchOneUser, updateUser, deleteUser } from '../store';

import '../css/_adminDashboard.scss';

/**
 * COMPONENT
 */
export class AdminEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      billingAddress: '',
      shippingAddress: '',
    };
    this.changeField = this.changeField.bind(this);
  }

  componentDidMount() {
    this.props.loadUser(this.props.match.params.userId, this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.match.params.userId !== this.props.match.params.userId) {
      this.props.loadUser(newProps.match.params.userId, this);
    }
  }

  changeField(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { name, email, billingAddress, shippingAddress } = this.state;
    const { submitChanges, submitDeleteUser } = this.props;
    const userId = this.props.match.params.userId;

    return (
      <div className="admin-sidebar">
        <div className="sidebar-back-btn">
          <Link to="/admin/users"><i className="fa fa-arrow-left" aria-hidden="true"></i>
          </Link>
        </div>
        <h3>Edit User</h3>

        <div className="input-row">
          <label>Name</label>
          <input name="name" type="text" value={name} onChange={this.changeField} />
        </div>

        <div className="input-row">
          <label>Email</label>
          <input name="email" type="text" value={email} onChange={this.changeField} />
        </div>

        <div className="input-row">
          <label>Billing Address</label>
          <textarea name="billingAddress" type="text" value={billingAddress} row="2" onChange={this.changeField}></textarea>
        </div>

        <div className="input-row">
          <label>Shipping Address</label>
          <textarea name="shippingAddress" type="text" value={shippingAddress} row="2" onChange={this.changeField}></textarea>
        </div>

        {
          // <div className="input-row">
          //   <label>isAdmin</label>
          //   <label for="isAdminTrue">True</label>
          //   {
          //     isAdmin
          //       ? <input type="radio" name="isAdmin" id="isAdminTrue" selected />
          //       : <input type="radio" name="isAdmin" id="isAdminTrue" />
          //   }
          //   <label for="isAdminFalse">False</label>
          //   <input type="radio" name="isAdmin" id="isAdminFalse" />
          // </div>
        }

        <button onClick={() => submitChanges(userId, this.state)}>Submit Changes</button>
        <button onClick={() => submitDeleteUser(userId)}>DELETE USER</button>

      </div>
    );
  }
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapState = (state) => {
  return {
    adminSelectedUser: state.adminSelectedUser,
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadUser(id, mySelf) {
      dispatch(fetchOneUser(id))
        .then(user => mySelf.setState(user))
        .catch(console.error);
    },
    submitChanges(id, state) {
      dispatch(updateUser(id, state))
        .then(() => {
          alert(`Updated user id: ${id}`)
        })
    },
    submitDeleteUser(id) {
      const confirmation = confirm(`Are you sure you want to delete user id #${id}`);
      confirmation && dispatch(deleteUser(id))
        .then(() => {
          alert(`Deleted user id: ${id}`);
          ownProps.history.push('/admin/users/')
        })
    },
  };
};


export default withRouter(connect(mapState, mapDispatch)(AdminEditUser));

/**
 * PROP TYPES
 */
AdminEditUser.propTypes = {

};

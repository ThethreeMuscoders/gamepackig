import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchSingleCart } from '../store';
/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const { email, userId } = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    userId: state.user.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchSingleCart(userId) {
      dispatch(fetchSingleCart(userId));
    },
  };
};

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
  userId: PropTypes.number,
}

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import '../../css/_userAccount.scss';

/**
 * COMPONENT
 */
export const UserAccount = (props) => {
  const { email, name } = props

  return (
    <div className='user-editInfo-wrapper'>
      

      <div className="user-editInfo-wrapper">
      <h3>Welcome to your account, {name || email}</h3>
      <h3>Please select an option on the left</h3>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    name: state.user.name
  }
}

export default connect(mapState)(UserAccount)

/**
 * PROP TYPES
 */
UserAccount.propTypes = {
  email: PropTypes.string
}

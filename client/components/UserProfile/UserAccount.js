import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import '../../css/_userAccount.scss';

/**
 * COMPONENT
 */
export const UserAccount = (props) => {
  const { email } = props

  return (
    <div className='user-editInfo-wrapper'>
      

      <div className="user-editInfo-wrapper">
      <h3>Your Account, {email}</h3>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserAccount)

/**
 * PROP TYPES
 */
UserAccount.propTypes = {
  email: PropTypes.string
}

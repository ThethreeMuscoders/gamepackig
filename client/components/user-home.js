import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const { email } = props

  return (
    <div className='user-editInfo-wrapper'>
      

      <div className="user-editInfo-wrapper">
      <h3>Welcome, {email}</h3>
        <form className="form-horizontalTest">
          <fieldset>
            <legend>Update Account</legend>
          
            <div className="">
              <label className="">Name</label>
              <div className="">
                <input
                  className=""
                  type="text"
                />
              </div>
            </div>
            
            <div className="">
            <label className="">Email</label>
            <div className="">
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

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}

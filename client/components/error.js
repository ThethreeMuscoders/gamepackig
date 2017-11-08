import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { errorState } from '../store';

import '../css/_error.scss';

function ErrorForm(props) {
  const { error, clearError } = props;
  const hasKeys = Object.keys(error).length > 0; 

  return (
    <div>
      {
        hasKeys &&
        (<div>
          <div className="error">
            <a onClick={clearError}><i class="fa fa-times" aria-hidden="true"></i></a>
            <div>
              <h2>Uh oh! Something happened, and we're working on fixing it!</h2>
              <p>Please try again later!</p>
            </div>
          </div>
          <div className="error-wrapper" >
          </div>
        </div>)
      }
    </div>
  );
}

const mapState = (state) => {
  return {
    error: state.error,
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    clearError() {
      return dispatch(errorState({}));
    },
  };
};
export default connect(mapState, mapDispatch)(ErrorForm);

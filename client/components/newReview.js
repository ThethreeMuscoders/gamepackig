import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Product from './product';

import '../css/_newReview.scss';
import { addReviewItemToDatabase } from '../store'


/**
 * COMPONENT
 */
class NewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      review: '',
      stars: 1,
    }
  }

  // componentWillMount() {
  //   this.setState ({
      
  //   });
  // }

  componentWillReceieveProps() {
    this.render();
  }
  render() {
    const { products, user, leaveReview } = this.props;
    console.log(user, 'state');
    return (
      <div className="user-settings-wrapper">
        <div className="settings-list">
          <form className="form-horizontalTest" onSubmit={(e) => leaveReview(user.id, e)}>
            <fieldset>
              <legend>Leave Review</legend>

              <div className="form-input">
                <div className="input-area">
                  <h4 className="testClass">Review</h4>
                  <textarea
                    className=""
                    name="name"
                    type="text"
                    placeholder={
                      "What did you think?"
                    }
                  />
                </div>
              </div>

              <div className="form-input">
                <div className="input-area">
                <select name="starSelector" onChange={e => this.setState({ stars: e.target.value })}>
                <option value="Rating" selected>Please select a rating</option>
                  <option key={1} value={1}>1</option>
                  <option key={2} value={2}>2</option>
                  <option key={3} value={3}>3</option>
                  <option key={4} value={4}>4</option>
                  <option key={5} value={5}>5</option>
              </select>
                </div>
              </div>

              <div className="">
                <div className="">
                  <button
                    type="submit"
                    className=""

                  >
                    Leave Review
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
    leaveReview: function (id, e) {
      e.preventDefault();
      const name = e.target.name.value
      const email = e.target.email.value
      const shippingAddress = e.target.shippingAddress.value
      const billingAddress = e.target.billingAddress.value


      dispatch(addReviewItemToDatabase(id, { rating, stars }))
    },
  }
}

export default connect(mapState, mapDispatch)(NewReview);

/**
 * PROP TYPES
 */
NewReview.propTypes = {

};


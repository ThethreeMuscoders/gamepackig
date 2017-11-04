import React from 'react';
import PropTypes from 'prop-types';

const starFunction = (num) => {
  const starArr = [];
  for (let i = 1; i <= num; i++) {
    const wholeStar = <i key={Math.random()} className='fa fa-star fa-lg' aria-hidden='true' />;
    starArr.push(wholeStar);
  }
  if (num % 1) {
    const halfStar = <i key={Math.random()} className='fa fa-star-half fa-lg' aria-hidden='true' />;
    starArr.push(halfStar);
  }
  return starArr;
};

export default function ReviewItem({ review }) {
  return (
    <div>
      <div id='userNameContainer'>
        <h2>{review.user.name}</h2>
        <div id='rating-container'>
          {starFunction(review.rating)}
        </div>
      </div>
      <p>{review.description}</p>
      <hr/>
    </div>
  );
};

ReviewItem.propTypes = {
  review: PropTypes.object,
} 
import axios from 'axios';

// Actions
const GET_ALL_REVIEWS = 'GET_ALL_REVIEWS';
const GET_SINGLE_REVIEW = 'GET_SINGLE_REVIEW';
const UPDATE_REVIEW = 'UPDATE_REVIEW';
const ADD_REVIEW = 'ADD_REVIEW';
const DELETE_REVIEW = 'DELETE_REVIEW';

// Action Creators
export const getAllReviews = (reviews) => {
  return {
    type: GET_ALL_REVIEWS,
    reviews,
  };
};

export const getSingleReview = (review) => {
  return {
    type: GET_SINGLE_REVIEW,
    review,
  };
};

export const updateReviewInStore = (review) => {
  return {
    type: UPDATE_REVIEW,
    review,
  };
};

export const addReviewToStore = (review) => {
  return {
    type: ADD_REVIEW,
    review,
  };
};

export const deleteReviewFromStore = (review) => {
  return {
    type: DELETE_REVIEW,
    review,
  };
};

// Reducer
const reducerMethods = {
  GET_ALL_REVIEWS(state, action) {
    return action.reviews;
  },
  GET_SINGLE_REVIEW(state, action) {
    return action.review;
  },
  UPDATE_REVIEW(state, action) {
    return state.map((review) => {
      return review.id === action.review.id ? action.review : review;
    });
  },
  ADD_REVIEW(state, action) {
    return [...state, action.review];
  },
  DELETE_REVIEW(state, action) {
    return state.filter(review => review.id !== action.review.id);
  },
};

export default function (state = [], action) {
  if (reducerMethods[action.type]) return reducerMethods[action.type](state, action);
  return state;
}

// Thunks
export const fetchAllReviews = () => (dispatch) => {
  return axios.get('/api/reviews/')
    .then((res) => {
      return dispatch(getAllReviews(res.data));
    })
    .catch(err => console.log(err));
};

export const fetchSingleReview = reviewId => (dispatch) => {
  return axios.get(`/api/reviews/${reviewId}`)
    .then((res) => {
      return dispatch(getSingleReview(res.data));
    })
    .catch(err => console.log(err));
};

export const addReviewItemToDatabase = review => (dispatch) => {
  return axios.post('/api/reviews/', review)
    .then((res) => {
      dispatch(addReviewToStore(res.data))
    })
    .catch(err => console.log(err));
};

export const updateReview = (reviewId, body) => (dispatch) => {
  return axios.put(`/api/reviews/${reviewId}`, body)
    .then(res => dispatch(updateReview(res)))
    .catch(err => console.log(err));
};

export const deleteReview = reviewId => (dispatch) => {
  return axios.delete(`/api/carts/${reviewId}`)
    .then(() => dispatch(deleteReview(reviewId)))
    .catch(err => console.log(err));
};

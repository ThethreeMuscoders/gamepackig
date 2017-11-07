import axios from 'axios';
import { errorState } from './';

// Action
const GET_PRODUCT = 'GET_PRODUCT';


// Action Creator
export const getProduct = (product) => {
  return {
    type: GET_PRODUCT,
    product,
  };
};

// Reducer

const reducerMethods = {
  GET_PRODUCT(state, action) {
    return action.product;
  },
};


export default function (state = {}, action) {
  if (reducerMethods[action.type]) return reducerMethods[action.type](state, action)
  return state;
};

// Thunks

export const fetchProduct = productId => (dispatch) => {
  return axios.get(`/api/products/${productId}`)
    .then(res => dispatch(getProduct(res.data)))
    .catch(err => dispatch(errorState(err)));
}

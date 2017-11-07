import axios from 'axios';

// Actions
const SELECT_PRODUCT = 'SELECT_PRODUCT';

// Action Creators
export const selectProduct = (product) => {
  return {
    type: SELECT_PRODUCT,
    product,
  };
};

// Reducer
const reducerMethods = {
  SELECT_PRODUCT(state, action) {
    return action.product;
  },
};

export default function (state = {}, action) {
  if (reducerMethods[action.type]) return reducerMethods[action.type](state, action);
  return state;
}

// Thunks
export const fetchOneProduct = (id) => (dispatch) => {
  return axios.get(`/api/products/${id}`)
    .then(res => {
      dispatch(selectProduct(res.data));
      return res.data;
    })
    .catch(err => console.log(err));
};

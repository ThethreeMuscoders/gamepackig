import axios from 'axios';

// Actions
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const ADD_PRODUCT = 'ADD_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';


// Action Creators
export const getAllProducts = (products) => {
  return {
    type: GET_ALL_PRODUCTS,
    products,
  };
};

export const addProductToStore = (product) => {
  return {
    type: ADD_PRODUCT,
    product,
  };
}

// Reducer
const reducerMethods = {
  GET_ALL_PRODUCTS(state, action) {
    return action.products;
  },
  ADD_PRODUCT(state, action) {
    return [...state, action.product];
  },
};

export default function (state = [], action) {
  if (reducerMethods[action.type]) return reducerMethods[action.type](state, action);
  return state;
}

// Thunks
export const fetchAllProducts = () => (dispatch) => {
  return axios.get('/api/products/')
    .then((res) => {
      return dispatch(getAllProducts(res.data));
    })
    .catch(err => console.log(err));
};

export const addProductToDatabase = product => (dispatch) => {
  return axios.post('/api/products/', product)
    .then((res) => {
      dispatch(addProductToStore(res.data));
    })
    .catch(err => console.log(err));
};

export const updateProduct = (productId, body) => (dispatch) => {
  return axios.put(`/api/products/${productId}`, body)
    .then(res => dispatch(fetchAllProducts()))
    .catch(err => console.log(err));
};

export const deleteProduct = productId => (dispatch) => {
  return axios.delete(`/api/products/${productId}`)
    .then(res => dispatch(fetchAllProducts()))
    .catch(err => console.log(err));
};

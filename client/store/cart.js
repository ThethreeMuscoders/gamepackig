import axios from 'axios';

// Actions
const GET_ALL_CARTS = 'GET_ALL_CARTS';
const GET_SINGLE_CART = 'GET_SINGLE_CART';
const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
const ADD_CART_ITEM = 'ADD_CART_ITEM';
const DELETE_CART_ITEM = 'DELETE_CART_ITEM';

// Action Creators
export const getAllCarts = (carts) => {
  return {
    type: GET_ALL_CARTS,
    carts,
  };
};

export const getSingleCart = (cart) => {
  return {
    type: GET_SINGLE_CART,
    cart,
  };
};

export const updateCartInStore = (cart) => {
  return {
    type: UPDATE_CART_ITEM,
    cart,
  };
};

export const addCartToStore = (cart) => {
  return {
    type: ADD_CART_ITEM,
    cart,
  };
};

export const deleteCartFromStore = (cartId) => {
  return {
    type: DELETE_CART_ITEM,
    cartId,
  };
};

// Reducer
const reducerMethods = {
  GET_ALL_CARTS(state, action) {
    return action.carts;
  },
  GET_SINGLE_CART(state, action) {
    return action.cart;
  },
  UPDATE_CART_ITEM(state, action) {
    return state.map((cart) => {
      return cart.id === action.cart.id ? action.cart : cart;
    });
  },
  ADD_CART_ITEM(state, action) {
    return [...state, action.cart];
  },
  DELETE_CART_ITEM(state, action) {
    return state.filter(cart => cart.id !== action.cartId);
  },
};

export default function (state = [], action) {
  if (reducerMethods[action.type]) return reducerMethods[action.type](state, action);
  return state;
}

// Thunks
export const fetchAllCarts = () => (dispatch) => {
  return axios.get('/api/carts/')
    .then((res) => {
      return dispatch(getAllCarts(res.data));
    })
    .catch(err => console.log(err));
};

export const fetchSingleCart = userId => (dispatch) => {
  return axios.get(`/api/carts/${userId}`)
    .then((res) => {
      return dispatch(getSingleCart(res.data));
    })
    .catch(err => console.log(err));
};


export const updateCart = (cartId, body) => (dispatch) => {
  return axios.put(`/api/carts/${cartId}`, body)
    .then(res => dispatch(updateCartInStore(res)))
    .catch(err => console.log(err));
};

export const addCartItemToDatabase = cartItem => (dispatch) => {

  return axios.get(`/api/carts/${cartItem.userId}/${cartItem.productId}`)
    .then((res) => {
      if (res.data) {
        res.data.quantity += cartItem.quantity;
        return axios.put(`/api/carts/${res.data.id}`, res.data)
          .then(res2 => dispatch(updateCartInStore(res2)))
          .catch(err => console.log(err));
      }
      return axios.post('/api/carts/', cartItem)
        .then(postRes => dispatch(addCartToStore(postRes.data)));
    })
    .catch(err => console.log(err));
};

export const deleteCart = cartId => (dispatch) => {
  return axios.delete(`/api/carts/${cartId}`)
    .then(() => dispatch(deleteCartFromStore(cartId)))
    .catch(err => console.log(err));
};

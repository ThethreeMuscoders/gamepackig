import axios from 'axios';


const FILTER_PRODUCTS = 'FILTER_PRODUCTS';


export const filterProductsInStore = (filteredProducts) => {
  return {
    type: FILTER_PRODUCTS,
    filteredProducts,
  };
};


const reducerMethods = {
  FILTER_PRODUCTS(state, action) {
    return action.filteredProducts;
  }
};

export default function (state = [], action) {
  if (reducerMethods[action.type]) return reducerMethods[action.type](state, action);
  return state;
}

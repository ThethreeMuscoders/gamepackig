import axios from 'axios';
import { errorState } from './';

// Actions

const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
const ADD_CATEGORY = 'ADD_CATEGORY';
const DELETE_CATEGORY = 'DELETE_CATEGORY';


// Action Creators

export const getAllCategories = (categories) => {
  return {
    type: GET_ALL_CATEGORIES,
    categories,
  }
};

export const addCategory = (category) => {
  return {
    type: ADD_CATEGORY,
    category,
  }
};

export const deleteCategory = (category) => {
  return {
    type: DELETE_CATEGORY,
    category,
  }
};

// Reducer
const reducerMethods = {
  GET_ALL_CATEGORIES(state, action) {
    return action.categories;
  },
  ADD_CATEGORY(state, action) {
    return [...state, action.category];
  },
  DELETE_CATEGORY(state, action) {
    return state.filter(category => category.id !== action.category);
  },
};

export default function (state = [], action) {
  if (reducerMethods[action.type]) return reducerMethods[action.type](state, action);
  return state;
}

// Thunks
export const fetchAllCategories = () => (dispatch) => {
  return axios.get('/api/category/')
    .then(res => dispatch(getAllCategories(res.data)))
    .catch(err => dispatch(errorState(err)));
};

export const postCategoryToDb = category => (dispatch) => {
  return axios.post('/api/category/', category)
    .then(res => dispatch(addCategory(res.data)))
    .catch(err => dispatch(errorState(err)));
};

export const deleteCategoryFromDb = categoryId => (dispatch) => {
  return axios.delete(`/api/category/${categoryId}`)
    .then(res => dispatch(deleteCategory(res.data)))
    .catch(err => dispatch(errorState(err)));
};

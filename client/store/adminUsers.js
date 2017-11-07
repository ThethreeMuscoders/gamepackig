import axios from 'axios';
import { errorState } from './';

// Actions
const GET_ALL_USERS = 'GET_ALL_USERS';

// Action Creators
export const getAllUsers = (users) => {
  return {
    type: GET_ALL_USERS,
    users,
  };
};

// Reducer
const reducerMethods = {
  GET_ALL_USERS(state, action) {
    return action.users;
  },
};

export default function (state = [], action) {
  if (reducerMethods[action.type]) return reducerMethods[action.type](state, action);
  return state;
}

// Thunks
export const fetchAllUsers = () => (dispatch) => {
  return axios.get('/api/users/')
    .then(res => dispatch(getAllUsers(res.data)))
    .catch(err => dispatch(errorState(err)));
};

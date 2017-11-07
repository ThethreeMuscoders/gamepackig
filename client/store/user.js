import axios from 'axios';
import history from '../history';
import { fetchSingleCart, fetchGuestCart } from './';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then((res) => {
        dispatch(getUser(res.data || defaultUser));
        if (res.data.isGuest) {
          dispatch(fetchGuestCart(res.data));
        } else {
          dispatch(fetchSingleCart(res.data.id));
        }
      })
      .catch(err => console.log(err));

export const auth = (email, password, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password })
      .then((res) => {
        // I will have the user at this point
        // Dispatch, get all of this users carts if any.
        // Dispatch a filter that updates the real carts' item quantity with that of the sesssion. 
        // Delete that session cart and add replace it with an empty array.
        // At this point all of the user's carts will be updated and get user can be dispatched.
        console.log(method, "This Method")
        dispatch(getUser(res.data));
        history.push('/home'); //this will cause nothing
      })
      .catch(error =>
        dispatch(getUser({ error })));

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then((_) => {
        dispatch(removeUser());
        history.push('/login');
      })
      .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      console.log('user test');
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}

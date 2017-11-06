import axios from 'axios'
import history from '../history'
import { fetchSingleCart } from './';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })
const updateUser = user => ({type: UPDATE_USER, user})
/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then((res) => {
        dispatch(getUser(res.data || defaultUser));
        dispatch(fetchSingleCart(res.data.id));
      })
      .catch(err => console.log(err));

export const auth = (email, password, method) =>
dispatch =>
    axios.post(`/auth/${method}`, { email, password })
      .then(res => {
        dispatch(getUser(res.data))
        history.push('/home')
      })
      .catch(error =>
        dispatch(getUser({ error })))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))


export const updateUserInDatabase = (id, user) => dispatch => {
  console.log(user, ' user')
  axios.put(`/api/users/${id}`, user)
        .then(res => dispatch(updateUser(res.data)))
        .catch(err => console.error(`Updating user: ${user} unsuccesful`, err));
};
/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      console.log('user test')
      return action.user
    case REMOVE_USER:
      return defaultUser
    case UPDATE_USER:
    return action.user
    default:
      return state
  }
}

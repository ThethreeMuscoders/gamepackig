import axios from 'axios'
import history from '../history'
import { fetchSingleCart } from './';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE = 'UPDATE_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })

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

export const auth = (name, email, password, method) =>
console.log('auth : name, pw, email', name, password, email)  
dispatch =>
    axios.post(`/auth/${method}`, { name, email, password })
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


export const updateUser = (id, user) => dispatch => {
  axios.put(`/api/users/${id}`, user)
        .then(res => dispatch(update(res.data)))
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
    case UPDATE:
    return users.map(user => (
      action.user.id === user.id ? action.user : user
    ));
    default:
      return state
  }
}

import axios from 'axios';
import { errorState } from './';

// Actions
const GET_ALL_USER_HISTORIES = 'GET_ALL_USER_HISTORIES';
const GET_SINGLE_USER_HISTORY = 'GET_SINGLE_USER_HISTORY';
const UPDATE_HISTORY_ITEM = 'UPDATE_HISTORY_ITEM';
const ADD_HISTORY_ITEM = 'ADD_HISTORY_ITEM';
const DELETE_HISTORY_ITEM = 'DELETE_HISTORY_ITEM';

// Action Creators
export const getAllHistories = histories => ({ type: GET_ALL_USER_HISTORIES, histories });
export const getSingleHistory = history => ({ type: GET_SINGLE_USER_HISTORY, history });
export const updateHistoryInStore = history => ({ type: UPDATE_HISTORY_ITEM, history });
export const addHistoryToStore = history => ({ type: ADD_HISTORY_ITEM, history });
export const deleteHistoryFromStore = historyId => ({ type: DELETE_HISTORY_ITEM, historyId });

// Reducer
const reducerMethods = {
  GET_ALL_USER_HISTORIES(state, action) {
    return action.histories;
  },
  GET_SINGLE_USER_HISTORY(state, action) {
    return action.history;
  },
  UPDATE_HISTORY_ITEM(state, action) {
    return state.map(history => (history.id === action.history.id ? action.history : history));
  },
  ADD_HISTORY_ITEM(state, action) {
    return [...state, action.history];
  },
  DELETE_HISTORY_ITEM(state, action) {
    return state.filter(history => history.id !== action.historyId);
  },
};

export default function (state = [], action) {
  if (reducerMethods[action.type]) return reducerMethods[action.type](state, action);
  return state;
}

// Thunks
export const fetchAllHistories = () => (dispatch) => {
  return axios.get('/api/history/')
    .then((res) => {
      return dispatch(getAllHistories(res.data));
    })
    .catch(err => dispatch(errorState(err)));
};

export const fetchSingleHistory = userId => (dispatch) => {
  return axios.get(`/api/history/${userId}`)
    .then(res => dispatch(getSingleHistory(res.data)))
    .catch(err => dispatch(errorState(err)));
};


export const updateHistory = (historyId, body) => (dispatch) => {
  return axios.put(`/api/history/${historyId}`, body)
    .then(res => dispatch(updateHistoryInStore(res.data)))
    .catch(err => dispatch(errorState(err)));
};

export const addHistoryItemToDatabase = historyItem => (dispatch) => {
  return axios.post('/api/history/', historyItem)
    .then((res) => {
      dispatch(addHistoryToStore(res.data));
    })
    .catch(err => dispatch(errorState(err)));
};

export const deleteHistory = historyId => (dispatch) => {
  return axios.delete(`/api/history/${historyId}`)
    .then(() => dispatch(deleteHistoryFromStore(historyId)))
    .catch(err => dispatch(errorState(err)));
};

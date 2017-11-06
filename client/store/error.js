import axios from 'axios';


const ERROR_STATE = 'ERROR_STATE';


export const errorState = (error) => {
  return {
    type: ERROR_STATE,
    error,
  };
};


const reducerMethods = {
  ERROR_STATE(state, action) {
    return action.error;
  },
};

export default function (state = {}, action) {
  if (reducerMethods[action.type]) return reducerMethods[action.type](state, action);
  return state;
}

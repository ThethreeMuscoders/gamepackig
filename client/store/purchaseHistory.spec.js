import { expect } from 'chai';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import { fetchSingleHistory } from './purchaseHistory';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('Purchase History Thunk Creators', () => {
  let store;
  let mockAxios;

  const initialState = { cart: [] };

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    store = mockStore(initialState);
  })

  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });

  it('Thunk fetchSingleHistory should get single users purchase history from the database and update the state', () => {
    const fakeHistory = [
      { id: 1, status: 'PROCESSING', price: 40.00, userId: 1, productId: 1 },
      { id: 2, stauts: 'COMPLETED', price: 33.00, userId: 1, productId: 2 },
    ];

    mockAxios.onGet('/api/history/1').reply(200, fakeHistory);

    return store.dispatch(fetchSingleHistory(1)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).to.equal('GET_SINGLE_USER_HISTORY');
      expect(actions[0].history[1].id).to.equal(fakeHistory[1].id);
    });
  });
}); // describe

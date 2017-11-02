import { expect } from 'chai';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import { fetchSingleCart } from './cart';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('Cart Thunk Creators', () => {
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

  it('Thunk fetchSingleCart should get single users cart from the database and update the state', () => {
    const fakeCart = [
      { id: 1, price: 400.00, quantity: 40, userId: 1, productId: 1 },
      { id: 2, price: 200.00, quantity: 33, userId: 1, productId: 2 },
    ];

    mockAxios.onGet('/api/carts/1').reply(200, fakeCart);

    return store.dispatch(fetchSingleCart(1)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).to.equal('GET_SINGLE_CART');
      expect(actions[0].cart[1].id).to.equal(fakeCart[1].id);
    });
  });
}); // describe

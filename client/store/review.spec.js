import { expect } from 'chai';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import { fetchSingleReview } from './review';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('Product Thunk Creators', () => {
  let store;
  let mockAxios;

  const initialState = { review: [] };

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    store = mockStore(initialState);
  })

  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });

  it('Thunk fetchSingleReview should get single review from the database and update the state', () => {
    const fakeReview = {
      id: 1,
      description: 'single fetch test',
      rating: 3,
      userId: 1,
      productId: 1,
    };

    mockAxios.onGet('/api/reviews/1').reply(200, fakeReview);

    return store.dispatch(fetchSingleReview(1)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).to.equal('GET_SINGLE_REVIEW');
      expect(actions[0].review.id).to.equal(fakeReview.id);
    });
  });
}); // describe

import { expect } from 'chai';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import { fetchAllCategories, postCategoryToDb, deleteCategoryFromDb } from './categories';
import Product from '../../server/db/models/product';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('Categories Thunk Creators', () => {
  let store;
  let mockAxios;
  const initialState = { categories: [] };
  const fakeCategories = [
    { id: 1, category: 'Hardware' },
    { id: 2, category: 'Game' },
    { id: 3, category: 'Cable' },
    { id: 4, category: 'Accessory' },
  ];
  const fakeCategory = { id: 5, category: 'candy' };
  
  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  })

  it('Thunk fetchAllCategories should fetch all of the categories', () => {
    mockAxios.onGet('/api/category/').reply(200, fakeCategories);
    return store.dispatch(fetchAllCategories()).then(() => {
      const actions = store.getActions();
      // const state = store.getState();
      // console.log(state)
      expect(actions[0].type).to.equal('GET_ALL_CATEGORIES');
      expect(actions[0].categories).to.deep.equal(fakeCategories);
    });
  });
  
  it('Thunk postCategoryToDb should post category to the db', () => {
    mockAxios.onPost('/api/category/', fakeCategory).reply(200, fakeCategory);
    return store.dispatch(postCategoryToDb(fakeCategory)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).to.equal('ADD_CATEGORY');
      expect(actions[0].category).to.deep.equal(fakeCategory);
    })
  });

  it('Thunk deleteCategoryFromDb should delete a category from the database', () => {
    mockAxios.onDelete('/api/category/5').reply(204, fakeCategory);
    return store.dispatch(deleteCategoryFromDb(fakeCategory.id)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).to.equal('DELETE_CATEGORY');
      expect(actions[0].category).to.deep.equal(fakeCategory);
    });
  });
})
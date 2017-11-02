import { expect } from 'chai';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import { fetchAllProducts, updateProduct, addProductToDatabase } from './products';
import Product from '../../server/db/models/product';

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Product Thunk Creators', () => {
  let store;
  let mockAxios;

  const initialState = { products: [] };

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    store = mockStore(initialState);
  })

  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });

  xit('Thunk fetchAllProducts should get all products from the database and update the state', () => {
    const fakeProducts = [
      { id: 1, name: 'GTX 950', description: 'nvidia card', price: 400.00, quantity: 40, categoryId: 2 },
      { id: 2, name: 'GTX 970', description: 'nvidia card', price: 450.00, quantity: 40, categoryId: 2 },
      { id: 3, name: 'GTX 980', description: 'nvidia card', price: 900.00, quantity: 40, categoryId: 2 },
    ];

    mockAxios.onGet('/api/products/').reply(200, fakeProducts);

    return store.dispatch(fetchAllProducts()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).to.equal('GET_ALL_PRODUCTS');
      expect(actions[0].products[1].id).to.equal(fakeProducts[1].id);
    });
  });

  xit('Thunk updateProduct should update a product from database', () => {
    const fakeUpdate = {
      name: 'GTX 100',
      description: 'not so new card',
      quantity: 1,
    };

    mockAxios.onPut('/api/products/1', fakeUpdate).reply(200, {
      id: 1,
      description: 'not so new card',
      name: 'GTX 100',
      quantity: 1,
      price: 50.00,
      category: 2,
    });
    return store.dispatch(updateProduct(1, fakeUpdate))
      .then(() => {
        console.log('here')
      });
  });

  it('Thunk addPriduct should delete a product from database', () => {
    const fakeProduct = {
      id: 1,
      name: 'GTX 950',
      description: 'nvidia card',
      price: 400.00,
      quantity: 40,
      categoryId: 2,
    };
    mockAxios.onPost('/api/products/', fakeProduct).reply(200, fakeProduct);

    return store.dispatch(addProductToDatabase(fakeProduct)).then(() => {
      const actions = store.getActions();

      expect(actions[0].type).to.equal('ADD_PRODUCT');
      expect(actions[0].product).to.deep.equal(fakeProduct);
    });
  });
});

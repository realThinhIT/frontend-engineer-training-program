import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import fetch from 'jest-fetch-mock';

import apiMiddleware from '../../src/store/apiMiddleware';
import localStorageMiddleware from '../../src/store/localStorageMiddleware';

configure({ adapter: new Adapter() });

// Setup store
const middlewares = [apiMiddleware, localStorageMiddleware];
const mockStore = configureStore(middlewares);
const store = mockStore({});

global.store = store;
global.fetch = fetch;

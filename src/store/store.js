/* eslint-env browser */
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import allReducers from '../reducers/reducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


/* eslint-disable no-underscore-dangle */
const store = createStore(allReducers,
  composeEnhancer(applyMiddleware(thunk)));
/* eslint-enable */

export default store;

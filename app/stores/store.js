import { applyMiddleware , createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from './reducers';
// import {createLogger} from 'redux-logger';

/* To enable redux store logs uncomment the above import createLogger statement,
   and add createLogger() inside applyMiddleware along side thunk */

// const middleware = applyMiddleware(thunk, createLogger());
const middleware = applyMiddleware(thunk);
const store = createStore(rootReducers, middleware);

export default store;

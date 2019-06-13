import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers/index';

// we are adding composeWithDevTools here to get easy access to the Redux dev tools
// creates the store with combined reducers that could be implemented with the store
const store = createStore(
  reducers,
  composeWithDevTools(),
);

export default store;

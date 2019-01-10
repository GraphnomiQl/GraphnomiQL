import { combineReducers } from 'redux';

// // import all reducers here
import rootReducer from './rootReducer.js';

// combine reducers
const reducers = combineReducers({
  // if we had other reducers, they would go here
  root: rootReducer,
});

// make the combined reducers available for import
export default reducers;

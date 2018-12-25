// import each action type into the actions
import * as actionTypes from '../constants/actionTypes.js';

// changing schema action, linked by CHANGE_SCHEMA type
export const changeSchema = (introspection, text) => {
  return {
    type: actionTypes.CHANGE_SCHEMA,
    payload: introspection,
    text: text,
  };
}

// export const filterTypes = (schema) => {
//   return {
//     type: actionTypes.FILTER_TYPES,
//     payload: schema,
//   };
// }


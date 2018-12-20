// import each action type into the actions
import * as actionTypes from '../constants/actionTypes';

// changing schema action, linked by CHANGE_SCHEMA type
export const changeSchema = (introspection) => {
  return {
    type: CHANGE_SCHEMA,
    payload: {
      introspection
    },
  };
}
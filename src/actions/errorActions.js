import * as actionTypes from '../constants/actionTypes';

export const reportError = (msg) => {
  return {
    type: actionTypes.REPORT_ERROR,
    payload: msg,
  };
};

export const clearError = () => {
  return {
    type: actionTypes.CLEAR_ERROR,
  };
};
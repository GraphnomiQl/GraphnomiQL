import * as actionTypes from '../constants/actionTypes';

export function selectNode(id) {
    return {
      type: SELECT_NODE,
      payload: id,
    };
  }
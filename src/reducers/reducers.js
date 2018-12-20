// import each action type so the reducers can recognize actions
import * as actionTypes from '../constants/actionTypes';

//
const initialState = {
    schema: null,
    selectedNode: {
      currentNodeId: null, // current name for the selected node
      currentEdgeId: null, // current relationship (should only change when clicking on ofType of row)
      scalar: null, // (should only be used for editing portion)
    },
    schemaView: {
      // research D3 & viz
      // svg: null,
      focusedNodeId: null,
    },
    errorMsg: null,            
}

export const rootReducer = (prevState = initialState, action) => {
  const { type } = action;
  switch(type) {
    case actionTypes.CHANGE_SCHEMA:
    return {
      ...prevState,
      schema: action.payload.introspection,
      selected: initialState.selected,      
    }
  }
}

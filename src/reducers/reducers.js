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
    svg: null,
    focusElementId: null,
  },
  errorMsg: null,
};

export const rootReducer = (prevState = initialState, action) => {
  const { type } = action;
  switch(type) {
    // add schema to state upon inputting introspection result
    case actionTypes.CHANGE_SCHEMA: {
      return {
        ...prevState,
        schema: action.payload.introspection,
        selectedNode: initialState.selectedNode, 
        schemaView: initialState.schemaView     
      };
    }
    // render svg string to show schemaView
    case actionTypes.SVG_RENDERING_COMPLETED: {
      return {
        ...prevState,
        schemaView: {
          ...prevState.schemaView,
          svg: action.payload,
        }        
      };
    }
    // action for selecting on a node        
    case actionTypes.SELECT_NODE: {
      const currentNodeId = action.payload;
      if (currentNodeId === prevState.selectedNode.curretNodeId) return prevState;
      return {
        ...prevState,
        selectedNode: {
          ...prevState.selectedNode,
          currentNodeId,
          currentEdgeId: null,
          scalar: null,
        },
      };
    }
    // action for adding selected edge into state
    case actionTypes.SELECT_EDGE: {
      let currentEdgeId = action.payload;
      if (currentEdgeId === previousState.selectedNode.currentEdgeId) {
        return {
          ...prevState,
          selectedNode: {
            ...prevState.selectedNode,
            currentEdgeId: null,
            scalar:null,
          },
        };
      };
      let nodeId = extractTypeId(currentEdgeId);
      return {
        ...prevState,
        selectedNode: {
          ...prevState.selectedNode,
          currentNodeId: nodeId,
          currentEdgeId,
          scalar: null
        },
      };
    }
    // clear selected node
    case actionTypes.CLEAR_SELECTION: {
      return {
        ...prevState,
        selectedNode: initialState.selectedNode,
      };
    }
    // action to focus on an edge, node, or field 
    case actionTypes.FOCUS_ELEMENT: {
      return {
        ...prevState,
        schemaView: {
          ...prevState.schemaView,
          focusElementId: action.payload,
        },
      };
    }
    // action completed focus on edge, node, or field
    case actionTypes.FOCUS_ELEMENT_DONE: {
      if (prevState.schemaView.focusElementId !== action.payload) return prevState;
      return {
        ...prevState,
        schemaView: {
          ...prevState.schemaView,
          focusElementId: null,
        },
      };
    }
    // action for reporting any errors
    case actionTypes.REPORT_ERROR: {
      return {
        ...prevState,
        errorMsg: action.payload,
      };
    }
    // action that clears up any error messages
    case actionTypes.CLEAR_ERROR: {
      return {
        ...prevState,
        errorMsg: initialState.errorMsg,
      };
    }

    // set default
    default: {
      return prevState;
    }   
  }
}

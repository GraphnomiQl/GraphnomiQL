// import each action type so the reducers can recognize actions
import * as actionTypes from '../constants/actionTypes';

//
const initialState = {
  schema: null,
  typeList: [],
  selectedNode: {
    currentNodeId: null, // current name for the selected node
    currentEdgeId: null, // current relationship (should only change when clicking on ofType of row)
    scalar: null, // (should only be used for editing portion)
  },
  graph: {
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
        schema: actionTypes.payload,
        selectedNode: initialState.selectedNode, 
        graph: initialState.graph     
      };
    }

    case actionTypes.FILTER_TYPES: {
      return {
        ...prevState,
        typeList: actionTypes.payload.data.__schema.types.filter((type) => {
          return (type.name.charAt(0) !== "_" && type.name.charAt(1) !== "_" && type.kind !== "SCALAR" && type.kind !== "ENUM" && type.name.toLowerCase() !== "mutation")
        })
      }
    }
    // render svg string to show graph
    case actionTypes.SVG_RENDERING_COMPLETED: {
      return {
        ...prevState,
        graph: {
          ...prevState.graph,
          svg: actionTypes.payload,
        }        
      };
    }
    // action for selecting on a node        
    case actionTypes.SELECT_NODE: {
      const currentNodeId = actionTypes.payload;
      if (currentNodeId === prevState.selectedNode.currentNodeId) return prevState;
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
      let currentEdgeId = actionTypes.payload;
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
        graph: {
          ...prevState.graph,
          focusElementId: actionTypes.payload,
        },
      };
    }
    // action completed focus on edge, node, or field
    case actionTypes.FOCUS_ELEMENT_DONE: {
      if (prevState.graph.focusElementId !== actionTypes.payload) return prevState;
      return {
        ...prevState,
        graph: {
          ...prevState.graph,
          focusElementId: null,
        },
      };
    }
    // action for reporting any errors
    case actionTypes.REPORT_ERROR: {
      return {
        ...prevState,
        errorMsg: actionTypes.payload,
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

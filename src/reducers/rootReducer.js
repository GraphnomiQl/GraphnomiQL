// import each action type so the reducers can recognize actions
import * as actionTypes from '../constants/actionTypes';
import PRESETS from '../presets/presets.js';

//
const initialState = {
  schema: null,
  // typeList: [],
  selectedNode: {
    currentNodeId: null, // current name for the selected node
    currentEdgeId: null, // current relationship (should only change when clicking on ofType of row)
    scalar: null, // (should only be used for editing portion)
  },
  graph: {
    // // research D3 & viz
    // svg: null,
    focusElementId: null,
  },
  errorMsg: null,
};

const rootReducer = (prevState = initialState, action) => {
  const { type } = action;
  switch(type) {
    // add schema to state upon inputting introspection result
    case actionTypes.CHANGE_SCHEMA: {
      if (PRESETS[action.payload]) return {
        ...prevState,
        schema: PRESETS[action.payload],
        // selectedNode: initialState.selectedNode, 
        // graph: initialState.graph
           
      };
      if (action.payload === "custom") {
        const parsed = JSON.parse(action.text);
        return {
        ...prevState,
        schema: parsed,
        };
      }
      console.log('i shouldnt be here');
      return prevState;
    }

    // case actionTypes.CHANGE_SCHEMA_FILTER_TYPES: {
    //   return {
    //     ...prevState,
    //     schema: actionTypes.payload,
    //     typeList: actionTypes.payload.data.__schema.types.filter((type) => {
    //       return (type.name.charAt(0) !== "_" && type.name.charAt(1) !== "_" && type.kind !== "SCALAR" && type.kind !== "ENUM" && type.name.toLowerCase() !== "mutation")
    //     }),
    //     selectedNode: initialState.selectedNode, 
    //     graph: initialState.graph     
    //   }
    // }
    // render svg string to show graph
    case actionTypes.SVG_RENDERING_COMPLETED: {
      return {
        ...prevState,
        graph: {
          ...prevState.graph,
          svg: action.payload,
        }        
      };
    }

    // action that allows users to add a new type to introspection 
    case actionTypes.ADD_NODE: {
      const name = action.payload;
      const newNode = {"kind": "OBJECT", "name": name, "description":"", "fields": [], "inputFields": null, "interfaces": [], "enumValues": null, "possibleTypes": null}
      const types = prevState.schema.data.__schema.types.slice();
      types.push(newNode)
      return {
        ...prevState,
        schema: {
          ...prevState.schema,
          "data": {
            ...prevState.schema.data,
            "__schema": {
              ...prevState.schema.data.__schema,
              "types": types
            }
          }
        }
      }
    }
     // action that allows users to delete an existing type from introspection 
    case actionTypes.DELETE_NODE: {
      const name = action.payload;
      const types = prevState.schema.data.__schema.types.slice();
      for (let i = 0; i < types.length; i += 1) {
        if (types[i].name === name) {
          if (types[i].fields.length >= 1) {
            for (let j = 0; j < types[i].fields.length; j += 1) {
              if (types[i].fields[j].type.ofType) types[i].fields[j].type.ofType = null;        
            } 
          }
          types.splice(i, 1);
        }
      }
      return {
        ...prevState,
        schema: {
          ...prevState.schema,
          "data": {
            ...prevState.schema.data,
            "__schema": {
              ...prevState.schema.data.__schema,
              "types": types
            }
          }
        }
      }
    }
    // action that allows user to add a new field to an existing type
    case actionTypes.ADD_FIELD: {
      const fieldName = action.payload;
      const nodeName = action.nodeName;
      const typeKind = action.typeKind;
      const typeName = action.typeName;
      const ofTypeKind = action.ofTypeKind;
      const ofTypeName = action.ofTypeName;
      let newField = {
        "name": fieldName, 
        "args": [], 
        "type": {
          "kind": "SCALAR",
          "name": typeName, 
          "ofType": null,
        }
      };
      if (typeKind === "OBJECT") {
        newField.type = {
          "kind": typeKind, 
          "name": ofTypeName, 
          "ofType": null,
        }
      }
      if (typeKind === "LIST") {
        newField.type = {
          "kind": typeKind, 
          "name": null, 
          "ofType": {
            "kind": ofTypeKind, 
            "name": ofTypeName, 
            "ofType": null,
          }
        }
      }
      const types = prevState.schema.data.__schema.types.slice();
      for (let i = 0 ; i < types.length; i += 1) {
        if (types[i].name === nodeName) {
          const copyField = types[i].fields.slice();
          copyField.push(newField);
          types[i].fields = copyField;
          return {
            ...prevState,
            schema: {
              ...prevState.schema,
              "data": {
                ...prevState.schema.data,
                "__schema": {
                  ...prevState.schema.data.__schema,
                  "types": types
                }
              }
            }
          }
        }
      }
      windows.alert("ERROR! NODE NOT FOUND!");
      return prevState;     
    }
    // action that allows user to delete a field from an existing table
    case actionTypes.DELETE_FIELD: {
      const nodeName = action.nodeName;
      const fieldName = action.payload;
      const types = prevState.schema.data.__schema.types.slice();
      for (let i = 0 ; i < types.length; i += 1) {
        if (types[i].name === nodeName) {
          const copyField = types[i].fields.slice();
          for (let j = 0; j < copyField.length; j += 1) {
            if (copyField[j].name === fieldName) {
              if (copyField[j].type.ofType) {
                return windows.alert("ERROR! APPARENT CONNECTION TO OTHER NODES!")
              }
              copyField.splice(j,1)
              types[i].fields = copyField;
              return {
                ...prevState,
                schema: {
                  ...prevState.schema,
                  "data": {
                    ...prevState.schema.data,
                    "__schema": {
                      ...prevState.schema.data.__schema,
                      "types": types
                    }
                  }
                }
              }              
            }
          }
        }
      }
      windows.alert("ERROR! NODE NOT FOUND!");
      return prevState                              
    }
    // action for selecting on a node        
    case actionTypes.SELECT_NODE: {
      const currentNodeId = action.payload;
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
        graph: {
          ...prevState.graph,
          focusElementId: action.payload,
        },
      };
    }
    // action completed focus on edge, node, or field
    case actionTypes.FOCUS_ELEMENT_DONE: {
      if (prevState.graph.focusElementId !== action.payload) return prevState;
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
        errorMsg: action.payload,
        errorMsg: initialState.errorMsg,
      };
    }

    // set default
    default: {
      return prevState;
    }   
  }
}

export default rootReducer;
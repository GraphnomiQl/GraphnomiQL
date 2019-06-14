import _ from 'lodash';
import * as actionTypes from '../constants/actionTypes';
import PRESETS from '../presets/presets.js';

// state within the store
const initialState = {
  schema: null,
  errorMsg: null,
  graph: {
    nodes: [],
    edges: [],
  },
  selectedNode: {
    id: '',
    type: '',
    typeObject: null,
  },
};

const rootReducer = (prevState = initialState, action) => {
  const { type } = action;
  switch (type) {
    // reducer functionality for changing schema; updates state in store to contain current
    // preset/custom introspection result
    case actionTypes.CHANGE_SCHEMA: {
      if (PRESETS[action.payload]) {
        return {
          ...prevState,
          schema: PRESETS[action.payload],
          selectedNode: {
            ...prevState.selectedNode,
            typeObject: PRESETS[action.payload].data.__schema.types[0],
          },
        };
      }
      if (action.payload === 'custom') {
        const parsed = JSON.parse(action.text);
        return {
          ...prevState,
          schema: parsed,
          selectedNode: {
            ...prevState.selectedNode,
            typeObject: parsed.data.__schema.types[0],
          },
        };
      }
      return prevState;
    }

    // reducer functionality for updating the store with the new edits to the graph object
    case actionTypes.RENDER_NODE: {
      if (!prevState.schema) return null;
      const typeList = prevState.schema.data.__schema.types.filter((type) => {
        return (
          type.name
          && type.name.charAt(0) !== '_' && type.name.charAt(1) !== '_'
          && type.kind !== 'INPUT_OBJECT'
          && type.kind !== 'SCALAR'
          && type.kind !== 'ENUM'
          && (type.fields !== null || type.possibleTypes !== null)
          && type.name.toLowerCase() !== 'mutation'
        );
      });

      const newNodes = prevState.graph.nodes.slice();
      const newEdges = prevState.graph.edges.slice();

      typeList.forEach((type) => {
        newNodes.push({
          id: type.name,
          label: type.name,
          group: type.name,
          shape: 'box',
          type: 'type',
        });
        type.fields.forEach((field) => {
          newNodes.push({
            id: `${type.name}|${field.name}`,
            label: field.name,
            group: type.name,
            type: 'field',
          });
          newEdges.push({
            from: type.name,
            to: `${type.name}|${field.name}`,
            arrows: 'to',
          });
          if (field.type.kind === 'LIST') {
            newEdges.push({
              from: `${type.name}|${field.name}`,
              to: field.type.ofType.name,
              arrows: 'to',
              dashes: true,
            });
          }
          if (field.type.kind === 'OBJECT') {
            newEdges.push({
              from: `${type.name}|${field.name}`,
              to: field.type.name,
              arrows: 'to',
            });
          }
          if (field.type.kind === 'NON_NULL') {
            let ofType = field.type.ofType;
            while (ofType.ofType) {
              ofType = ofType.ofType;
            }
            newEdges.push({
              from: `${type.name}|${field.name}`,
              to: `${ofType.name}`,
              arrows: 'to',
            });
          }
        });
      });
      return {
        ...prevState,
        graph: {
          ...prevState.graph,
          nodes: newNodes,
          edges: newEdges,
        },
      };
    }
    // reducer functionality for selecting a node
    case actionTypes.SELECTED_NODE: {
      let id;
      let type;
      let object;
      if (action.payload.length > 0) {
        // if the id contains a field; grabs the typeName it is contained with
        const types = _.cloneDeep(prevState.schema.data.__schema.types);
        if (action.payload[0].includes('|')) {
          id = action.payload[0].split('|');
          const typeName = id[0];
          type = 'field';
          id = id[1];
          for (let i = 0; i < types.length; i += 1) {
            if (types[i].name === typeName) object = types[i];
          }
        } else {
          // else we know payload contains a type node
          type = 'type';
          id = action.payload[0];
          for (let i = 0; i < types.length; i += 1) {
            if (types[i].name === id) object = types[i];
          }
        }
      } else {
        id = null;
        type = null;
        object = prevState.schema.data.__schema.types[0];
      }
      return {
        ...prevState,
        selectedNode: {
          ...prevState.selectedNode,
          id: id,
          type: type,
          typeObject: object,
        },
      };
    }
    // reducer functionality for clearing out the graph
    case actionTypes.CLEAR_GRAPH: {
      if (prevState.graph.nodes.length > 0 || prevState.graph.edges.length > 0) {
        return {
          ...prevState,
          graph: {
            ...prevState,
            nodes: [],
            edges: [],
          },
        };
      }
      return prevState;
    }
    // reducer functionality for adding a type
    case actionTypes.ADD_NODE: {
      if (action.payload) {
        const name = action.payload;
        const newNode = {
          kind: 'OBJECT',
          name: name,
          description: '',
          fields: [],
          inputFields: null,
          interfaces: [],
          enumValues: null,
          possibleTypes: null,
        };
        const types = _.cloneDeep(prevState.schema.data.__schema.types);
        types.push(newNode);
        return {
          ...prevState,
          schema: {
            ...prevState.schema,
            data: {
              ...prevState.schema.data,
              __schema: {
                ...prevState.schema.data.__schema,
                types: types,
              },
            },
          },
        };
      }
      return prevState;
    }
    // reducer functionality for deleting a type
    case actionTypes.DELETE_NODE: {
      const name = action.payload;
      const types = _.cloneDeep(prevState.schema.data.__schema.types);
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
          data: {
            ...prevState.schema.data,
            __schema: {
              ...prevState.schema.data.__schema,
              types: types,
            },
          },
        },
      };
    }
    // reducer functionality for adding a field
    case actionTypes.ADD_FIELD: {
      const fieldName = action.payload;
      const {
        nodeName,
        typeKind,
        typeName,
        ofTypeKind,
        ofTypeName,
      } = action;
      const newField = {
        name: fieldName,
        args: [],
        type: {
          kind: 'SCALAR',
          name: typeName,
          ofType: null,
        },
      };
      // if it is an object kind; we know it has an ofType
      if (typeKind === 'OBJECT') {
        newField.type = {
          kind: typeKind,
          name: ofTypeName,
          ofType: null,
        };
      }
      // if it is a list kind; we know it has an ofType
      if (typeKind === 'LIST') {
        newField.type = {
          kind: typeKind,
          name: null,
          ofType: {
            kind: ofTypeKind,
            name: ofTypeName,
            ofType: null,
          },
        }
      }
      const types = _.cloneDeep(prevState.schema.data.__schema.types);
      for (let i = 0; i < types.length; i += 1) {
        if (types[i].name === nodeName) {
          const copyField = types[i].fields;
          copyField.push(newField);
          types[i].fields = copyField;
          return {
            ...prevState,
            schema: {
              ...prevState.schema,
              data: {
                ...prevState.schema.data,
                __schema: {
                  ...prevState.schema.data.__schema,
                  types: types,
                },
              },
            },
          };
        }
      }
      return prevState;
    }
    // reducer functionality to delete field
    case actionTypes.DELETE_FIELD: {
      const { nodeName } = action;
      const fieldName = action.payload;
      const types = _.cloneDeep(prevState.schema.data.__schema.types);
      for (let i = 0; i < types.length; i += 1) {
        if (types[i].name === nodeName) {
          const copyField = types[i].fields;
          for (let j = 0; j < copyField.length; j += 1) {
            if (copyField[j].name === fieldName) {
              if (copyField[j].type.ofType) {
                return windows.alert('ERROR! APPARENT CONNECTION TO OTHER NODES!');
              }
              copyField.splice(j, 1);
              types[i].fields = copyField;
              return {
                ...prevState,
                schema: {
                  ...prevState.schema,
                  data: {
                    ...prevState.schema.data,
                    __schema: {
                      ...prevState.schema.data.__schema,
                      types: types,
                    },
                  },
                },
              };
            }
          }
        }
      }
      return prevState;
    }
    // reducer functionality for clearing the selection
    case actionTypes.CLEAR_SELECTION: {
      return {
        ...prevState,
        selectedNode: initialState.selectedNode,
      };
    }

    default:
      return prevState;
  }
};

export default rootReducer;

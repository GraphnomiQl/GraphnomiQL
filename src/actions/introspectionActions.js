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

// add a new type to introspection
export const addNode = (name) => {
  return {
    type: actionTypes.ADD_NODE,
    payload: name
  }
}

// delete a type from introspection
export const deleteNode = (name) => {
  return {
    type: actionTypes.DELETE_NODE,
    payload: name
  }
}

export const addField = (fieldName, nodeName, typeKind, typeName, ofTypeKind, ofTypeName) => {
  return {
    type: actionTypes.ADD_FIELD,
    payload: fieldName,
    nodeName: nodeName,
    typeKind: typeKind,
    typeName: typeName,
    ofTypeKind: ofTypeKind,
    ofTypeName: ofTypeName,
  }
}

export const deleteField = (fieldName, nodeName) => {
  return {
    type: actionTypes.DELETE_FIELD,
    payload: fieldName,
    nodeName: nodeName
  }
}

export const renderNode = () => {
  return {
    type: actionTypes.RENDER_NODE,
    
  }
}

export const clearGraph = () => {
  return {
    type: actionTypes.CLEAR_GRAPH,
  }
}

export const selectedNode = (id) => {
  return {
    type: actionTypes.SELECTED_NODE,
    payload: id,

  }
}

// export const filterTypes = (schema) => {
//   return {
//     type: actionTypes.FILTER_TYPES,
//     payload: schema,
//   };
// }


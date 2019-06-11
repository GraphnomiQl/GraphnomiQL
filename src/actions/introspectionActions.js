import * as actionTypes from '../constants/actionTypes.js';

// action for changing schema reducer
export const changeSchema = (introspection, text) => {
  return {
    type: actionTypes.CHANGE_SCHEMA,
    payload: introspection,
    text: text,
  };
};


// action for adding a type
export const addNode = (name) => {
  return {
    type: actionTypes.ADD_NODE,
    payload: name,
  };
};

// action for deleting a type
export const deleteNode = (name) => {
  return {
    type: actionTypes.DELETE_NODE,
    payload: name,
  };
};

// action for adding a field
export const addField = (fieldName, nodeName, typeKind, typeName, ofTypeKind, ofTypeName) => {
  return {
    type: actionTypes.ADD_FIELD,
    payload: fieldName,
    nodeName: nodeName,
    typeKind: typeKind,
    typeName: typeName,
    ofTypeKind: ofTypeKind,
    ofTypeName: ofTypeName,
  };
};

// action for deleting a field
export const deleteField = (fieldName, nodeName) => {
  return {
    type: actionTypes.DELETE_FIELD,
    payload: fieldName,
    nodeName: nodeName,
  };
};

// action for rendering node
export const renderNode = () => {
  return {
    type: actionTypes.RENDER_NODE,
  };
};

// action for clearing the graph
export const clearGraph = () => {
  return {
    type: actionTypes.CLEAR_GRAPH,
  };
};

// action for selecting a type or field
export const selectedNode = (id) => {
  return {
    type: actionTypes.SELECTED_NODE,
    payload: id,
  };
};

// this file contains all action types for the application

// changing schemas under introspectionActions.js (WORKS ALONG WITH SVG RENDERING COMPLETED)
export const CHANGE_SCHEMA = 'CHANGE_SCHEMA';
// allows user to add a new type to introspection
export const ADD_NODE = 'ADD_NODE';
// allows user to delete a type from existing introspection
export const DELETE_NODE = 'DELETE_NODE';
// allows user to add a field to an existing type
export const ADD_FIELD = 'ADD_FIELD';
// allows user to delete a field from a type
export const DELETE_FIELD = 'DELETE_FIELD';
// renders nodes on the screen
export const RENDER_NODE = 'RENDER_NODE';
// lets components render when node is created/deleted;
export const CLEAR_GRAPH = 'CLEAR_GRAPH';
// selects nodes to display the current type structure
export const SELECTED_NODE = 'SELECTED_NODE';
// clears the selection of a node
export const CLEAR_SELECTION = 'CLEAR_SELECTION';

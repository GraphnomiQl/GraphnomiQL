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
// allows zooming in on an node or edge
export const FOCUS_ELEMENT = 'FOCUS_ELEMENT';
// completes focusing on node or edge
export const FOCUS_ELEMENT_DONE = 'FOCUS_ELEMENT_DONE';
// renders svg string and complete the schemaView (WORKS ALONG WITH CHANGE_SCHEMA)
export const SVG_RENDERING_COMPLETED = 'SVG_RENDERING_COMPLETED';
// clears selection of a node, field, or edge
export const CLEAR_SELECTION = 'CLEAR_SELECTION';
// reporting any errors that come up
export const REPORT_ERROR = 'REPORT_ERROR';
// clears up error (unsure what it still does)
export const CLEAR_ERROR = 'CLEAR_ERROR';
// renders nodes on the screen
export const RENDER_NODE = 'RENDER_NODE';
// lets components render when new node is created;
export const CLEAR_GRAPH = 'CLEAR_GRAPH';
// selects nodes and give you the ability to add or delete them
export const SELECTED_NODE = 'SELECTED_NODE';

// action type for changing schemas under introspectionActions.js (WORKS ALONG WITH SVG RENDERING COMPLETED)
export const CHANGE_SCHEMA = 'CHANGE_SCHEMA';
// action type that allows user to add a new type to introspection
export const ADD_NODE = 'ADD_NODE';
// action type that allows user to delete a type from existing introspection
export const DELETE_NODE = 'DELETE_NODE';
// action type that allows user to add a field to an existing type
export const ADD_FIELD = 'ADD_FIELD';
// action type that allows user to delete a field from a type
export const DELETE_FIELD = 'DELETE_FIELD';
// action type that focuses in on one schema table
export const SELECT_NODE = 'SELECT_NODE';
// action type that focuses on an edge relationship between a field and a node table
export const SELECT_EDGE = 'SELECT_EDGE';
// action type that allows zooming in on an node or edge
export const FOCUS_ELEMENT = 'FOCUS_ELEMENT';
// action type that completes focusing on node or edge
export const FOCUS_ELEMENT_DONE = 'FOCUS_ELEMENT_DONE';
// action type that renders svg string and complete the schemaView (WORKS ALONG WITH CHANGE_SCHEMA)
export const SVG_RENDERING_COMPLETED = 'SVG_RENDERING_COMPLETED';
// action type that clears selection of a node, field, or edge
export const CLEAR_SELECTION = 'CLEAR_SELECTION';
// action type for reporting any errors that come up
export const REPORT_ERROR = 'REPORT_ERROR';
// action type that clears up error (unsure what it still does)
export const CLEAR_ERROR = 'CLEAR_ERROR';

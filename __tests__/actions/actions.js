// import configureStore from 'redux-mock-store';

// // Actions to be tested
// import * as actions from '../../src/actions/introspectionActions';
// import * as actionTypes from '../../src/constants/actionTypes';

// const mockStore = configureStore();
// const store = mockStore();

// // You would import the action from your codebase in a real scenario
// // const changeSchema = () => ({ type: 'CHANGE_SCHEMA' })

// const schema = {
//   "data": {
//     "__schema": {
//       "queryType": {
//         "name": "Query"
//       },
//       "mutationType": null,
//       "subscriptionType": null,
//       "types": [
//         {
//           "kind": "OBJECT",
//           "name": "Query",
//           "description": null,
//           "fields": [
//             {
//               "name": "business",
//               "description": null,
//               "args": [],
//               "type": {
//                 "kind": "OBJECT",
//                 "name": "Business",
//                 "ofType": null
//               },
//               "isDeprecated": false,
//               "deprecationReason": null
//             },
//             {
//               "name": "reviews",
//               "description": null,
//               "args": [],
//               "type": {
//                 "kind": "OBJECT",
//                 "name": "Reviews",
//                 "ofType": null
//               },
//               "isDeprecated": false,
//               "deprecationReason": null
//             },
//           ]
//         }
//       ]
//   }
//  }
// }          




// const changeSchema = () => ({actionTypes: 'CHANGE_SCHEMA'})

// describe('changeSchema', () => {
//   test('Dispatches the correct action and payload', () => {
//     const introspection
//     const expectedActions = [
//       {
//         'payload': schema,
//       }
//     ]
//   })

// })


// it('should dispatch action', () => {

//   // Initialize mockstore with empty state
//   const initialState = {}
//   const store = mockStore(initialState)

//   // Dispatch the action
//   store.dispatch(changeSchema())

//   // Test if your store dispatched the expected actions
//   const actions = store.getActions()
//   const expectedPayload = { actionTypes: 'CHANGE_SCHEMA' }
//   expect(actions).toEqual([expectedPayload])
// })
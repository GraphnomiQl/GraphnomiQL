var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const fs = require("fs");
const path = require("path");

// Construct a schema, using GraphQL schema language
// var schema = buildSchema(graphSchemaObj);

// create graphSchemaObj 
var graphSchemaObj = fs.readFileSync(path.join(__dirname, "newSchema.js"), "utf8");
// console.log(graphSchemaObj);
// var graphSchemaObj = fs.readFileSync("shopifySchemaObj.js", "utf8");
// var graphSchemaObj = fs.readFileSync("starwarsSchemaObj.js", "utf8");
var schema = buildSchema(graphSchemaObj);

// var app = express();
// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// }));




//test 
// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

// var root = {
//   hello: () => {
//     return 'Hello world!';
//   },
// };

var app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4001, () => {console.log('Running a GraphQL API server at localhost:4001/graphql');});
// console.log('Running a GraphQL API server at localhost:4000/graphql');
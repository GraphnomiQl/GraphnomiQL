const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const fs = require('fs');
const path = require('path');

const graphSchemaObj = fs.readFileSync(path.join(__dirname, 'newSchema.js'), 'utf8');
const schema = buildSchema(graphSchemaObj);

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4001, () => { console.log('Running a GraphQL API server at localhost:4001/graphql'); });

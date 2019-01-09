// const { buildClientSchema, printSchema, buildSchema } = require("graphql");
// const fs = require("fs");
// const path = require("path")

// const exportCode = (schema) => {
// //   let introspectionSchemaResult = JSON.parse(fs.readFileSync(path.join(__dirname,"./presets/yelpIntrospection.json"), (err, data) => console.log(data)));
// console.log("hello memememe", schema)
// //   // var introspectionSchemaResult = JSON.parse(fs.readFileSync("shopifyIntrospection.json", "utf8", (err, data) => console.log(data)));
  
// //   // var introspectionSchemaResult = JSON.parse(fs.readFileSync("starwarsIntrospection.json", "utf8", (err, data) => console.log(data)));
//   schema = schema.data;
//   const graphqlSchemaObj = printSchema(buildClientSchema(schema));
//   console.log(graphqlSchemaObj);
  
//   // var jsonStr = JSON.stringify(graphqlSchemaObj);
  
//   fs.writeFileSync('newSchema.js', graphqlSchemaObj);
//   // fs.writeFileSync('newShopify.json', graphqlSchemaObj);
//   // fs.writeFileSync('newStarwars.js', graphqlSchemaObj);
  
  
//   // const sdlSchema = `${JSON.parse(fs.readFileSync("newYelp.js", "utf8"))}`
//   // const schemaObj = buildSchema(sdlSchema);
//   // console.log(schemaObj);
// }

// export default exportCode;
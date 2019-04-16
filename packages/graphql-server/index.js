require('dotenv').config({ debug: process.env.DEBUG });

const { ApolloServer } = require('apollo-server');
const schemaModules = require('./src/schema');
const directives = require('./src/schema/directives');

const server = new ApolloServer({
  schema: schemaModules.schema,
  schemaDirectives: directives,
  context: schemaModules.context,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

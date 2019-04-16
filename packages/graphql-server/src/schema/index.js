const { GraphQLModule } = require('@graphql-modules/core');
const {
  loadResolversFiles,
  loadSchemaFiles,
} = require('@graphql-modules/sonar');
const jwt = require('jsonwebtoken');
const { prisma } = require('../../prisma-client');

const getUser = token => {
  try {
    if (token) {
      return jwt.verify(token, process.env.SECRET_JWT);
    }
    return null;
  } catch (err) {
    return null;
  }
};

module.exports = new GraphQLModule({
  name: 'app',
  typeDefs: loadSchemaFiles(`${__dirname}/types/`),
  resolvers: loadResolversFiles(`${__dirname}/resolvers/`),
  context: ({ req }) => {
    const tokenWithBearer = req.headers.authorization || '';
    const token = tokenWithBearer.split(' ')[1];
    const user = getUser(token);

    return {
      user,
      prisma,
    };
  },
});

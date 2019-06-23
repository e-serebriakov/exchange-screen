const { ApolloServer } = require('apollo-server');

const logger = require('./utils/logger');
const resolvers = require('./resolvers');
const schema = require('./schema');

const server = new ApolloServer({
  resolvers,
  typeDefs: schema,
});

server.listen().then(({ url }) => {
  logger.info(`Apollo Server on ${url}`);
});

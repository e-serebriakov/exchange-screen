const { gql } = require('apollo-server');

const currencySchema = require('./currency');
const pocketSchema = require('./pocket');
const rateSchema = require('./rate');

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

module.exports = [linkSchema, currencySchema, pocketSchema, rateSchema];

const { gql } = require('apollo-server');

module.exports = gql`
  type Rate {
    currency: String!
    rate: Float!
  }

  type Rates {
    base: String!
    rates: [Rate!]!
  }

  extend type Query {
    rates(base: String!): Rates
  }
`;

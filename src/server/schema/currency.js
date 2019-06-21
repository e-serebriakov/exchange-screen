const { gql } = require('apollo-server');

module.exports = gql`
  type Currency {
    sign: String!
    code: String!
  }

  extend type Query {
    currencyList: [Currency!]!
  }
`;

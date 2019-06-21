const { gql } = require('apollo-server');

module.exports = gql`
  type Pocket {
    label: String!
    currency: String!
    balance: Float!
  }

  input ExchangeInput {
    currencyFrom: String!
    currencyTo: String!
    amount: Float!
    rate: Float!
  }

  extend type Query {
    pocketList: [Pocket!]!
  }

  extend type Mutation {
    exchange(params: ExchangeInput): [Pocket!]!
  }
`;

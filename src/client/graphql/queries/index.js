import { gql } from 'apollo-boost';

const GET_CURRENCY_LIST = gql`
  {
    currencyList {
      code
      sign
    }
  }
`;

const GET_POCKET_LIST = gql`
  {
    pocketList {
      currency
      label
      balance
    }
  }
`;

const GET_EXCHANGE_RATES = gql`
  query rates($base: String!) {
    rates(base: $base) {
      base
      rates {
        currency
        rate
      }
    }
  }
`;

export default {
  GET_CURRENCY_LIST,
  GET_POCKET_LIST,
  GET_EXCHANGE_RATES,
};

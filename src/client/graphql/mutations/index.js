import { gql } from 'apollo-boost';

const EXCHANGE = gql`
  mutation exchange($params: ExchangeInput!) {
    exchange(params: $params) {
      label
      currency
      balance
    }
  }
`;

export default {
  EXCHANGE,
};

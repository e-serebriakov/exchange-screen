import { graphql } from 'react-apollo';

import queries from '../queries';

export default graphql(queries.GET_CURRENCY_LIST, {
  name: 'currencyListQuery',
});

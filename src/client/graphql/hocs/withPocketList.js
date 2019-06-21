import { graphql } from 'react-apollo';

import queries from '../queries';

export default graphql(queries.GET_POCKET_LIST, {
  name: 'pocketListQuery',
});

import React from 'react';
import { graphql, compose } from 'react-apollo';
import { List } from 'antd';

import matchCurrencySign from '../../utils/matchCurrencySign';
import queries from '../../graphql/queries';
import './PocketsInfo.less';

const processBalance = (amount) => (amount / 100).toFixed(2);

const PocketsInfo = ({ pocketList, currencyListQuery }) => {
  return (
    <List
      className="pocketListInfo"
      itemLayout="horizontal"
      dataSource={pocketList}
      renderItem={({ currency, balance }) => {
        const currencySign = matchCurrencySign(currencyListQuery.currencyList, currency);

        return (
          <List.Item key={currency} className="pocketListInfo__item">
            <List.Item.Meta
              title={currency}
            />
            <div>
              {`${currencySign} ${processBalance(balance)}`}
            </div>
          </List.Item>
        );
      }}
    />
  );
};

export default compose(
  graphql(queries.GET_CURRENCY_LIST, {
    name: 'currencyListQuery',
  }),
)(PocketsInfo);

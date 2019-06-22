import React from 'react';

import { List } from 'antd';

import matchCurrencySign from '../../utils/matchCurrencySign';
import { withCurrencyList } from '../../graphql/hocs';
import './PocketsInfo.less';

const processBalance = (amount) => (amount / 100).toFixed(2);

const PocketsInfo = ({ pocketList, currencyListQuery }) => {
  return (
    <div className="pocketListInfo">
      <p className="pocketListInfo__title">Your pockets</p>
      <List
        itemLayout="horizontal"
        dataSource={pocketList}
        renderItem={({ currency, balance }) => {
          const currencySign = matchCurrencySign(currencyListQuery.currencyList, currency);

          return (
            <List.Item key={currency} className="pocketListInfo__item">
              <List.Item.Meta title={currency} />
              <div>{`${currencySign} ${processBalance(balance)}`}</div>
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default withCurrencyList(PocketsInfo);

// @flow

import React, { memo } from 'react';
import { compose } from 'react-apollo';
import { List } from 'antd';

import type { CurrencyData } from '../../../types/currencyTypes';
import type { PocketData } from '../../../types/pocketTypes';
import matchCurrencySign from '../../utils/matchCurrencySign';
import { withCurrencyList } from '../../graphql/hocs';
import './PocketsInfo.less';

type Props = {
  pocketList: PocketData[],
  currencyListQuery: {
    currencyList: CurrencyData[],
  },
}

const processBalance = (amount: number): string => (amount / 100).toFixed(2);

const PocketsInfo = ({ pocketList, currencyListQuery }: Props) => {
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

export default compose(
  memo,
  withCurrencyList,
)(PocketsInfo);

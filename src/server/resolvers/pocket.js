// @flow

import type { PocketData } from '../../types/pocketTypes';
import type { CurrencyCode } from '../../types/currencyTypes';
import * as pocketStorage from '../storage/pocket/pocket';

type ExchangeParams = {
  rate: number,
  amount: number,
  currencyTo: CurrencyCode,
  currencyFrom: CurrencyCode,
};

const resolvers = {
  Query: {
    pocketList: (): PocketData[] => pocketStorage.getPocketList(),
  },
  Mutation: {
    exchange: (parent: any, options: { params: ExchangeParams }): PocketData[] => {
      const params = options.params;

      const {
        currencyFrom, currencyTo, amount, rate,
      } = params;
      const pocketFrom = pocketStorage.getCurrencyPocket(currencyFrom);
      const pocketTo = pocketStorage.getCurrencyPocket(currencyTo);

      pocketStorage.updatePocket(currencyFrom, {
        balance: pocketFrom.balance - amount,
      });
      pocketStorage.updatePocket(currencyTo, {
        balance: parseFloat((pocketTo.balance + amount * rate).toFixed(2)),
      });

      return pocketStorage.getPocketList();
    },
  },
};

module.exports = resolvers;

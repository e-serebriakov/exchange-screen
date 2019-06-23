// @flow

import * as currencyStorage from '../storage/currency/currency';
import type { CurrencyData } from '../../types/currencyTypes';

const resolvers = {
  Query: {
    currencyList: (): CurrencyData[] => currencyStorage.getCurrencyList(),
  },
};

module.exports = resolvers;

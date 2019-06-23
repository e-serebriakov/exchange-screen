// @flow

import ExchangeAPIProvider from '../providers/ExchangeAPIProvider/ExchangeAPIProvider';
import * as ratesStorage from '../storage/rate/rate';
import type { CurrencyCode } from '../../types/currencyTypes';
import type { Rates } from '../../types/rateTypes';

const resolvers = {
  Query: {
    rates: async (parent: any, { base }: { base: CurrencyCode }): Rates => {
      const provider = ExchangeAPIProvider.getInstance();

      let res = null;

      try {
        res = await provider.loadRates(base);
        ratesStorage.updateRatesForCurrency(base, res);
      } catch (e) {
        res = ratesStorage.getRatesForCurrency(base);
      }

      return res;
    },
  },
};

module.exports = resolvers;

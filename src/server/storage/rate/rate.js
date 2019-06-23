// @flow

import type { CurrencyCode } from '../../../types/currencyTypes';

const storage = {};

export const getRatesForCurrency = (currency: CurrencyCode) => {
  return storage[currency] || {};
};

export const updateRatesForCurrency = (currency: CurrencyCode, rates: Object) => {
  storage[currency] = rates;

  return storage[currency];
};

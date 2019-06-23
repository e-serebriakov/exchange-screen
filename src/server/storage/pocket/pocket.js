// @flow

import type { CurrencyCode } from '../../../types/currencyTypes';
import type { PocketData } from '../../../types/pocketTypes';

const pockets = {
  USD: {
    label: 'American dollars',
    currency: 'USD',
    balance: 10000,
  },
  EUR: {
    label: 'Euros',
    currency: 'EUR',
    balance: 12500,
  },
  GBP: {
    label: 'British pounds',
    currency: 'GBP',
    balance: 15000,
  },
  RUB: {
    label: 'Russian rubles',
    currency: 'RUB',
    balance: 150000,
  },
};

const sortPocketList = (a: PocketData, b: PocketData): any => a.currency > b.currency;

export const getPocketList = (): PocketData[] => Object.values(pockets).sort(sortPocketList);

export const getCurrencyPocket = (currency: CurrencyCode): PocketData => pockets[currency];

export const updatePocket = (currency: CurrencyCode, updates: PocketData) => {
  const pocketData = { ...pockets[currency] };

  pockets[currency] = {
    ...pocketData,
    ...updates,
  };

  return pockets[currency];
};

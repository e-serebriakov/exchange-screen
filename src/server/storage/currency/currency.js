import type { CurrencyCode, CurrencyData } from '../../../types/currencyTypes';

const storage = {
  USD: {
    sign: '$',
    code: 'USD',
  },
  EUR: {
    sign: '€',
    code: 'EUR',
  },
  GBP: {
    sign: '£',
    code: 'GBP',
  },
  RUB: {
    sign: '₽',
    code: 'RUB',
  },
};

export const getCurrencyData = (code: CurrencyCode): CurrencyData => storage[code] || {};

export const getCurrencyList = (): CurrencyData[] => Object.values(storage);

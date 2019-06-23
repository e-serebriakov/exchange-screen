import { CurrencyCode } from './currencyTypes';

export type RateData = {
  currency: CurrencyCode,
  rate: Number,
};

export type Rates = {
  base: CurrencyCode,
  rates: RateData[],
};

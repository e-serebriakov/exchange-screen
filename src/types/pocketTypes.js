import type { CurrencyCode } from './currencyTypes';

export type PocketData = {|
  label: string;
  currency: CurrencyCode,
  balance: number,
|};

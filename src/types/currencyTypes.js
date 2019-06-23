// @flow

export type CurrencyCode = 'USD' | 'EUR' | 'RUB' | 'GBP';

export type CurrencySign = '$' | '£' | '€' | '₽';

export type CurrencyData = {|
  sign: CurrencySign,
  code: CurrencyCode,
|};

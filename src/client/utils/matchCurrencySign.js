// @flow

import type { CurrencyCode, CurrencyData, CurrencySign } from '../../types/currencyTypes';

function matchedCurrencySign(
  currencyList: CurrencyData[] = [],
  currencyCode: CurrencyCode,
): CurrencySign {
  const matchedCurrency = currencyList.find(({ code }) => code === currencyCode);

  if (matchedCurrency !== undefined) {
    return matchedCurrency.sign;
  }

  return currencyList[0].sign;
}

export default matchedCurrencySign;

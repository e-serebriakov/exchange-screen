

export default (currencyList, currencyCode) => {
  const matchedCurrency = currencyList.find(({ code }) => code === currencyCode);

  if (matchedCurrency !== undefined) {
    return matchedCurrency.sign;
  }

  return null;
};

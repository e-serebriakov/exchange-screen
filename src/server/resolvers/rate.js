const fetch = require('node-fetch');

const { currencies } = require('../data');

const storage = {};

const buildUrl = (base, currenciesMap) => {
  const currencySymbols = Object.keys(currenciesMap);

  return `${process.env.RATES_SOURCE_URL}?base=${base}&symbols=${currencySymbols.join(',')}`;
};

const processData = (data) => {
  const {
    base,
    rates,
  } = data;

  return {
    base,
    rates: Object.entries(rates).map(([currency, rate]) => ({
      rate: rate.toFixed(5),
      currency,
    })),
  };
};

const resolvers = {
  Query: {
    rates: async (parent, { base }) => {
      const {
        [base]: baseCurrency,
        ...currenciesMap
      } = currencies;

      const response = await fetch(buildUrl(base, currenciesMap));
      const data = await response.json();

      if (data.error !== undefined) {
        return storage[base];
      }

      if (data.error === undefined) {
        storage[base] = processData(data);
      }

      const rates = processData(data);

      return rates;
    },
  },
};

module.exports = resolvers;

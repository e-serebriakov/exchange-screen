const { currencies } = require('../data');

const resolvers = {
  Query: {
    currencyList: () => Object.values(currencies),
  },
};

module.exports = resolvers;

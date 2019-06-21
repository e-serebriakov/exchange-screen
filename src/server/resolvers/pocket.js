let { pockets } = require('../data');

const prepreDataForResponse = (pocketsData) => {
  return Object.values(pocketsData).sort((a, b) => a.currency > b.currency);
};

const resolvers = {
  Query: {
    pocketList: () => prepreDataForResponse(pockets),
  },
  Mutation: {
    exchange: (parent, { params }) => {
      const {
        currencyFrom, currencyTo, amount, rate,
      } = params;
      const {
        [currencyFrom]: pocketFrom,
        [currencyTo]: pocketTo,
        ...restPockets
      } = pockets;

      pockets = {
        ...restPockets,
        [currencyFrom]: {
          ...pocketFrom,
          balance: pocketFrom.balance - amount,
        },
        [currencyTo]: {
          ...pocketTo,
          balance: parseFloat((pocketTo.balance + amount * rate).toFixed(2)),
        },
      };

      return prepreDataForResponse(pockets);
    },
  },
};

module.exports = resolvers;

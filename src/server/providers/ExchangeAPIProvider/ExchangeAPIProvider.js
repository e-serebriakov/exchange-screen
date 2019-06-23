// @flow

import type { Rates } from '../../../types/rateTypes';
import type { CurrencyCode } from '../../../types/currencyTypes';
import logger from '../../utils/logger';
import * as currencyStorage from '../../storage/currency/currency';
import Provider from '../Provider';

type URI = string;
type Method = 'GET' | 'POST';
type Params = Object;

type RequestParams = {
  uri: URI,
  method: Method,
  params: Params,
};

type Response = {
  rates: {
    [CurrencyCode]: number
  },
};

class ExchangeAPIProvider extends Provider {
  static instance = null;

  static providerName = 'ExchangeAPI';

  static getInstance = function getInstance(): ExchangeAPIProvider {
    if (ExchangeAPIProvider.instance === null) {
      ExchangeAPIProvider.instance = new ExchangeAPIProvider();
    }

    return ExchangeAPIProvider.instance;
  };

  apiUrl: string;

  name: string;

  constructor() {
    super();

    this.name = ExchangeAPIProvider.providerName;
    this.apiUrl = 'https://api.exchangeratesapi.io';
  }

  getRequestOptions(uri: URI, method: Method = 'GET', params: Params) {
    const options = {
      method,
      uri: `${this.apiUrl}${uri}`,
      ...params,
    };

    return options;
  }

  async request({ uri, method, params = {} }: RequestParams) {
    return new Promise((resolve, reject) => {
      const options = this.getRequestOptions(uri, method, params);

      this.doRequest(options, (error, response, responseBody) => {
        if (error) {
          reject(error);
          return;
        }

        const errorLog = {
          type: 'ProviderError',
          payload: {
            request: this.getRequestLog(options),
            responseBody,
          },
        };

        let jsonBody;
        try {
          jsonBody = JSON.parse(responseBody);
        } catch (err) {
          logger.error({
            ...errorLog,
            stack: err.stack,
          });
          reject(err);
          return;
        }

        if (jsonBody.code !== undefined) {
          logger.error(errorLog);
          reject(new Error(JSON.stringify(errorLog)));
          return;
        }

        resolve(jsonBody);
      });
    });
  }

  formatRates(base: CurrencyCode, rates: Response) {
    const entries: any = Object.entries(rates.rates);

    return {
      base,
      rates: entries.map(([currency, rate]) => ({
        rate,
        currency,
      })),
    };
  }

  async loadRates(base: CurrencyCode): Rates {
    const symbols = currencyStorage.getCurrencyList()
      .filter(({ code }) => code !== base)
      .map(({ code }) => code)
      .join(',');

    const rates = await this.request({
      method: 'GET',
      uri: '/latest',
      params: {
        qs: {
          base,
          symbols,
        },
      },
    });

    return this.formatRates(base, rates);
  }
}

module.exports = ExchangeAPIProvider;

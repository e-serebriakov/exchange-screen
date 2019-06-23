// @flow

import request from 'request';

import type { CurrencyCode } from '../../types/currencyTypes';
import logger from '../utils/logger';

type RequestOptions = {
  method: 'GET' | 'POST',
  uri: string,
};

class Provider {
  name = '';

  getRequestLog(requestOptions: RequestOptions): string {
    return `${this.name}/${requestOptions.method}:${requestOptions.uri}`;
  }

  doRequest(options: RequestOptions, callback: Function): void {
    const providerName = this.name;
    const requestStartTime = Date.now();

    request(options, (error, response, responseBody) => {
      const requestTime = Date.now() - requestStartTime;

      logger.debug(`${providerName}/${options.method}:${options.uri}`, `${requestTime / 1000}s`);

      if (error) {
        logger.error({
          type: 'Provider request error',
          payload: {
            requestMeta: `${providerName}/${options.method}:${options.uri}`,
            responseBody,
          },
        });
      }

      callback(error, response, responseBody);
    });
  }

  // eslint-disable-next-line no-unused-vars
  async loadRates(base: CurrencyCode) {
    logger.debug('Implement Provider.loadBalance');
  }
}

module.exports = Provider;

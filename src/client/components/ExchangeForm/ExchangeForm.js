// @flow

import React, { Component } from 'react';
import { Query, graphql, compose } from 'react-apollo';
import {
  Form, Row, Col, Button, Icon, notification,
} from 'antd';

import type { CurrencyCode, CurrencyData } from '../../../types/currencyTypes';
import type { PocketData } from '../../../types/pocketTypes';
import type { RateData } from '../../../types/rateTypes';
import matchCurrencySign from '../../utils/matchCurrencySign';
import mutations from '../../graphql/mutations';
import queries from '../../graphql/queries';
import { withCurrencyList, withPocketList } from '../../graphql/hocs';
import NumericInput from '../NumericInput/NumericInput';
import CurrencySelect from '../CurrencySelect/CurrencySelect';
import './ExchangeForm.less';

type Props = {
  exchangeMutation: Function,
  currencyListQuery: {
    currencyList: CurrencyData[],
  },
  pocketListQuery: {
    pocketList: PocketData[],
  },
};

type State = {
  amount: number,
  changedCurrency: CurrencyCode,
  currencyFrom: CurrencyCode,
  currencyTo: CurrencyCode,
}

class ExchangeForm extends Component<Props, State> {
  static RATES_POLL_INTERVAL = 10 * 1000;

  state = {
    amount: 0,
    changedCurrency: 'USD',
    currencyFrom: 'USD',
    currencyTo: 'RUB',
  };

  calculateCurrenciesAmount(rates: RateData[]) {
    const {
      amount, changedCurrency, currencyFrom, currencyTo,
    } = this.state;

    const toCurrencyRate = rates.find(({ currency }) => currency === currencyTo) || {};
    const rate = toCurrencyRate.rate || null;

    const currencyFromAmount = changedCurrency === currencyFrom ? amount : (amount / rate);
    const currencyToAmount = changedCurrency === currencyTo ? amount : (amount * rate);

    return {
      rate,
      currencyFromAmount,
      currencyToAmount,
    };
  }

  calculateExchangeAmount(rate: number): number {
    const {
      amount,
      currencyTo,
      changedCurrency,
    } = this.state;

    if (changedCurrency === currencyTo) {
      return amount / rate * 100;
    }

    return amount * 100;
  }

  handleSubmit = (rate: number) => (event: SyntheticEvent<HTMLButtonElement>): void => {
    const {
      currencyFrom,
      currencyTo,
    } = this.state;

    event.preventDefault();

    this.props.exchangeMutation({
      variables: {
        params: {
          rate,
          amount: this.calculateExchangeAmount(rate),
          currencyFrom,
          currencyTo,
        },
      },
    });
  }

  handleAmountChange = (currency: CurrencyCode) => (value: number): void => {
    this.setState({
      changedCurrency: currency,
      amount: value,
    });
  }

  handleCurrencyChange = (type: 'currencyFrom' | 'currencyTo') => (currency: CurrencyCode) => {
    this.setState({
      [type]: currency,
    });
  };

  handleCurrencyFromChange = this.handleCurrencyChange('currencyFrom');

  handleCurrencyToChange = this.handleCurrencyChange('currencyTo');

  getCurrencyPocketBalance(currency: CurrencyCode): number {
    const { pocketListQuery } = this.props;

    const pocketList = pocketListQuery.pocketList;
    const currencyPocket = pocketList.find((pocket) => pocket.currency === currency) || {};

    if (currencyPocket.balance !== undefined) {
      return currencyPocket.balance / 100;
    }

    return 0;
  }

  calculateCurrencyMaxAmounts(rate: number): { currencyFromMaxAmount: number, currencyToMaxAmount: number } {
    const {
      currencyFrom, currencyTo,
    } = this.state;

    const currencyFromBalance = this.getCurrencyPocketBalance(currencyFrom);
    const currencyToBalance = this.getCurrencyPocketBalance(currencyTo);

    const currencyFromMaxAmount = currencyFromBalance;
    const currencyToMaxAmount = Math.min(currencyToBalance, currencyFromBalance * rate);

    return {
      currencyFromMaxAmount,
      currencyToMaxAmount,
    };
  }

  render() {
    const { currencyListQuery } = this.props;
    const {
      amount, currencyFrom, currencyTo,
    } = this.state;

    return (
      <Query
        query={queries.GET_EXCHANGE_RATES}
        variables={{ base: currencyFrom }}
        pollInterval={ExchangeForm.RATES_POLL_INTERVAL}
      >
        {({ loading, data }) => {
          const {
            rates: {
              rates = [],
            } = {},
          } = data;

          const {
            rate,
            currencyFromAmount,
            currencyToAmount,
          } = this.calculateCurrenciesAmount(rates);

          const currencyFromSign = matchCurrencySign(currencyListQuery.currencyList, currencyFrom);
          const currencyToSign = matchCurrencySign(currencyListQuery.currencyList, currencyTo);

          const isExchangeDisabled = loading || amount === 0;

          const {
            currencyFromMaxAmount,
            currencyToMaxAmount,
          } = this.calculateCurrencyMaxAmounts(rate);

          return (
            <Form
              onSubmit={this.handleSubmit(rate)}
              className="exchangeForm"
            >
              <Row gutter={24}>
                <Col span={24} style={{ textAlign: 'center' }}>
                  <p className="exchangeForm__rate">
                    {rate && `${currencyFromSign}1 = ${currencyToSign}${rate}`}
                  </p>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={11}>
                  <Form.Item>
                    <CurrencySelect
                      value={currencyFrom}
                      onChange={this.handleCurrencyFromChange}
                      excluded={currencyTo}
                    />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Form.Item style={{ textAlign: 'center' }}>
                    <Icon type="arrow-right" />
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item>
                    <CurrencySelect
                      value={currencyTo}
                      onChange={this.handleCurrencyToChange}
                      excluded={currencyFrom}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={11}>
                  <Form.Item>
                    <NumericInput
                      max={currencyFromMaxAmount}
                      value={currencyFromAmount}
                      currency={currencyFrom}
                      onChange={this.handleAmountChange(currencyFrom)}
                    />
                  </Form.Item>
                </Col>
                <Col span={2} />
                <Col span={11}>
                  <Form.Item>
                    <NumericInput
                      max={currencyToMaxAmount}
                      value={currencyToAmount}
                      currency={currencyTo}
                      onChange={this.handleAmountChange(currencyTo)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24} style={{ textAlign: 'center' }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={isExchangeDisabled}
                  >
                    exchange
                  </Button>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Query>
    );
  }
}

export default compose(
  graphql(mutations.EXCHANGE, {
    name: 'exchangeMutation',
    options: {
      update: (proxy, { data: { exchange } }) => {
        notification.success({
          message: 'Exchange is successfully completed',
          duration: 2,
        });

        proxy.writeQuery({ query: queries.GET_POCKET_LIST, data: { pocketList: exchange } });
      },
    },
  }),
  withPocketList,
  withCurrencyList,
)(ExchangeForm);

import React, { Component } from 'react';
import { Query, graphql, compose } from 'react-apollo';
import {
  Form, Row, Col, Button, Icon, notification,
} from 'antd';

import matchCurrencySign from '../../utils/matchCurrencySign';
import mutations from '../../graphql/mutations';
import queries from '../../graphql/queries';
import { withCurrencyList } from '../../graphql/hocs';
import NumericInput from '../NumericInput/NumericInput';
import CurrencySelect from '../CurrencySelect/CurrencySelect';
import './ExchangeForm.less';

class ExchangeForm extends Component {
  state = {
    amount: 0,
    changedCurrency: 'USD',
    currencyFrom: 'USD',
    currencyTo: 'RUB',
  };

  calculateCurrenciesAmount(rates) {
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

  handleSubmit = (rate) => (event) => {
    const {
      amount,
      currencyFrom,
      currencyTo,
    } = this.state;

    event.preventDefault();

    this.props.exchangeMutation({
      variables: {
        params: {
          rate,
          amount: amount * 100,
          currencyFrom,
          currencyTo,
        },
      },
    });
  }

  handleAmountChange = (currency) => (value) => {
    this.setState({
      changedCurrency: currency,
      amount: value,
    });
  }

  handleCurrencyChange = (type) => (currency) => {
    this.setState({
      [type]: currency,
    });
  };

  handleCurrencyFromChange = this.handleCurrencyChange('currencyFrom');

  handleCurrencyToChange = this.handleCurrencyChange('currencyTo');

  render() {
    const { currencyListQuery } = this.props;
    const {
      amount, currencyFrom, currencyTo,
    } = this.state;

    return (
      <Query
        query={queries.GET_EXCHANGE_RATES}
        variables={{ base: currencyFrom }}
        pollInterval={1000 * 10}
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
  withCurrencyList,
)(ExchangeForm);

import React, { Component } from 'react';
import {
  Form, Row, Col, Button, Icon,
} from 'antd';

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

  rate = 1.25;

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('handleSubmit event', event);
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
    const {
      amount, changedCurrency, currencyFrom, currencyTo,
    } = this.state;

    const currencyFromAmount = changedCurrency === currencyFrom ? amount : (amount * this.rate);
    const currencyToAmount = changedCurrency === currencyTo ? amount : (amount / this.rate);

    return (
      <Form
        onSubmit={this.handleSubmit}
        className="exchangeForm"
      >
        <Row gutter={24}>
          <Col span={11}>
            <Form.Item>
              <CurrencySelect
                value={currencyFrom}
                onChange={this.handleCurrencyFromChange}
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
          <Col span={2}>
            <Form.Item>
            </Form.Item>
          </Col>
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
            <Button type="primary" htmlType="submit">
              exchange
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default ExchangeForm;

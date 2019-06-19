// @flow

import React, { PureComponent } from 'react';
import { Input } from 'antd';

export type CurrencyType = 'USD' | 'EUR' | 'GBP' | 'RUB';
export type CurrencySignType = '$' | '€' | '£' | '₽';
type PropTypes = {
  onChange: Function,
  value: number,
  currency: CurrencyType,
}

const CURRENCY_SIGN_MAP = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  RUB: '₽',
};

class NumericInput extends PureComponent<PropTypes> {
  static defaultProps = {
    currency: 'USD',
  };

  sanitiseInput(value: string): number {
    const sanitisedValue = parseFloat(value);

    if (Number.isNaN(sanitisedValue)) {
      return this.props.value;
    }

    return +sanitisedValue.toFixed(2);
  }

  handleChange = (event: SyntheticInputEvent<HTMLInputElement>): void => {
    const sanitizedValue = this.sanitiseInput(event.target.value);

    this.props.onChange(sanitizedValue);
  };

  render() {
    const { currency, value } = this.props;
    const currencySign = CURRENCY_SIGN_MAP[currency];

    return (
      <Input
        value={value}
        onChange={this.handleChange}
        placeholder={`Enter amount (${currencySign})`}
        addonBefore={currencySign}
      />
    );
  }
}

export default NumericInput;

// @flow

import React, { PureComponent } from 'react';
import { Input } from 'antd';

import matchCurrencySign from '../../utils/matchCurrencySign';
import { withCurrencyList } from '../../graphql/hocs';

export type CurrencyType = 'USD' | 'EUR' | 'GBP' | 'RUB';
export type CurrencySignType = '$' | '€' | '£' | '₽';
export type Currency = {
  code: CurrencyType,
  sign: CurrencySignType,
};

type PropTypes = {
  onChange: Function,
  value: number,
  currency: CurrencyType,
  currencyListQuery: {
    currencyList: Currency[]
  },
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
    const { currency, value, currencyListQuery } = this.props;
    const currencySign = matchCurrencySign(currencyListQuery.currencyList, currency);

    return (
      <Input
        value={value.toFixed(2)}
        onChange={this.handleChange}
        placeholder={`Enter amount (${currencySign})`}
        addonBefore={currencySign}
      />
    );
  }
}

export default withCurrencyList(NumericInput);

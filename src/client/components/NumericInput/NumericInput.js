// @flow

import React from 'react';
import { InputNumber } from 'antd';

import matchCurrencySign from '../../utils/matchCurrencySign';
import { withCurrencyList } from '../../graphql/hocs';
import './NumericInput.less';

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

const formatValue = (currencySign) => (value) => `${currencySign} ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const parseValue = (currencySign) => (value) => {
  const pattern = new RegExp(`\\${currencySign}\\s?|(,*)/g`);

  return value.replace(pattern, '');
};

const NumericInput = (props: PropTypes) => {
  const {
    currency, value, currencyListQuery, onChange,
  } = props;

  const currencySign = matchCurrencySign(currencyListQuery.currencyList, currency);

  return (
    <InputNumber
      className="numericInput"
      defaultValue={0}
      precision={2}
      value={value}
      formatter={formatValue(currencySign)}
      parser={parseValue(currencySign)}
      onChange={onChange}
    />
  );
};

export default withCurrencyList(NumericInput);

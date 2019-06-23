// @flow

import React, { memo } from 'react';
import { compose } from 'react-apollo';
import { InputNumber } from 'antd';

import matchCurrencySign from '../../utils/matchCurrencySign';
import type { CurrencySign, CurrencyCode, CurrencyData } from '../../../types/currencyTypes';
import { withCurrencyList } from '../../graphql/hocs';
import './NumericInput.less';

type PropTypes = {
  onChange: Function,
  value: number,
  currency: CurrencyCode,
  max: number,
  currencyListQuery: {
    currencyList: CurrencyData[]
  },
};

const formatValue = (currencySign: CurrencySign) => (value: string): string => {
  const pattern = /\B(?=(\d{3})+(?!\d))/g;

  return `${currencySign} ${value}`.replace(pattern, ',');
};

const parseValue = (currencySign: CurrencySign) => (value: string): string => {
  const pattern = new RegExp(`\\${currencySign}\\s?|(,*)/g`);

  return value.replace(pattern, '');
};

const NumericInput = (props: PropTypes) => {
  const {
    currency, value, currencyListQuery, onChange, max,
  } = props;

  const currencySign = matchCurrencySign(currencyListQuery.currencyList, currency);

  return (
    <InputNumber
      min={0}
      max={max}
      value={value}
      precision={2}
      defaultValue={0}
      onChange={onChange}
      className="numericInput"
      formatter={formatValue(currencySign)}
      parser={parseValue(currencySign)}
    />
  );
};

export default compose(
  memo,
  withCurrencyList,
)(NumericInput);

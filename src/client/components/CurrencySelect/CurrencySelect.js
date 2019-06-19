// @flow

import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const options = [
  {
    value: 'USD',
    label: 'American dollars',
  },
  {
    value: 'EUR',
    label: 'Euros',
  },
  {
    value: 'GBP',
    label: 'British pounds',
  },
  {
    value: 'RUB',
    label: 'Russian rubles',
  },
];

type PropTypes = {
  onChange: Function,
  value: string,
};

const CurrencySelect = ({ onChange, value: selected }: PropTypes) => (
  <Select defaultValue="USD" onChange={onChange} value={selected}>
    {
      options.map(({ value, label }) => (
        <Option value={value} key={value}>{label}</Option>
      ))
    }
  </Select>
);

export default CurrencySelect;

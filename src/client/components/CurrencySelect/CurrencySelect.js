// @flow

import React, { memo } from 'react';
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
  excluded: string
};

const CurrencySelect = ({ onChange, value: selected, excluded }: PropTypes) => (
  <Select onChange={onChange} value={selected}>
    {
      options
        .filter(({ value }) => excluded !== value)
        .map(({ value, label }) => (
          <Option value={value} key={value}>{label}</Option>
        ))
    }
  </Select>
);

export default memo<PropTypes>(CurrencySelect);

// @flow

import React, { memo } from 'react';
import { compose } from 'react-apollo';
import { Select } from 'antd';

import { withPocketList } from '../../graphql/hocs';
import type { PocketData } from '../../../types/pocketTypes';
import type { CurrencyCode } from '../../../types/currencyTypes';

const { Option } = Select;
type PropTypes = {
  onChange: Function,
  value: CurrencyCode,
  excluded: CurrencyCode[],
  pocketListQuery: {
    pocketList: PocketData[],
  }
};

const CurrencySelect = ({
  onChange,
  excluded,
  pocketListQuery,
  value: selected,
}: PropTypes) => {
  const options = pocketListQuery.pocketList;

  return (
    <Select onChange={onChange} value={selected}>
      {
        options
          .filter(({ currency }) => excluded !== currency)
          .map(({ currency, label }) => (
            <Option value={currency} key={currency}>{label}</Option>
          ))
      }
    </Select>
  );
};

export default compose(
  memo,
  withPocketList,
)(CurrencySelect);

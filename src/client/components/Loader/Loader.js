// @flow

import React from 'react';
import { Spin } from 'antd';

type PropTypes = {
  size: 'small' | 'default' | 'large'
};

const Loader = ({ size }: PropTypes) => (
  <Spin size={size} tip="Loading..." delay={150} />
);

Loader.defaultProps = {
  size: 'default',
};

export default Loader;

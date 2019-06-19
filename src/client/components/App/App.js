// @flow

import React from 'react';
import { Layout } from 'antd';

import ExchangeForm from '../ExchangeForm/ExchangeForm';

const {
  Header, Footer, Content,
} = Layout;

const App = () => (
  <Layout>
    <Header>Header</Header>
    <Content>
      <ExchangeForm />
    </Content>
    <Footer style={{ textAlign: 'center' }}>Made with ❤ by Eugene Serebryakov ©2018</Footer>
  </Layout>
);

export default App;

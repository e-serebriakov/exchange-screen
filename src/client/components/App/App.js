// @flow

import React from 'react';
import { compose } from 'react-apollo';
import { Layout } from 'antd';

import { withPocketList, withCurrencyList } from '../../graphql/hocs';
import PocketsInfo from '../PocketsInfo/PocketsInfo';
import ExchangeForm from '../ExchangeForm/ExchangeForm';
import Loader from '../Loader/Loader';
import './App.less';

const {
  Header, Footer, Content, Sider,
} = Layout;

const App = ({ pocketListQuery, currencyListQuery }) => {
  const isPocketListLoading = pocketListQuery.loading;
  const isCurrencyListLoading = currencyListQuery.loading;

  const isLoading = isPocketListLoading || isCurrencyListLoading;

  return (
    <Layout>
      <Header className="header" />

      <Layout>
        <Sider theme="light">
          {
            !isPocketListLoading &&
            <PocketsInfo pocketList={pocketListQuery.pocketList} />
          }
        </Sider>

        <Layout>
          <Content className="content">
            {
              isLoading ?
                <Loader /> :
                <ExchangeForm />
            }
          </Content>

          <Footer className="footer">Made with ❤ by Eugene Serebryakov ©2019</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default compose(
  withPocketList,
  withCurrencyList,
)(App);

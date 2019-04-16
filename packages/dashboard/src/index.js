import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';
import { LocaleProvider, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import Layout from './pages/Layout';
import client from './config/client';
import getLocalesAntd from './config/localization/antdLocale';
import * as registerServiceWorker from './registerServiceWorker';
import './styles/index.less';
import './config/localization/i18n';

const AppSuspense = () => (
  <Suspense fallback={<Spin size="large" className="custom-layout-spin" />}>
    <App />
  </Suspense>
);

const App = () => {
  const { i18n } = useTranslation();
  return (
    <LocaleProvider locale={getLocalesAntd(i18n.language)}>
      <ApolloProvider client={client}>
        <Router>
          <Layout />
        </Router>
      </ApolloProvider>
    </LocaleProvider>
  );
};

ReactDOM.render(<AppSuspense />, document.getElementById('root'));
registerServiceWorker.register();

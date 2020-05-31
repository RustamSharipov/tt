import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.css';

import './style.css';

import { ContactsView } from 'views';

const App = () => {
  return (
    <Router>
      <Layout
        style={{
          minHeight: '100%',
          padding: '48px',
        }}
      >
        <Layout.Content>
          <Switch>
            <Redirect
              exact={true}
              from="/"
              to="/contacts"
            />

            <Route
              path="/contacts"
              component={ContactsView}
            />
          </Switch>
        </Layout.Content>
      </Layout>
    </Router>
  );
}

export default App;

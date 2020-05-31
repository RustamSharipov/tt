import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Edit, List } from '.';

const ContactsView = () => {
  return (
    <Switch>
      <Route
        path="/contacts"
        exact
        component={List}
      />

      <Route
        path="/contacts/:id"
        exact
        component={Edit}
      />
    </Switch>
  );
};

export default ContactsView;

import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { ProtectedRoute } from './shared/components';
import { MainPlate, ContentPlate, Nav } from './components';
import { Auth } from './routes/auth';
/** APP_PAGES_IMPORTS */

export const Root = () => (
  <Switch>
    <Route path="/auth" component={Auth} />
    <Route>
      <MainPlate>
        <Nav.Plate color="BLUE">
          {/** APP_ROUTE_LINKS */}
        </Nav.Plate>
        <ContentPlate>
          <Switch>
            {/** APP_ROUTES */}
        </Switch>
        </ContentPlate>
      </MainPlate>
    </Route>
  </Switch>
);

/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import ClustersPage from 'containers/ClustersPage/Loadable';
import NodesPage from 'containers/NodesPage/Loadable';
import NamespacesPage from 'containers/NamespacesPage/Loadable';
import DeploymentsPage from 'containers/DeploymentsPage/Loadable';
import CreateDeployment from 'containers/DeploymentsPage/CreateLoadable';
import TerminalPage from 'containers/TerminalPage/Loadable';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'light',
  },
});

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/clusters" component={ClustersPage} />
          <Route
            exact
            path="/clusters/:cluster_id/nodes"
            component={NodesPage}
          />
          <Route
            exact
            path="/clusters/:cluster_id/namespaces"
            component={NamespacesPage}
          />
          <Route
            exact
            path="/clusters/:cluster_id/namespaces/:namespace_id/deployments"
            component={DeploymentsPage}
          />
          <Route
            exact
            path="/clusters/:cluster_id/namespaces/:namespace_id/deployments/create"
            component={CreateDeployment}
          />
          <Route
            exact
            path="/clusters/:cluster_id/console"
            component={TerminalPage}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </MuiThemeProvider>
  );
}

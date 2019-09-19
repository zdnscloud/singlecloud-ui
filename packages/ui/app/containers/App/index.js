/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { PureComponent, Fragment } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { withRouter } from 'react-router';

import GlobalStyle from 'global-styles';
import LoginPage from 'containers/LoginPage/Loadable';
import theme from 'theme';

import * as roleActions from 'ducks/role/actions';

import Dashboard from './Dashboard';

class App extends PureComponent {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
    console.error(error, info); // eslint-disable-line
  }

  componentDidMount() {
    const { loadRole } = this.props;
    loadRole('/web/role');
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h1>Something went wrong.</h1>
          <pre>{`${this.state.error}`}</pre>
        </div>
      );
    }

    return (
      <MuiThemeProvider theme={theme}>
        <Fragment>
          <Switch>
            <Route path="/login" component={LoginPage} exact />
            <Route component={Dashboard} />
          </Switch>
          <GlobalStyle />
        </Fragment>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...roleActions,
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(App);

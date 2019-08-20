/**
 *
 * Registries
 *
 */
import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import Helmet from 'components/Helmet/Helmet';
import { FormattedMessage } from 'react-intl';
import CssBaseline from '@material-ui/core/CssBaseline';

// import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
// import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import { makeSelectURL } from 'ducks/registries/selectors';
import * as actions from 'ducks/registries/actions';

import useStyles from './styles';
import messages from './messages';

const Registries = ({
  // clusterID,
  // namespaceID,
  location,
  url,
  loadRegistries,
}) => {
  const classes = useStyles();
  useEffect(() => {
    if (url) {
      loadRegistries(url, {
        // clusterID,
        // namespaceID,
      });
    }
    return () => {
      // try cancel something when unmount
    };
  }, [url]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}></div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  // clusterID: makeSelectClusterID(),
  // namespaceID: makeSelectNamespaceID(),
  url: makeSelectURL(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(Registries);

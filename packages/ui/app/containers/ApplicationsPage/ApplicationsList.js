/**
 *
 * User Quotas Table
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import GridContainer from 'components/Grid/GridContainer';

import * as actions from 'ducks/applications/actions';
import {
  makeSelectApplications,
  makeSelectApplicationsList,
} from 'ducks/applications/selectors';
import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectCurrentNamespaceID } from 'ducks/namespaces/selectors';

import messages from './messages';
import useStyles from './styles';
import ApplicationTemplate from './application/applicationTemplate';

export const ApplicationsList = ({
  data,
  filter,
  clusterID,
  namespaceID,
  removeApplication,
}) => {
  const classes = useStyles();
  const appData = data.filter((item) => {
    let flag = true;
    if (filter.name) {
      flag = flag && item.get('name').includes(filter.name);
    }
    return flag;
  });
  return (
    <GridContainer>
      {appData.map((item, key) => (
        <ApplicationTemplate
          classes={classes}
          key={key}
          item={item}
          removeApplication={removeApplication}
          namespaceID={namespaceID}
          clusterID={clusterID}
        />
      ))}
    </GridContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  applications: makeSelectApplications(),
  data: makeSelectApplicationsList(),
  clusterID: makeSelectCurrentClusterID(),
  namespaceID: makeSelectCurrentNamespaceID(),
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

export default compose(withConnect)(ApplicationsList);

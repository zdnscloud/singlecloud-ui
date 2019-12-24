/**
 *
 * SvcMeshTapPage
 *
 */
import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import {
  reduxForm,
  getFormValues,
  SubmissionError,
  submit,
} from 'redux-form/immutable';

import Helmet from 'components/Helmet/Helmet';
import { FormattedMessage } from 'react-intl';
import CssBaseline from '@material-ui/core/CssBaseline';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';

import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import {
  makeSelectURL,
  makeSelectSvcMeshWorkloadGroupsList,
} from 'ducks/svcMeshWorkloadGroups/selectors';
import { makeSelectIsTapping } from 'ducks/svcMeshTap/selectors';
import * as actions from 'ducks/svcMeshWorkloadGroups/actions';
import * as tapActions from 'ducks/svcMeshTap/actions';

import SearchForm, { formName } from './SearchForm';
import Table from './Table';

import useStyles from './styles';
import messages from './messages';

const SvcMeshTapPage = ({
  clusterID,
  namespaceID,
  isTapping,
  location,
  url,
  loadSvcMeshWorkloadGroups,
  workloadGroups,
  values,
  svcMeshTapStart,
  svcMeshTapStop,
  svcMeshTapReset,
}) => {
  const classes = useStyles();
  useEffect(() => {
    if (url) {
      loadSvcMeshWorkloadGroups(url, {
        clusterID,
        namespaceID,
      });
    }
    return () => {
      // try cancel something when unmount
    };
  }, [clusterID, loadSvcMeshWorkloadGroups, namespaceID, url]);
  useEffect(() => {}, []);
  const workloads = workloadGroups
    .map((wg) => wg.get('workloads'))
    .flatten(1)
    .map((wl) => wl.getIn(['stat', 'resource']));

  async function doSubmit(formValues) {
    try {
      const fvalues = formValues.toJS();
      const { from, to, method, path } = fvalues;

      const [type, name] = from.split('/');
      const [toType, toName] = to.split('/');
      const data = {
        resource_type: type,
        resource_name: name,
        to_resource_type: toType,
        to_resource_name: toName,
        method,
        path,
      };
      svcMeshTapStop();
      svcMeshTapStart(data, { clusterID, namespaceID });
    } catch (error) {
      throw new SubmissionError({ _error: error });
    }
  }

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/svcMeshTap`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <SearchForm
                  classes={classes}
                  onSubmit={doSubmit}
                  workloads={workloads}
                  initialValues={fromJS({
                    from: '',
                    to: '',
                    method: '',
                    path: '',
                  })}
                  isTapping={isTapping}
                  formValues={values}
                  stopAction={svcMeshTapStop}
                  resetAction={svcMeshTapReset}
                />
              </CardHeader>
              <CardBody>
                <Table />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  url: makeSelectURL(),
  workloadGroups: makeSelectSvcMeshWorkloadGroupsList(),
  values: getFormValues(formName),
  isTapping: makeSelectIsTapping(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      ...tapActions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(SvcMeshTapPage);

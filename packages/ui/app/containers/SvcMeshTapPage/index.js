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
  makeSelectSvcMeshWorkloadsList,
} from 'ducks/svcMeshWorkloads/selectors';
import { makeSelectIsTapping } from 'ducks/svcMeshTap/selectors';
import * as actions from 'ducks/svcMeshWorkloads/actions';
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
  loadSvcMeshWorkloads,
  workloadGroups,
  values,
  svcMeshTapStart,
  svcMeshTapStop,
  svcMeshTapReset,
}) => {
  const classes = useStyles();
  const [initialValues, setInitialValues] = useState();
  useEffect(() => {
    if (url) {
      loadSvcMeshWorkloads(url, {
        clusterID,
        namespaceID,
      });
    }
    return () => {
      // try cancel something when unmount
    };
  }, [clusterID, loadSvcMeshWorkloads, namespaceID, url]);
  useEffect(() => {
    /**
       query params
       resource_type=
       resource_name=
       to_resource_type=
       to_resource_name=
       method=
       path=
    */
    const { search } = location;
    const searchData = search
      .slice(1)
      .split('&')
      .map((p) => p.split('='));
    const params = searchData.reduce(
      (meno, item) => ({
        ...meno,
        [item[0]]: item[1],
      }),
      {}
    );
    let from = '';
    let to = '';
    if (params.resource_type && params.resource_name) {
      from = `${params.resource_type}/${params.resource_name}`;
    }
    if (params.to_resource_type && params.to_resource_name) {
      to = `${params.to_resource_type}/${params.to_resource_name}`;
    }
    setInitialValues(
      fromJS({
        from,
        to,
        method: '',
        path: '',
      })
    );

    return () => {
      svcMeshTapStop();
      svcMeshTapReset();
    };
  }, [location, svcMeshTapReset, svcMeshTapStop]);
  const workloads = workloadGroups.map((wl) => wl.getIn(['stat', 'resource']));
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
                  initialValues={initialValues}
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
  workloadGroups: makeSelectSvcMeshWorkloadsList(),
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

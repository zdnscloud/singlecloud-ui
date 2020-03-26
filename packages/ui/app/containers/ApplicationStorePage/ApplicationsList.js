/**
 *
 * ApplicationsList
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import GridContainer from 'components/Grid/GridContainer';

import * as actions from 'ducks/charts/actions';
import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectCurrentNamespaceID } from 'ducks/namespaces/selectors';
import { makeSelectCharts, makeSelectChartsList } from 'ducks/charts/selectors';

import messages from './messages';
import useStyles from './styles';
import ApplicationTemplate from './application/applicationTemplate';

export const ApplicationsList = ({ data, filter, clusterID, namespaceID, res }) => {
  const classes = useStyles();
  const chartData = data.filter((item) => {
    let flag = true;
    if (filter.name) {
      flag = flag && item.get('name').includes(filter.name);
    }
    return flag;
  });

  return (
    <GridContainer>
      {chartData.map((item, key) => (
        <ApplicationTemplate
          clusterID={clusterID}
          namespaceID={namespaceID}
          key={key}
          item={item}
          res={res}
        />
      ))}
    </GridContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectCurrentClusterID(),
  namespaceID: makeSelectCurrentNamespaceID(),
  charts: makeSelectCharts(),
  data: makeSelectChartsList(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ApplicationsList);

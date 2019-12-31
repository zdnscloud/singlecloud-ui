/**
 *
 * ShowHPAPagePage
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { createStructuredSelector, createSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS, List as list } from 'immutable';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';
import Helmet from 'components/Helmet/Helmet';

import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import * as actions from 'ducks/horizontalPodAutoscalers/actions';
import {
  makeSelectCurrentID,
  makeSelectCurrent,
  makeSelectURL,
} from 'ducks/horizontalPodAutoscalers/selectors';

import messages from './messages';
import useStyles from './styles';

import {
  refactorMetrics,
  renderMetricsTypeValue,
  renderInputMetricsName,
  renderReadOnlyNumerical,
  renderTargetTypeValue,
} from './utils/utils';

export const HPADetailPage = ({
  clusterID,
  namespaceID,
  id,
  url,
  hpa,
  readHorizontalPodAutoscaler,
}) => {
  const classes = useStyles();
  const intl = useIntl();
  let metrics = list([]);
  useEffect(() => {
    readHorizontalPodAutoscaler(id, {
      url: `${url}/${id}`,
      clusterID,
      namespaceID,
    });
    return () => {};
  }, [clusterID, namespaceID, id, readHorizontalPodAutoscaler, url]);

  if (hpa.size !== 0) {
    const data = hpa.toJS();
    const arr = refactorMetrics(data, intl, 'show');
    metrics = fromJS(arr.filter((l) => l !== undefined));
  }

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/horizontalPodAutoscalers`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.showPageTitle} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.showHPA} />
                </h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <ReadOnlyInput
                      labelText={<FormattedMessage {...messages.formName} />}
                      value={hpa && hpa.get('name')}
                      fullWidth
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <ReadOnlyInput
                      labelText={
                        <FormattedMessage {...messages.formScaleTargetKind} />
                      }
                      value={hpa && hpa.get('scaleTargetKind')}
                      fullWidth
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <ReadOnlyInput
                      labelText={
                        <FormattedMessage {...messages.formScaleTargetName} />
                      }
                      value={hpa && hpa.get('scaleTargetName')}
                      fullWidth
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <ReadOnlyInput
                      labelText={
                        <FormattedMessage {...messages.formMinReplicas} />
                      }
                      value={hpa && hpa.get('minReplicas')}
                      fullWidth
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <ReadOnlyInput
                      labelText={
                        <FormattedMessage {...messages.formMaxReplicas} />
                      }
                      value={hpa && hpa.get('maxReplicas')}
                      fullWidth
                    />
                  </GridItem>
                </GridContainer>
                <List component="ul">
                  {metrics.size > 0 &&
                    metrics.map((c, i) => {
                      const metricsType =
                        metrics && metrics.getIn([i, 'metricsType']);
                      const metricsTypeValue = renderMetricsTypeValue(
                        metricsType
                      );
                      const targetType =
                        metrics && metrics.getIn([i, 'targetType']);
                      const targetTypeValue = renderTargetTypeValue(targetType);
                      const metricsName = renderInputMetricsName(metricsType);
                      return (
                        <Card key={i} border>
                          <CardBody>
                            <ListItem key={i}>
                              <ListItemText>
                                <GridContainer>
                                  <GridItem xs={3} sm={3} md={3}>
                                    <ReadOnlyInput
                                      labelText={
                                        <FormattedMessage
                                          {...messages.formMetricsType}
                                        />
                                      }
                                      fullWidth
                                      value={
                                        metricsTypeValue &&
                                        intl.formatMessage(metricsTypeValue)
                                      }
                                    />
                                  </GridItem>
                                  <GridItem xs={3} sm={3} md={3}>
                                    <ReadOnlyInput
                                      labelText={
                                        <FormattedMessage
                                          {...messages.formMetricName}
                                        />
                                      }
                                      fullWidth
                                      value={c.get(`${metricsName}`)}
                                    />
                                  </GridItem>
                                </GridContainer>
                                <GridContainer>
                                  <GridItem xs={3} sm={3} md={3}>
                                    <ReadOnlyInput
                                      labelText={
                                        <FormattedMessage
                                          {...messages.formTargetType}
                                        />
                                      }
                                      fullWidth
                                      value={
                                        targetTypeValue &&
                                        intl.formatMessage(targetTypeValue)
                                      }
                                    />
                                  </GridItem>
                                  <GridItem xs={3} sm={3} md={3}>
                                    {renderReadOnlyNumerical(c, i, metrics)}
                                  </GridItem>
                                </GridContainer>
                              </ListItemText>
                            </ListItem>
                          </CardBody>
                        </Card>
                      );
                    })}
                </List>
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
  id: makeSelectCurrentID(),
  url: makeSelectURL(),
  hpa: makeSelectCurrent(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(HPADetailPage);

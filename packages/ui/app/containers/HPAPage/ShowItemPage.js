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
import { reduxForm, getFormValues } from 'redux-form/immutable';
import { SubmissionError, submit } from 'redux-form';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
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
import CardFooter from 'components/Card/CardFooter';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';
import Helmet from 'components/Helmet/Helmet';

import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import * as actions from 'ducks/horizontalpodautoscalers/actions';
import {
  makeSelectCurrentID,
  makeSelectCurrent,
  makeSelectURL,
} from 'ducks/horizontalpodautoscalers/selectors';

import messages from './messages';
import useStyles from './styles';

export const HPADetailPage = ({
  clusterID,
  namespaceID,
  id,
  url,
  hpa,
  readHorizontalpodautoscaler,
}) => {
  const classes = useStyles();
  const intl = useIntl();
  let metrics = list([]);
  useEffect(() => {
    readHorizontalpodautoscaler(id, {
      url: `${url}/${id}`,
      clusterID,
      namespaceID,
    });
    return () => {};
  }, [clusterID, namespaceID, id, readHorizontalpodautoscaler, url]);

  if (hpa.size !== 0) {
    const data = hpa.toJS();
    const { resourceMetrics, customMetrics, ...formData } = data;
    let arr = [];
    data.resourceMetrics =
      resourceMetrics &&
      resourceMetrics.map((item) => {
        item.metricsType = 'resourceMetrics';
        if (item.targetType === 'AverageValue' && item.averageValue) {
          if (item.resourceName === 'cpu') {
            item.averageValue = `${(item.averageValue / 1000).toFixed(
              2
            )} ${intl.formatMessage(messages.formCPUSuffix)}`;
          } else if (item.resourceName === 'memory') {
            item.averageValue = `${(item.averageValue / 1024 ** 3).toFixed(
              2
            )}Gi`;
          }
        }
        return item;
      });
    data.customMetrics =
      customMetrics &&
      customMetrics.map((item) => {
        item.metricsType = 'customMetrics';
        item.targetType = 'AverageValue';
        return item;
      });
    arr = arr.concat(data.resourceMetrics).concat(data.customMetrics);
    metrics = fromJS(arr.filter((l) => l !== undefined));
  }

  const renderNumerical = (c, i) => {
    const targetType = metrics && metrics.getIn([i, 'targetType']);
    switch (targetType) {
      case 'Utilization':
        return (
          <ReadOnlyInput
            labelText={<FormattedMessage {...messages.formNumerical} />}
            fullWidth
            value={c.get('averageUtilization')}
            inputProps={{
              autoComplete: 'off',
              endAdornment: '%',
            }}
          />
        );
      case 'AverageValue':
        return (
          <ReadOnlyInput
            labelText={<FormattedMessage {...messages.formNumerical} />}
            fullWidth
            value={c.get('averageValue')}
          />
        );
      default:
        break;
    }
  };

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/hpa`,
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
                      let metricsName;
                      let metricsTypeValue;
                      switch (metricsType) {
                        case 'resourceMetrics':
                          metricsName = 'resourceName';
                          metricsTypeValue = messages.formResourceMetrics;
                          break;
                        case 'customMetrics':
                          metricsName = 'metricName';
                          metricsTypeValue = messages.formCustomMetrics;
                          break;
                        default:
                          metricsName = 'resourceName';
                          break;
                      }
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
                                      value={c.get('targetType')}
                                    />
                                  </GridItem>
                                  <GridItem xs={3} sm={3} md={3}>
                                    {renderNumerical(c, i)}
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

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(HPADetailPage);

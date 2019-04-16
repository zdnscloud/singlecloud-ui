/**
 *
 * ClusterDetailPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import moment from 'moment';

import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// react plugin for creating charts
// import ChartistGraph from "react-chartist";
// @material-ui/core
import Icon from '@material-ui/core/Icon';
import teal from '@material-ui/core/colors/teal';
// @material-ui/icons
import Store from '@material-ui/icons/Store';
import Warning from '@material-ui/icons/Warning';
import DateRange from '@material-ui/icons/DateRange';
import LocalOffer from '@material-ui/icons/LocalOffer';
import Update from '@material-ui/icons/Update';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import AccessTime from '@material-ui/icons/AccessTime';
import Accessibility from '@material-ui/icons/Accessibility';
import BugReport from '@material-ui/icons/BugReport';
import Code from '@material-ui/icons/Code';
import Cloud from '@material-ui/icons/Cloud';
import red from '@material-ui/core/colors/red';
// core components
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Tasks from 'components/Tasks/Tasks';
import CustomTabs from 'components/CustomTabs/CustomTabs';
import Danger from 'components/Typography/Danger';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardIcon from 'components/Card/CardIcon';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import Gauge from 'components/Charts/Gauge';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle';
import * as actions from './actions';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class ClusterDetail extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    cluster: PropTypes.object.isRequired,
  };

  render() {
    const { classes, cluster } = this.props;

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>Name</p>
                <h3 className={classes.cardTitle}>{cluster.get('name')}</h3>
              </CardHeader>
              <CardFooter stats />
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Version</p>
                <h3 className={classes.cardTitle}>
                  <small>{cluster.get('version')}</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats} />
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Nodes</p>
                <h3 className={classes.cardTitle}>
                  <small>{cluster.get('nodeCount')}</small>
                </h3>
              </CardHeader>
              <CardFooter stats />
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Created</p>
                <h3 className={classes.cardTitle}>
                  <small>
                    {moment(cluster.get('creationTimestamp')).format(
                      'YYYY-MM-DD'
                    )}
                  </small>
                </h3>
              </CardHeader>
              <CardFooter stats />
            </Card>
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="success">
                <Gauge
                  value={12}
                  width={270}
                  height={157}
                  color={teal.A400}
                  backgroundColor={teal['400']}
                  valueFormatter={(v) => `${v}%`}
                  valueLabelStyle={{ fill: '#edebeb', fontSize: '42px' }}
                  minMaxLabelStyle={{ fill: '#edebeb' }}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>CPU</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>12%</span>
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="warning">
                <Gauge
                  value={34}
                  width={270}
                  height={157}
                  color={teal.A400}
                  backgroundColor={teal['400']}
                  valueFormatter={(v) => `${v}%`}
                  valueLabelStyle={{ fill: '#edebeb', fontSize: '42px' }}
                  minMaxLabelStyle={{ fill: '#edebeb' }}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Memory</h4>
                <p className={classes.cardCategory}>34%</p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="danger">
                <Gauge
                  value={22}
                  width={270}
                  height={157}
                  color={teal.A400}
                  backgroundColor={teal['400']}
                  valueFormatter={(v) => `${v}%`}
                  valueLabelStyle={{ fill: '#edebeb', fontSize: '42px' }}
                  minMaxLabelStyle={{ fill: '#edebeb' }}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Pods</h4>
                <p className={classes.cardCategory}>79 / 330</p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

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
  withStyles(styles)
)(ClusterDetail);

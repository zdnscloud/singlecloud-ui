/**
 *
 * ClusterDetailPage
 *
 */

import React, { createRef } from 'react';
import { findDOMNode } from 'react-dom';
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
import NameIcon from 'components/Icons/Name';
import VersionIcon from 'components/Icons/Version';
import NodesIcon from 'components/Icons/Nodes';
import TimeIcon from 'components/Icons/Time';

import {
  makeSelectShowMenuText,
  makeSelectShowEvents,
} from 'containers/App/selectors';

import styles from './dashboardStyle';
import * as actions from './actions';
import messages from './messages';

const gaugeColor = '#FFFFFF';
const gaugeBgColor = '#40A7E8';

/* eslint-disable react/prefer-stateless-function */
export class ClusterDetail extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    cluster: PropTypes.object.isRequired,
  };

  state = {
    chartWidth: 270,
  };

  chartRef = createRef();

  componentDidMount() {
    this.setWidth();
    window.onresize = () => this.setWidth();
  }

  componentDidUpdate(prevProps) {
    const { showMenuText, showEvents } = this.props;
    if (
      prevProps.showMenuText !== showMenuText ||
      prevProps.showEvents !== showEvents
    ) {
      const start = new Date();
      const run = () => {
        const now = new Date();
        const duration = now - start;
        if (duration > 1000) return;
        this.setWidth();
        requestAnimationFrame(run);
      };
      run();
    }
  }

  componenWillUnmount() {
    window.onresize = null;
  }

  setWidth() {
    const el = findDOMNode(this.chartRef.current);
    const width = el.offsetWidth;
    this.setState({
      chartWidth: width - 30,
    });
  }

  render() {
    const { classes, cluster } = this.props;
    const cpuRatio = (cluster.get('cpuUsedRatio') * 100).toFixed(0);
    const memoryRatio = (cluster.get('memoryUsedRatio') * 100).toFixed(0);
    const podRatio = (cluster.get('podUsedRatio') * 100).toFixed(0);
    const cpu = `${cluster.get('cpuUsed')} / ${cluster.get('cpu')}`;
    const memory = `${(cluster.get('memoryUsed') / 1024 ** 3).toFixed(
      2
    )}GB / ${(cluster.get('memory') / 1024 ** 3).toFixed()}GB`;
    const pod = `${cluster.get('podUsed')} / ${cluster.get('pod')}`;

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="cyan" stats icon>
                <CardIcon color="cyan">
                  <NameIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Name</p>
                <h3 className={classes.cardTitle}>{cluster.get('name')}</h3>
              </CardHeader>
              <CardFooter />
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="cyan" stats icon>
                <CardIcon color="cyan">
                  <VersionIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Version</p>
                <h3 className={classes.cardTitle}>
                  <small>{cluster.get('version')}</small>
                </h3>
              </CardHeader>
              <CardFooter />
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="cyan" stats icon>
                <CardIcon color="cyan">
                  <NodesIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Nodes</p>
                <h3 className={classes.cardTitle}>
                  <small>{cluster.get('nodeCount')}</small>
                </h3>
              </CardHeader>
              <CardFooter />
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="cyan" stats icon>
                <CardIcon color="cyan">
                  <TimeIcon />
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
              <CardFooter />
            </Card>
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="azure" ref={this.chartRef}>
                <Gauge
                  value={cpuRatio}
                  width={this.state.chartWidth}
                  height={(this.state.chartWidth / 270) * 157}
                  color={gaugeColor}
                  backgroundColor={gaugeBgColor}
                  valueFormatter={(v) => `${v}%`}
                  valueLabelStyle={{
                    fill: '#edebeb',
                    fontSize: `${(this.state.chartWidth / 270) * 42}px`,
                  }}
                  minMaxLabelStyle={{ fill: '#edebeb' }}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>
                  CPU
                  <span className={classes.cardTitleValue}>{cpu}</span>
                </h4>
                <p className={classes.cardCategory} />
              </CardBody>
              <CardFooter />
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="azure">
                <Gauge
                  value={memoryRatio}
                  width={this.state.chartWidth}
                  height={(this.state.chartWidth / 270) * 157}
                  color={gaugeColor}
                  backgroundColor={gaugeBgColor}
                  valueFormatter={(v) => `${v}%`}
                  valueLabelStyle={{
                    fill: '#edebeb',
                    fontSize: `${(this.state.chartWidth / 270) * 42}px`,
                  }}
                  minMaxLabelStyle={{ fill: '#edebeb' }}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>
                  Memory
                  <span className={classes.cardTitleValue}>{memory}</span>
                </h4>
                <p className={classes.cardCategory} />
              </CardBody>
              <CardFooter />
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="azure">
                <Gauge
                  value={podRatio}
                  width={this.state.chartWidth}
                  height={(this.state.chartWidth / 270) * 157}
                  color={gaugeColor}
                  backgroundColor={gaugeBgColor}
                  valueFormatter={(v) => `${v}%`}
                  valueLabelStyle={{
                    fill: '#edebeb',
                    fontSize: `${(this.state.chartWidth / 270) * 42}px`,
                  }}
                  minMaxLabelStyle={{ fill: '#edebeb' }}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>
                  Pods
                  <span className={classes.cardTitleValue}>{pod}</span>
                </h4>
                <p className={classes.cardCategory} />
              </CardBody>
              <CardFooter />
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  showMenuText: makeSelectShowMenuText(),
  showEvents: makeSelectShowEvents(),
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
  withStyles(styles)
)(ClusterDetail);

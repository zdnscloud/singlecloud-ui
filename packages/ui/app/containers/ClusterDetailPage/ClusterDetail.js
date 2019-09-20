/**
 *
 * ClusterDetailPage
 *
 */

import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import moment from 'moment';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardIcon from 'components/Card/CardIcon';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import NameIcon from 'components/Icons/Name';
import VersionIcon from 'components/Icons/Version';
import NodesIcon from 'components/Icons/Nodes';
import TimeIcon from 'components/Icons/Time';
import CircleChart from 'components/Charts/Circle';

import {
  makeSelectShowMenuText,
  makeSelectShowEvents,
} from 'ducks/app/selectors';

import useStyles from './styles';
import messages from './messages';

export const ClusterDetail = ({ cluster }) => {
  const classes = useStyles();
  const cpuRatio = (cluster.get('cpuUsedRatio') * 100).toFixed(0);
  const memoryRatio = (cluster.get('memoryUsedRatio') * 100).toFixed(0);
  const podRatio = (cluster.get('podUsedRatio') * 100).toFixed(0);
  const cpu = `${(cluster.get('cpuUsed') / 1000).toFixed(2)} / ${cluster.get(
    'cpu'
  ) / 1000}`;
  const memory = `${(cluster.get('memoryUsed') / 1024 ** 3).toFixed(2)}GiB / ${(
    cluster.get('memory') /
    1024 ** 3
  ).toFixed(2)}GiB`;
  const pod = `${cluster.get('podUsed')} / ${cluster.get('pod')}`;

  const infoList = [
    {
      key: 'name',
      Icon: NameIcon,
      message: 'clusterName',
      value: cluster.get('name'),
    },
    {
      key: 'version',
      Icon: VersionIcon,
      message: 'clusterVersion',
      value: cluster.get('version'),
    },
    {
      key: 'nodeCount',
      Icon: NodesIcon,
      message: 'clusterNodes',
      value: cluster.get('nodeCount'),
    },
    {
      key: 'creationTimestamp',
      Icon: TimeIcon,
      message: 'clusterCreated',
      value: moment(cluster.get('creationTimestamp')).format('YYYY-MM-DD'),
    },
  ];

  return (
    <div className={classes.wrapper}>
      <GridContainer>
        {infoList.map((info) => (
          <GridItem xs={12} sm={6} md={3} key={info.key}>
            <Card>
              <CardHeader
                color="cyanInverse"
                stats
                icon
                className={classes.infoCardHeader}
              >
                <CardIcon color="cyanInverse" className={classes.infoCardIcon}>
                  <info.Icon />
                </CardIcon>
                <div className={classes.infoCardText}>
                  <h3 className={classes.info}>
                    <FormattedMessage {...messages[info.message]} />
                  </h3>
                  <p className={classes.info}>{info.value}</p>
                </div>
              </CardHeader>
            </Card>
          </GridItem>
        ))}
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="azure" className={classes.cardHeaderLine}>
              <CircleChart value={cpuRatio} total={100} />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>
                <FormattedMessage {...messages.clusterCPU} />
                <span className={classes.cardTitleValue}>
                  {cpu}
                  <FormattedMessage {...messages.clusterCPUCore} />
                </span>
              </h4>
              <p className={classes.cardCategory} />
            </CardBody>
            <CardFooter />
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="azure" className={classes.cardHeaderLine}>
              <CircleChart value={memoryRatio} total={100} />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>
                <FormattedMessage {...messages.clusterMemory} />
                <span className={classes.cardTitleValue}>{memory}</span>
              </h4>
              <p className={classes.cardCategory} />
            </CardBody>
            <CardFooter />
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="azure" className={classes.cardHeaderLine}>
              <CircleChart value={podRatio} total={100} />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>
                <FormattedMessage {...messages.clusterPods} />
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
};

const mapStateToProps = createStructuredSelector({
  showMenuText: makeSelectShowMenuText(),
  showEvents: makeSelectShowEvents(),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(ClusterDetail);

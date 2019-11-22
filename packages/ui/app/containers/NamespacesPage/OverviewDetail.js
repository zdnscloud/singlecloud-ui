/**
 *
 * Namespace OverviewDetail
 *
 */

import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import dayjs from 'dayjs';

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
import PodsUseMostCPUTable from './table/podsUseMostCPUTable';
import PodsUseMostMemoryTable from './table/podsUseMostMemoryTable';

export const OverviewDetail = ({ namespace }) => {
  const classes = useStyles();
  const cpuRatio = (namespace.get('cpuUsedRatio') * 100).toFixed(0);
  const memoryRatio = (namespace.get('memoryUsedRatio') * 100).toFixed(0);
  const podRatio = (namespace.get('podUsedRatio') * 100).toFixed(0);
  const cpu = `${(namespace.get('cpuUsed') / 1000).toFixed(
    2
  )} / ${namespace.get('cpu') / 1000}`;
  const memory = `${(namespace.get('memoryUsed') / 1024 ** 3).toFixed(
    2
  )}GiB / ${(namespace.get('memory') / 1024 ** 3).toFixed(2)}GiB`;
  const pod = `${namespace.get('podUsed')} / ${namespace.get('pod')}`;

  const infoList = [
    {
      key: 'name',
      message: 'namespaceName',
      value: namespace.get('name'),
    },
    {
      key: 'creationTimestamp',
      message: 'namespaceCreated',
      value: dayjs(namespace.get('creationTimestamp')).format('YYYY-MM-DD'),
    },
  ];

  return (
    <div>
      <GridContainer className={classes.contentGrid}>
        <Card className={classes.card}>
          <CardHeader className={classes.infoCardHeader}>
            {infoList.map((info) => (
              <GridItem xs={6} sm={6} md={6} key={info.key}>
                <div className={classes.infoCardText}>
                  <p className={classes.info}>
                    <FormattedMessage {...messages[info.message]} />
                  </p>
                  <h3 className={classes.info}>{info.value}</h3>
                </div>
              </GridItem>
            ))}
          </CardHeader>
        </Card>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart className={classes.card}>
            <CardHeader color="azure" className={classes.cardHeaderLine}>
              <CircleChart value={cpuRatio} total={100} />
            </CardHeader>
            <CardBody className={classes.cardBody}>
              <h4 className={classes.cardTitle}>
                <FormattedMessage {...messages.namespaceCPU} />
                <span className={classes.cardTitleValue}>
                  {cpu}
                  <FormattedMessage {...messages.namespaceCPUCore} />
                </span>
              </h4>
            </CardBody>
            <CardFooter />
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart className={classes.card}>
            <CardHeader color="azure" className={classes.cardHeaderLine}>
              <CircleChart value={memoryRatio} total={100} />
            </CardHeader>
            <CardBody className={classes.cardBody}>
              <h4 className={classes.cardTitle}>
                <FormattedMessage {...messages.namespaceMemory} />
                <span className={classes.cardTitleValue}>{memory}</span>
              </h4>
            </CardBody>
            <CardFooter />
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart className={classes.card}>
            <CardHeader color="azure" className={classes.cardHeaderLine}>
              <CircleChart value={podRatio} total={100} />
            </CardHeader>
            <CardBody className={classes.cardBody}>
              <h4 className={classes.cardTitle}>
                <FormattedMessage {...messages.namespacePods} />
                <span className={classes.cardTitleValue}>{pod}</span>
              </h4>
            </CardBody>
            <CardFooter />
          </Card>
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader>
              <h4>
                <FormattedMessage {...messages.podsUseMostCPUTable} />
              </h4>
            </CardHeader>
            <CardBody>
              <PodsUseMostCPUTable />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader>
              <h4>
                <FormattedMessage {...messages.podsUseMostMemoryTable} />
              </h4>
            </CardHeader>
            <CardBody>
              <PodsUseMostMemoryTable />
            </CardBody>
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

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(OverviewDetail);

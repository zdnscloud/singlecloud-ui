/**
 *
 * NodeDetailPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';
import CircleChart from 'components/Charts/Circle';

import {
  makeSelectCurrentID as makeSelectClusterID,
  makeSelectCurrent as makeSelectCurrentCluster,
} from 'ducks/clusters/selectors';

import { makeSelectCurrentNode } from 'ducks/nodes/selectors';
import * as actions from 'ducks/nodes/actions';

import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import messages from './messages';
import styles from './styles';
import NodesPageHelmet from './helmet';
/* eslint-disable react/prefer-stateless-function */
export class NodeDetailPage extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.load();
  }

  load() {
    const { cluster, clusterID, loadNodes } = this.props;
    const url = cluster.getIn(['links', 'nodes']);
    loadNodes(url, clusterID);
  }

  render() {
    const { classes, node, clusterID } = this.props;

    return (
      <div className={classes.root}>
        <NodesPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Breadcrumbs
            data={[
              {
                path: `/clusters/${clusterID}/nodes`,
                name: <FormattedMessage {...messages.pageTitle} />,
              },
              {
                path: '#',
                name: <FormattedMessage {...messages.nodeDetails} />,
              },
            ]}
          />
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader>
                  <h4>
                    <FormattedMessage {...messages.nodeInfo} />
                  </h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={3} sm={3} md={3}>
                      <ReadOnlyInput
                        labelText={<FormattedMessage {...messages.nodeName} />}
                        fullWidth
                        value={node.get('name')}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                      <ReadOnlyInput
                        labelText={<FormattedMessage {...messages.address} />}
                        fullWidth
                        value={node.get('address')}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                      <ReadOnlyInput
                        labelText={<FormattedMessage {...messages.roles} />}
                        fullWidth
                        value={
                          node.get('roles') && node.get('roles').join(', ')
                        }
                      />
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem xs={3} sm={3} md={3}>
                      <ReadOnlyInput
                        labelText={
                          <FormattedMessage {...messages.dockerVersion} />
                        }
                        fullWidth
                        value={node.get('dockerVersion')}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                      <ReadOnlyInput
                        labelText={
                          <FormattedMessage
                            {...messages.operatingSystemImage}
                          />
                        }
                        fullWidth
                        value={node.get('operatingSystemImage')}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                      <ReadOnlyInput
                        labelText={
                          <FormattedMessage {...messages.operatingSystem} />
                        }
                        fullWidth
                        value={node.get('operatingSystem')}
                      />
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem xs={3} sm={3} md={3}>
                      <ReadOnlyInput
                        labelText={
                          <FormattedMessage {...messages.creationTimestamp} />
                        }
                        fullWidth
                        value={moment(node.get('creationTimestamp')).format(
                          'YYYY-MM-DD HH:mm:ss'
                        )}
                      />
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <Card chart>
                        <CardHeader
                          color="azure"
                          className={classes.cardHeaderLine}
                        >
                          <CircleChart
                            value={node.get('cpuUsedRatio') * 100}
                            total={100}
                          />
                        </CardHeader>
                        <CardBody>
                          <h4 className={classes.cardTitle}>
                            <FormattedMessage {...messages.cpu} />
                            <span className={classes.cardTitleValue}>
                              {`${node.get('cpuUsed') / 1000} / ${node.get(
                                'cpu'
                              ) / 1000}`}
                            </span>
                          </h4>
                          <p className={classes.cardCategory} />
                        </CardBody>
                      </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <Card chart>
                        <CardHeader
                          color="azure"
                          className={classes.cardHeaderLine}
                        >
                          <CircleChart
                            value={node.get('memoryUsedRatio') * 100}
                            total={100}
                          />
                        </CardHeader>
                        <CardBody>
                          <h4 className={classes.cardTitle}>
                            <FormattedMessage {...messages.memory} />
                            <span className={classes.cardTitleValue}>
                              {`${(node.get('memoryUsed') / 1024 ** 3).toFixed(
                                2
                              )} / ${(node.get('memory') / 1024 ** 3).toFixed(
                                2
                              )} GiB`}
                            </span>
                          </h4>
                          <p className={classes.cardCategory} />
                        </CardBody>
                      </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <Card chart>
                        <CardHeader
                          color="azure"
                          className={classes.cardHeaderLine}
                        >
                          <CircleChart
                            value={node.get('podUsedRatio') * 100}
                            total={100}
                          />
                        </CardHeader>
                        <CardBody>
                          <h4 className={classes.cardTitle}>
                            <FormattedMessage {...messages.pods} />
                            <span className={classes.cardTitleValue}>
                              {`${node.get('podUsed')} / ${node.get('pod')}`}
                            </span>
                          </h4>
                          <p className={classes.cardCategory} />
                        </CardBody>
                      </Card>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>

          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader>
                  <h4>
                    <FormattedMessage {...messages.labels} />
                  </h4>
                </CardHeader>
                <CardBody>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <FormattedMessage {...messages.key} />
                        </TableCell>
                        <TableCell>
                          <FormattedMessage {...messages.value} />
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {node.get('labels') &&
                        node
                          .get('labels')
                          .map((val, key) => (
                            <TableRow key={key}>
                              <TableCell>{key}</TableCell>
                              <TableCell>{val}</TableCell>
                            </TableRow>
                          ))
                          .toList()}
                    </TableBody>
                  </Table>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>

          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader>
                  <h4>
                    <FormattedMessage {...messages.annotations} />
                  </h4>
                </CardHeader>
                <CardBody>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <FormattedMessage {...messages.key} />
                        </TableCell>
                        <TableCell>
                          <FormattedMessage {...messages.value} />
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {node.get('annotations') &&
                        node
                          .get('annotations')
                          .map((val, key) => (
                            <TableRow key={key}>
                              <TableCell>{key}</TableCell>
                              <TableCell>{`${val}`}</TableCell>
                            </TableRow>
                          ))
                          .toList()}
                    </TableBody>
                  </Table>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  cluster: makeSelectCurrentCluster(),
  clusterID: makeSelectClusterID(),
  node: makeSelectCurrentNode(),
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
)(NodeDetailPage);

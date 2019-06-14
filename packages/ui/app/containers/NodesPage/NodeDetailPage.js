
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

import { withStyles } from '@material-ui/core/styles';
import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';

import { makeSelectClusterID } from 'ducks/app/selectors';
import { makeSelectCurrentCluster } from 'ducks/clusters/selectors';
import { makeSelectCurrentNode } from 'ducks/nodes/selectors';
import * as actions from 'ducks/nodes/actions';

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
    const {
      cluster,
      clusterID,
      loadNodes,
    } = this.props
    const url = cluster.getIn(['links', 'nodes']);
    loadNodes(url, clusterID);
  }

  render() {
    const { classes, node } = this.props;

    return (
      <div className={classes.root}>
        <NodesPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>
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
                        labelText={<FormattedMessage {...messages.dockerVersion} />}
                        fullWidth
                        value={node.get('dockerVersion')}
                      />
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem xs={3} sm={3} md={3}>
                      <ReadOnlyInput
                        labelText={<FormattedMessage {...messages.operatingSystemImage} />}
                        fullWidth
                        value={node.get('operatingSystemImage')}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                      <ReadOnlyInput
                        labelText={<FormattedMessage {...messages.operatingSystem} />}
                        fullWidth
                        value={node.get('operatingSystem')}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                      <ReadOnlyInput
                        labelText={<FormattedMessage {...messages.creationTimestamp} />}
                        fullWidth
                        value={node.get('creationTimestamp')}
                      />
                    </GridItem>
                  </GridContainer>

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

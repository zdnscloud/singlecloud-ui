
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

import { makeSelectClusterID } from 'ducks/app/selectors';
import { makeSelectCurrentCluster } from 'ducks/clusters/selectors';
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
    const { classes } = this.props;

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
                    <FormattedMessage {...messages.nodes} />
                  </h4>
                </CardHeader>
                <CardBody>
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

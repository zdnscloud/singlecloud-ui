/**
 *
 * PodsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';

import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'ducks/app/selectors';
import { makeSelectDeploymentID } from 'ducks/deployments/selectors';
import * as actions from 'ducks/pods/actions';
import { makeSelectURL } from 'ducks/pods/selectors';

import messages from './messages';
import PodsPageHelmet from './helmet';
import styles from './styles';
import PodsTable from './PodsTable';

/* eslint-disable react/prefer-stateless-function */
export class PodsPage extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  componentWillMount() {
    const { clusterID, namespaceID, deploymentID, url, loadPods } = this.props;
    loadPods({ url, clusterID, namespaceID, deploymentID });
  }

  componentDidUpdate(prevProps) {
    const {
      clusterID: prevClusterID,
      namespaceID: prevNamespaceID,
      deploymentID: prevDeploymentID,
    } = prevProps;
    const { clusterID, namespaceID, deploymentID, url, loadPods } = this.props;
    if (
      prevClusterID !== clusterID ||
      prevNamespaceID !== namespaceID ||
      prevDeploymentID !== deploymentID
    ) {
      loadPods({ url, clusterID, namespaceID, deploymentID });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <PodsPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader>
                  <h4 className={classes.cardTitleWhite}>
                    <FormattedMessage {...messages.pods} />
                  </h4>
                </CardHeader>
                <CardBody>
                  <PodsTable />
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
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  deploymentID: makeSelectDeploymentID(),
  url: makeSelectURL(),
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
)(PodsPage);

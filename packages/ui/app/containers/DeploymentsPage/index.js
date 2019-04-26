/**
 *
 * DeploymentsPage
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

import injectSaga from 'utils/injectSaga';
import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'containers/App/selectors';
import * as actions from 'ducks/deployments/actions';
import { makeSelectURL } from 'ducks/deployments/selectors';

import messages from './messages';
import DeploymentsPageHelmet from './helmet';
import styles from './styles';
import DeploymentsTable from './DeploymentsTable';

/* eslint-disable react/prefer-stateless-function */
export class DeploymentsPage extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  componentWillMount() {
    const { clusterID, namespaceID, url, loadDeployments } = this.props;
    loadDeployments({ url, clusterID, namespaceID });
  }

  componentDidUpdate(prevProps) {
    const {
      clusterID: prevClusterID,
      namespaceID: prevNamespaceID,
    } = prevProps;
    const { clusterID, namespaceID, url, loadDeployments } = this.props;
    if (prevClusterID !== clusterID || prevNamespaceID !== namespaceID) {
      loadDeployments({ url, clusterID, namespaceID });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <DeploymentsPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>
                    <FormattedMessage {...messages.deployments} />
                    <Link
                      to={`${this.props.location.pathname}/create`}
                      className={classes.createBtnLink}
                    >
                      <Fab
                        size="small"
                        color="default"
                        aria-label="create deployment"
                        className={classes.menuButton}
                      >
                        <AddIcon />
                      </Fab>
                    </Link>
                  </h4>
                </CardHeader>
                <CardBody>
                  <DeploymentsTable location={this.props.location} />
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
)(DeploymentsPage);

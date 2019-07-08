/**
 *
 * ConfigMapsPage
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
import Paper from '@material-ui/core/Paper';
// import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';

import AddIcon from 'components/Icons/Add';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Table from 'components/Table/Table';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';

import * as actions from 'ducks/storages/actions';
import { makeSelectClusterID } from 'ducks/app/selectors';
import {
  makeSelectLVMStorages,
  makeSelectNFSStorages,
  makeSelectCurrentLVMStorages,
  makeSelectCurrentNFSStorages,
} from 'ducks/storages/selectors';

import StoragesTable from './StoragesTable';
import messages from './messages';
import StoragePageHelmet from './helmet';
import styles from './styles';

/* eslint-disable react/prefer-stateless-function */
export class StoragesPage extends React.PureComponent {
  static propTypes = {
    initAction: PropTypes.func,
    classes: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.load();
  }

  componentDidUpdate(prevProps) {
    const { clusterID: prevClusterID } = prevProps;
    const { clusterID, namespace } = this.props;
    if (clusterID !== prevClusterID) {
      this.load();
    }
  }

  load() {
    const { clusterID, loadStorages } = this.props;
    const url = `/apis/agent.zcloud.cn/v1/clusters/${clusterID}/storages`;
    loadStorages(url, clusterID);
  }

  render() {
    const { classes, theme, clusterID } = this.props;

    return (
      <div className={classes.root}>
        <StoragePageHelmet />
        <CssBaseline />
        <Paper className={classes.content}>
          <Breadcrumbs
            data={[
              {
                path: `/clusters/${clusterID}/storages`,
                name: <FormattedMessage {...messages.pageTitle} />,
              },
            ]}
          />
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>
                    <FormattedMessage {...messages.storages} />
                    <IconButton
                      aria-label={
                        <FormattedMessage {...messages.createStorage} />
                      }
                      className={classes.menuButton}
                      component={Link}
                      to={`/clusters/${clusterID}/storages/create`}
                    >
                      <AddIcon style={{ color: '#fff' }} />
                    </IconButton>
                  </h4>
                </CardHeader>
                <CardBody>
                  <StoragesTable />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
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
  withStyles(styles, { withTheme: true })
)(StoragesPage);

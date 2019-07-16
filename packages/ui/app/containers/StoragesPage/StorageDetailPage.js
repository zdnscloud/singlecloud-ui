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

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Table from 'components/Table/Table';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';

import * as actions from 'ducks/storages/actions';
import { makeSelectClusterID } from 'ducks/app/selectors';
import {
  makeSelectStorages,
  makeSelectStorageID,
  makeSelectCurrentStorage,
} from 'ducks/storages/selectors';

import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import messages from './messages';
import StoragePageHelmet from './helmet';
import styles from './styles';
import Node from './Node';
import PVTable from './PVTable';

/* eslint-disable react/prefer-stateless-function */
export class StoragePage extends React.PureComponent {
  static propTypes = {
    initAction: PropTypes.func,
    classes: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.load();
  }

  componentDidUpdate(prevProps) {
    const { clusterID: prevClusterID } = prevProps;
    const { clusterID } = this.props;
    if (clusterID !== prevClusterID) {
      this.load();
    }
  }

  load() {
  }

  render() {
    const { classes, theme, storage, clusterID } = this.props;
    const name = storage.get('name');
    const totalSize = storage.get('size');
    const freeSize = storage.get('freesize');
    const usedSize = storage.get('usedsize');
    const nodes = storage.get('nodes');
    const pvs = storage.get('pvs');

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
                    {name}
                  </h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={2} sm={2} md={2}>
                      <ReadOnlyInput
                        labelText={<FormattedMessage {...messages.size} />}
                        value={`${totalSize}`}
                        inputProps={{
                          endAdornment: <span className={classes.text}>G</span>,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={2} sm={2} md={2}>
                      <ReadOnlyInput
                        labelText={<FormattedMessage {...messages.freesize} />}
                        value={`${freeSize}`}
                        inputProps={{
                          endAdornment: <span className={classes.text}>G</span>,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={2} sm={2} md={2}>
                      <ReadOnlyInput
                        labelText={<FormattedMessage {...messages.usedsize} />}
                        value={`${usedSize}`}
                        inputProps={{
                          endAdornment: <span className={classes.text}>G</span>,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    {nodes &&
                     nodes.map((node, i) => (
                       <GridItem key={i} xs={3} sm={3} md={3}>
                         <Node node={node} />
                       </GridItem>
                     ))}
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>
                    <FormattedMessage {...messages.pvList} />
                  </h4>
                </CardHeader>
                <CardBody>{pvs ? <PVTable data={pvs} /> : null}</CardBody>
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
  storage: makeSelectCurrentStorage(),
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
)(StoragePage);

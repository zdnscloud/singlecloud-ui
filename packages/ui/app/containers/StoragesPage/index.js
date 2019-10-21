/**
 *
 * StorageClusters Page
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import getByKey from '@gsmlg/utils/getByKey';

import Helmet from 'components/Helmet/Helmet';
import { Link } from 'react-router-dom';
import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import ErrorInfo from 'components/ErrorInfo/ErrorInfo';
import AddIcon from 'components/Icons/Add';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Table from 'components/Table/Table';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';

import * as actions from 'ducks/storageClusters/actions';
import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectURL } from 'ducks/storageClusters/selectors';

import StoragesTable from './Table';
import messages from './messages';
import useStyles from './styles';

export const StoragesPage = ({ clusterID, loadStorageClusters, url }) => {
  const classes = useStyles();
  useEffect(() => {
    if (url) {
      loadStorageClusters(url, { clusterID });
    }
    const t = setInterval(() => loadStorageClusters(url, { clusterID }), 3000);
    return () => clearInterval(t);
  }, [clusterID, loadStorageClusters, url]);
  const [error, setError] = useState(null);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/storageClusters`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          {error ? (
            <ErrorInfo
              errorText={getByKey(error, ['response', 'message'])}
              close={() => setError(null)}
            />
          ) : null}
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.storages} />
                </h4>
                <IconButton
                  component={Link}
                  to={`/clusters/${clusterID}/storageClusters/create`}
                >
                  <AddIcon />
                </IconButton>
              </CardHeader>
              <CardBody>
                <StoragesTable setError={setError} />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
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

export default compose(withConnect)(StoragesPage);

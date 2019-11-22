/**
 *
 * NamespacesPage
 *
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { Link } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import Menubar from 'components/Menubar';
import AddIcon from 'components/Icons/Add';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Helmet from 'components/Helmet/Helmet';

import {
  makeSelectCurrentID as makeSelectClusterID,
  makeSelectCurrent as makeSelectCurrentCluster,
} from 'ducks/clusters/selectors';
import { makeSelectURL } from 'ducks/namespaces/selectors';
import * as actions from 'ducks/namespaces/actions';

import messages from './messages';
import useStyles from './styles';
import NamespacesTable from './NamespacesTable';

export const NamespacesPage = ({ url, clusterID, loadNamespaces }) => {
  const classes = useStyles();
  useEffect(() => {
    if (url) {
      loadNamespaces(url, { clusterID });
    }
    const t = setInterval(() => {
      if (url) {
        loadNamespaces(url, { clusterID });
      }
    }, 3000);
    return () => clearInterval(t);
  }, [clusterID, loadNamespaces, url]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
          ]}
        />
        <Typography component="div">
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader>
                  <h4>
                    <FormattedMessage {...messages.namespaces} />
                  </h4>
                  <IconButton
                    aria-label={<FormattedMessage {...messages.namespaces} />}
                    component={Link}
                    to={`/clusters/${clusterID}/namespaces/create`}
                    className={classes.createBtnLink}
                  >
                    <AddIcon />
                  </IconButton>
                </CardHeader>
                <CardBody>
                  <NamespacesTable />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </Typography>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  url: makeSelectURL(),
  clusterID: makeSelectClusterID(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(NamespacesPage);

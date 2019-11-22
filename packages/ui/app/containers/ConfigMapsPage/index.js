/**
 *
 * ConfigMapsPage
 *
 */

import React, { useEffect } from 'react';
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
import IconButton from '@material-ui/core/IconButton';
import AddIcon from 'components/Icons/Add';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Helmet from 'components/Helmet/Helmet';

import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import * as actions from 'ducks/configMaps/actions';
import { makeSelectURL } from 'ducks/configMaps/selectors';

import messages from './messages';
import useStyles from './styles';
import ConfigMapsTable from './ConfigMapsTable';

/* eslint-disable react/prefer-stateless-function */
export const ConfigMapsPage = ({
  clusterID,
  namespaceID,
  url,
  loadConfigMaps,
  location,
}) => {
  const classes = useStyles();
  useEffect(() => {
    loadConfigMaps(url, { clusterID, namespaceID });
  }, [clusterID, loadConfigMaps, namespaceID, url]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/configmaps`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.configMaps} />
                </h4>
                <Link
                  to={`${location.pathname}/create`}
                  className={classes.createBtnLink}
                >
                  <IconButton>
                    <AddIcon />
                  </IconButton>
                </Link>
              </CardHeader>
              <CardBody>
                <ConfigMapsTable />
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

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ConfigMapsPage);

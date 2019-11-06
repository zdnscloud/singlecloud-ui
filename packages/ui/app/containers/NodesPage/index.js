/**
 *
 * NodesPage
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { Link } from 'react-router-dom';
import getByKey from '@gsmlg/utils/getByKey';

import { withStyles } from '@material-ui/core/styles';
import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import AddIcon from 'components/Icons/Add';
import Helmet from 'components/Helmet/Helmet';
import IconButton from '@material-ui/core/IconButton';
import ErrorInfo from 'components/ErrorInfo/ErrorInfo';

import {
  makeSelectCurrentID as makeSelectClusterID,
  makeSelectCurrent as makeSelectCurrentCluster,
} from 'ducks/clusters/selectors';

import * as actions from 'ducks/nodes/actions';
import { makeSelectURL } from 'ducks/nodes/selectors';

import messages from './messages';
import useStyles from './styles';
import NodesTable from './Table';

const NodesPage = ({ clusterID, url, loadNodes }) => {
  const classes = useStyles();
  const [error, setError] = useState(null);
  useEffect(() => {
    if (url) {
      loadNodes(url, {
        clusterID,
      });
    }
    const t = setInterval(() => {
      if (url) {
        loadNodes(url, {
          clusterID,
        });
      }
    }, 3000);
    return () => clearInterval(t);
  }, [clusterID, loadNodes, url]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/nodes`,

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
                  <FormattedMessage {...messages.nodes} />
                </h4>
              </CardHeader>
              <CardBody>
                <NodesTable setError={setError} />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cluster: makeSelectCurrentCluster(),
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

export default compose(withConnect)(NodesPage);

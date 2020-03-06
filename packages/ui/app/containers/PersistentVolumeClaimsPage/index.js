/**
 *
 * PersistentVolumeClaimsPage
 *
 */
import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import getByKey from '@gsmlg/utils/getByKey';

import Helmet from 'components/Helmet/Helmet';
import { FormattedMessage } from 'react-intl';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from 'components/Icons/Add';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import ErrorInfo from 'components/ErrorInfo/ErrorInfo';

import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import { makeSelectURL } from 'ducks/persistentVolumeClaims/selectors';
import * as actions from 'ducks/persistentVolumeClaims/actions';

import useStyles from './styles';
import messages from './messages';
import PersistentVolumeClaimsTable from './Table';

const PersistentVolumeClaimsPage = ({
  clusterID,
  namespaceID,
  location,
  url,
  loadPersistentVolumeClaims,
}) => {
  const classes = useStyles();
  const [error, setError] = useState(null);
  useEffect(() => {
    let t = null;
    if (url) {
      loadPersistentVolumeClaims(url, {
        clusterID,
        namespaceID,
      });
      t = setInterval(() => {
        loadPersistentVolumeClaims(url, {
          clusterID,
          namespaceID,
        });
      }, 3000);
    }
    return () => {
      clearInterval(t);
    };
  }, [clusterID, loadPersistentVolumeClaims, namespaceID, url]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters`,
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
                  <FormattedMessage {...messages.persistentVolumeClaims} />
                </h4>
              </CardHeader>
              <CardBody>
                <PersistentVolumeClaimsTable setError={setError} />
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

export default compose(withConnect, memo)(PersistentVolumeClaimsPage);

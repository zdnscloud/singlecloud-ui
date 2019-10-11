/**
 *
 * ClustersPage
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import getByKey from '@gsmlg/utils/getByKey';

import { Link } from 'react-router-dom';
import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from 'components/Icons/Add';
import Helmet from 'components/Helmet/Helmet';
import ErrorInfo from 'components/ErrorInfo/ErrorInfo';

import { makeSelectURL } from 'ducks/clusters/selectors';
import * as actions from 'ducks/clusters/actions';

import messages from './messages';
import useStyles from './styles';
import ClustersTable from './Table';

export const ClustersPage = ({ loadClusters, url }) => {
  const classes = useStyles();
  useEffect(() => {
    loadClusters(url);
    const t = setInterval(() => {
      loadClusters(url);
    }, 3000);
    return () => clearInterval(t);
  }, [loadClusters, url]);
  const [error, setError] = useState(null);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: '/clusters',
              name: <FormattedMessage {...messages.clusters} />,
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
                  <FormattedMessage {...messages.clusters} />
                </h4>
                <IconButton component={Link} to="/clusters/create">
                  <AddIcon />
                </IconButton>
              </CardHeader>
              <CardBody>
                <ClustersTable setError={setError} />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
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

export default compose(withConnect)(ClustersPage);

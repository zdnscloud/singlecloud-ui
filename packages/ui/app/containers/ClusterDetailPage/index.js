/**
 *
 * ClusterDetailPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { push } from 'connected-react-router';

import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';

import { makeSelectLastNamespace } from 'ducks/app/selectors';
import * as appActions from 'ducks/app/actions';
import {
  makeSelectCurrent,
  makeSelectCurrentID,
  makeSelectURL,
} from 'ducks/clusters/selectors';
import * as actions from 'ducks/clusters/actions';

import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import messages from './messages';
import useStyles from './styles';
import ClusterDetailPageHelmet from './helmet';
import ClusterDetail from './ClusterDetail';

export const ClusterDetailPage = ({
  readCluster,
  cluster,
  id,
  url,
  lastNamespace,
  setLastNamespace,
}) => {
  const classes = useStyles();
  useEffect(() => {
    if (!lastNamespace) {
      setLastNamespace('default');
    }
    readCluster(id, { url: `${url}/${id}` });
    const t = setInterval(() => {
      readCluster(id, { url: `${url}/${id}` });
    }, 3000);
    return () => clearInterval(t);
  }, [id, lastNamespace, readCluster, setLastNamespace, url]);

  return (
    <div className={classes.root}>
      <ClusterDetailPageHelmet />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${cluster.get('name')}`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <ClusterDetail cluster={cluster} />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cluster: makeSelectCurrent(),
  id: makeSelectCurrentID(),
  url: makeSelectURL(),
  lastNamespace: makeSelectLastNamespace(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...appActions,
      ...actions,
      routeTo: push,
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(ClusterDetailPage);

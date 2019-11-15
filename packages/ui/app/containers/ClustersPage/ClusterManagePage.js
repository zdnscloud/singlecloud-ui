/**
 *
 * Mange Cluster Page
 *
 */
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';
import { FORM_ERROR } from 'final-form';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Helmet from 'components/Helmet/Helmet';

import {
  makeSelectCurrent,
  makeSelectCurrentID,
  makeSelectURL,
} from 'ducks/clusters/selectors';
import * as actions from 'ducks/clusters/actions';

import { usePush } from 'hooks/router';

import messages from './messages';
import useStyles from './styles';
import UpdateClusterForm from './ClusterManageForm';

export const ClusterManagePage = ({
  readCluster,
  updateCluster,
  id,
  cluster,
  url,
}) => {
  const push = usePush();
  const formRef = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    const timer = setInterval(() => {
      readCluster(id, { url: `${url}/${id}` });
    }, 3000);
    return () => clearInterval(timer);
  }, [readCluster, url, id]);
  const [nodes, setNodes] = useState(cluster.get('nodes'));

  async function doSubmit(formValues) {
    try {
      const data = {
        ...formValues.toJS(),
        nodes: nodes.toJS(),
      };
      console.log('data', data);
      await new Promise((resolve, reject) => {
        updateCluster(data, {
          resolve,
          reject,
          url: cluster.getIn(['links', 'update']),
          id,
        });
      });
      push('/clusters');
    } catch (error) {
      return { [FORM_ERROR]: error };
    }
  }

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
            {
              name: <FormattedMessage {...messages.pageTitleClusterManage} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            {cluster.size > 0 ? (
              <UpdateClusterForm
                onSubmit={doSubmit}
                cluster={cluster}
                nodes={nodes}
                setNodes={setNodes}
                formRef={formRef}
              />
            ) : null}
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                formRef.current.dispatchEvent(
                  new Event('submit', { cancelable: true })
                );
              }}
              type="submit"
            >
              <FormattedMessage {...messages.createClusterButton} />
            </Button>
            <Button
              variant="contained"
              className={classes.cancleBtn}
              component={Link}
              to="/clusters"
            >
              <FormattedMessage {...messages.cancleClustersButton} />
            </Button>
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

export default compose(withConnect)(ClusterManagePage);

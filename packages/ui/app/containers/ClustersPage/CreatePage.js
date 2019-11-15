/* eslint-disable no-param-reassign */
/**
 *
 * Create Cluster Page
 *
 */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';
import { FORM_ERROR } from 'final-form';
import { Link } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Helmet from 'components/Helmet/Helmet';

import { usePush } from 'hooks/router';

import { makeSelectURL } from 'ducks/clusters/selectors';
import * as actions from 'ducks/clusters/actions';

import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import messages from './messages';
import useStyles from './styles';
import CreateClusterForm from './CreateForm';

export const CreateClusterPage = ({ createCluster, url }) => {
  const classes = useStyles();
  const push = usePush();
  const formRef = useRef(null);
  async function doSubmit(formValues) {
    try {
      const {
        advancedOptions,
        enableAdvancedOptions,
        nodes,
        ...formData
      } = formValues;
      let nodeArr = [];
      if (nodes) {
        const main = nodes.main || [];
        const work = nodes.work || [];
        main.forEach((item) => {
          const { roles } = item;
          if (roles.length > 0) {
            if (roles.indexOf('controlplane') === -1) {
              roles.push('controlplane');
            }
          } else {
            item.roles = ['controlplane'];
          }
        });
        work.forEach((item) => {
          const { roles } = item;
          if (roles.length > 0) {
            if (roles.indexOf('worker') === -1) {
              roles.push('worker');
            }
          } else {
            item.roles = ['worker'];
          }
        });
        nodeArr = main.concat(work);
      }
      const data = {
        nodes: nodeArr,
        ...formData,
      };
      if (enableAdvancedOptions) {
        delete data.enableAdvancedOptions;
      }
      await new Promise((resolve, reject) => {
        createCluster(data, {
          resolve,
          reject,
          url,
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
              name: <FormattedMessage {...messages.createCluster} />,
            },
          ]}
        />
        <Typography component="div" className="">
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <CreateClusterForm
                classes={classes}
                onSubmit={doSubmit}
                formRef={formRef}
              />
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
        </Typography>
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

export default compose(withConnect)(CreateClusterPage);

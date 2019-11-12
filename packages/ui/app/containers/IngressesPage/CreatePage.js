/**
 *
 * Create Ingress Page
 *
 */
import React, { Fragment, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';

import { FORM_ERROR } from 'final-form';

import { usePush } from 'hooks/router';

import Helmet from 'components/Helmet/Helmet';
import { FormattedMessage } from 'react-intl';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';

import { makeSelectLocation } from 'ducks/app/selectors';
import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import {
  makeSelectServices,
  makeSelectURL as makeSelectServicesURL,
} from 'ducks/services/selectors';

import { makeSelectURL } from 'ducks/ingresses/selectors';
import * as actions from 'ducks/ingresses/actions';

import { loadServices } from 'ducks/services/actions';

import messages from './messages';
import useStyles from './styles';
import CreateIngressForm from './CreateForm';
export const CreateIngressPage = ({
  createIngress,
  url,
  clusterID,
  namespaceID,
  services,
  // eslint-disable-next-line no-shadow
  loadServices,
  surl,
  location,
}) => {
  const classes = useStyles();
  const push = usePush();
  const formRef = useRef(null);
  const [init, setInit] = useState(null);
  const [isInit, setIsInit] = useState(false);
  const search = location.get('search');
  let targetName = '';
  if (search && search.includes('from=true')) {
    const [tn, name] = /targetName=([a-zA-Z0-9-]+)/i.exec(search);
    targetName = name;
  }
  useEffect(() => {
    if (url) {
      loadServices(surl, {
        clusterID,
        namespaceID,
      });
    }
  }, [clusterID, loadServices, namespaceID, surl, url]);

  async function doSubmit(formValues) {
    try {
      const { name, rules } = formValues;
      const rulesArr = [];
      if (rules) {
        rules.forEach((item) => {
          const { host, path, servicePort, serviceName } = item;
          const rule = { host, path, servicePort, serviceName };
          rulesArr.push(rule);
        });
      }
      const data = {
        name,
        rules: rulesArr,
      };
      await new Promise((resolve, reject) => {
        createIngress(data, {
          resolve,
          reject,
          url,
          clusterID,
          namespaceID,
        });
      });
      setIsInit(false);
      push(`/clusters/${clusterID}/namespaces/${namespaceID}/ingresses`);
    } catch (error) {
      setInit(formValues);
      setIsInit(true);
      return { [FORM_ERROR]: error };
    }
  }

  return (
    <div className={classes.root}>
      <Helmet
        title={messages.createPageTitle}
        description={messages.createPageDesc}
      />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/ingresses`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.createPageTitle} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <CreateIngressForm
              onSubmit={doSubmit}
              services={services}
              targetName={targetName}
              formRef={formRef}
              initialValues={
                isInit ? init : fromJS({ serviceName: targetName })
              }
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
              <FormattedMessage {...messages.save} />
            </Button>
            <Button
              variant="contained"
              className={classes.cancleBtn}
              onClick={() => {
                push(
                  `/clusters/${clusterID}/namespaces/${namespaceID}/ingresses`
                );
              }}
            >
              <FormattedMessage {...messages.cancle} />
            </Button>
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
  services: makeSelectServices(),
  surl: makeSelectServicesURL(),
  location: makeSelectLocation(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      loadServices,
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(CreateIngressPage);

/**
 *
 * RegistriesPage
 *
 */
import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  reduxForm,
  getFormValues,
  SubmissionError,
  submit,
} from 'redux-form/immutable';

import Helmet from 'components/Helmet/Helmet';
import { FormattedMessage } from 'react-intl';
import CssBaseline from '@material-ui/core/CssBaseline';

import { makeSelectURL ,makeSelectRegistries} from 'ducks/registries/selectors';
import { makeSelectClustersList } from 'ducks/clusters/selectors';

import * as actions from 'ducks/registries/actions';
import { makeSelectRole } from 'ducks/role/selectors';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Switch from 'components/CustomSwitch/IOSSwitch';

import useStyles from './styles';
import messages from './messages';
import UpdateRegistryForm, { formName } from './UpdateForm';

const RegistriesPage = ({
  url,
  loadRegistries,
  registries,
  role,
  values,
  removeRegistry,
  createRegistry,
  clusters,
  submitForm
}) => {
  const classes = useStyles();
  const [check, setCheck] = useState(false);
  const [isPending, setPending] = useState(false);
  const runningClusters = clusters && clusters.filter((d) => d.get('status') === 'Running'); 
  const registry = registries.first();
  const id = registry && registry.getIn(['id']);
  const rurl = registry && registry.getIn(['links','remove']);

  const delayUnset = (back) => {
    setTimeout(() => {
      setPending(false);
      if (back) setCheck(!!check);
    }, 1000);
  }

  useEffect(() => {
    if (url) {
      loadRegistries(url);
    }
    if(id){
      setCheck(true)
    }
  }, [url,id]);

  async function doSubmit(formValues) {
    try {
      setPending(true);
      setCheck(!check);
      const data = formValues.toJS();
      await new Promise((resolve, reject) => {
        if(!check){
          createRegistry(data, {
            resolve,
            reject,
            url,
          });
        } else {
          removeRegistry(id, {
            url:rurl, 
            resolve,
            reject
          })
        }
      });
      delayUnset();
    } catch (error) {
      delayUnset(true);
      throw new SubmissionError({ _error: error });
    }
  }

  const handleChange = () => () => {
    setCheck(!check);
    submitForm()
  }

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <Breadcrumbs
            data={[
              {
                name: <FormattedMessage {...messages.pageTitle} />,
              },
            ]}
          />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4 className={classes.cardTitleWhite}>
                    <FormattedMessage {...messages.registries} />
                  </h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem>
                    <Switch
                     disabled={isPending}
                     inputProps={{
                       disabled: isPending
                     }}
                      onChange={handleChange()}
                      checked={check}
                      label={
                        <FormattedMessage
                          {...(isPending ? messages.pending :messages.repositoryServise)}
                        />
                      }
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <UpdateRegistryForm
                      onSubmit={doSubmit}
                      formValues={values}
                      clusters={runningClusters}
                      role={role}
                      registry={registry}
                      check={check}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  url: makeSelectURL(),
  registries: makeSelectRegistries(),
  role: makeSelectRole(),
  values: getFormValues(formName),
  clusters: makeSelectClustersList(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      submitForm: () => submit(formName),
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(RegistriesPage);

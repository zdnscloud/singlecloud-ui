/**
 *
 * Create Namespace Page
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';
import { reduxForm, getFormValues } from 'redux-form/immutable';
import { SubmissionError, submit } from 'redux-form';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';

import { makeSelectURL } from 'ducks/clusters/selectors';
import * as actions from 'ducks/clusters/actions';

import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import messages from './messages';
import styles from './styles';
import ClustersPageHelmet from './helmet';
import ClusterForm from './ClusterForm';

export const formName = 'createClusterForm';

const validate = (values) => {
  const errors = {};
  const requiredFields = ['name', 'clusterDomain','singlecloudAddress','sshUser'];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const CreateClusterForm = reduxForm({
  form: formName,
  validate,
})(ClusterForm);

/* eslint-disable react/prefer-stateless-function */
export class CreateClusterPage extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const { classes, submitForm, createCluster, url, values } = this.props;
    async function doSubmit(formValues) {
      try {
        const formData = formValues.toJS();
        let data = {
          ...formData.advancedOptions,
          name : formData.name,
          nodes : formData.nodes,
          singlecloudAddress : formData.singlecloudAddress,
          option : {
            ...formData.advancedOptions.option,
            sshUser : formData.sshUser,
            clusterDomain : formData.clusterDomain,
            clusterUpstreamDNS : formData.advancedOptions.option.clusterUpstreamDNS.split(' '),
            sshKey : document.getElementById('text-button-file').files[0].value
          }
        }
        console.log('data', data,formData);
        debugger
        // await new Promise((resolve, reject) => {
        //   createCluster(data, {
        //     resolve,
        //     reject,
        //     url,
        //   });
        // });
      } catch (error) {
        throw new SubmissionError({ _error: error });
      }
    }

    return (
      <div className={classes.root}>
        <ClustersPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Breadcrumbs
            data={[
              {
                path: '/clusters/',
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
                  initialValues={fromJS({ name: '' })}
                  formValues={values}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={submitForm}
                >
                  <FormattedMessage {...messages.createClusterButton} />
                </Button>
                <Button
                  variant="contained"
                  className={classes.cancleBtn}
                  // onClick={submitForm}
                >
                  <FormattedMessage {...messages.cancleClustersButton} />
                </Button>
              </GridItem>
            </GridContainer>
          </Typography>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  url: makeSelectURL(),
  values: getFormValues(formName),
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
  withStyles(styles)
)(CreateClusterPage);

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
import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';

import { makeSelectClusterID } from 'ducks/app/selectors';
import { makeSelectCurrentCluster,makeSelectURL } from 'ducks/clusters/selectors';
import * as actions from 'ducks/clusters/actions';

import messages from './messages';
import styles from './styles';
import ClustersPageHelmet from './helmet';
import ClustersForm from './ClustersForm';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';

export const formName = 'createClustersForm';

const validate = (values) => {
  const errors = {};
  const requiredFields = ['name','option','option.sshUser','option.sshKey'];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const CreateClustersForm = reduxForm({
 form: formName,
 validate,
 })(ClustersForm);

/* eslint-disable react/prefer-stateless-function */
export class CreateClustersPage extends React.PureComponent {
  static propTypes = {
    initAction: PropTypes.func,
    classes: PropTypes.object.isRequired,
    match: PropTypes.object,
    location: PropTypes.object,
  };

  render() {
    const {
      classes,
      cluster,
      clusterID,
      submitForm,
      createClusters,
      values
    } = this.props;
    async function doSubmit(formValues) {
      try {
        const data = formValues.toJS();
        console.log("data",data)
        debugger
        await new Promise((resolve, reject) => {
          createClusters(data, {
            resolve,
            reject,
            url,
            clusterID,
          });
        });
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
                name: <FormattedMessage {...messages.clusters}/>
              },
              {
                name: <FormattedMessage {...messages.createClusters}/>
              }
            ]}
          />
          <Typography component="div" className="">
            <GridContainer className={classes.grid}>
              <GridItem xs={12} sm={12} md={12}>
                  <CreateClustersForm
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
                    <FormattedMessage {...messages.createClustersButton} />
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
  clusterID: makeSelectClusterID(),
  cluster: makeSelectCurrentCluster(),
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
)(CreateClustersPage);

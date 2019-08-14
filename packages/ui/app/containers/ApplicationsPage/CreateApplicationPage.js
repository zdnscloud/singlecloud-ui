/**
 *
 * Create Application Page
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
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';

import { makeSelectURL } from 'ducks/applicationStore/selectors';
import { makeSelectCurrentChart } from 'ducks/applications/selectors';
import { makeSelectClusters } from 'ducks/clusters/selectors';
import { makeSelectNamespacesWithoutClusterID } from 'ducks/namespaces/selectors';
import { makeSelectChartID} from 'ducks/app/selectors';
import * as actions from 'ducks/applications/actions';

import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import messages from './messages';
import styles from './styles';
import ApplicationsPageHelmet from './helmet';
import ApplicationForm from './ApplicationForm';
import { from } from 'rxjs';

export const formName = 'createApplicationForm';

const validate = (values) => {
  const errors = {};
  const requiredFields = ['name'];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const CreateApplicationForm = reduxForm({
  form: formName,
  validate,
})(ApplicationForm);

/* eslint-disable react/prefer-stateless-function */
export class CreateApplicationPage extends React.PureComponent {
  static propTypes = {
    initAction: PropTypes.func,
    classes: PropTypes.object.isRequired,
    match: PropTypes.object,
    location: PropTypes.object,
  };

  componentDidMount() {
    const { loadChart, url, chartID } = this.props;
    loadChart(url+'/'+chartID);
  }

  render() {
    const { classes, submitForm, createApplication, clusters, namespaces, chart, chartID, values } = this.props;
    async function doSubmit(formValues) {
      try {
        const { name,chartVersion,clusterID,namespaceID,...formData } = formValues.toJS();
        const url = `/apis/zcloud.cn/v1/clusters/${clusterID}/namespaces/${namespaceID}/applications`
        const data = {
          name,
          chartVersion,
          chartName:chartID,
          configs: formData
        };
        await new Promise((resolve, reject) => {
          createApplication({ ...data }, { resolve, reject, url ,clusterID, namespaceID});
        });
      } catch (error) {
        throw new SubmissionError({ _error: error });
      }
    }

    return (
      <div className={classes.root}>
        <ApplicationsPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Breadcrumbs
            data={[
              {
                path: `/applicationStore`,
                name: <FormattedMessage {...messages.applicationStorePage} />,
              },
              {
                name: <FormattedMessage {...messages.createApplication} />,
              },
            ]}
          />
          <Typography component="div" className="">
            <GridContainer className={classes.grid}>
              <GridItem xs={12} sm={12} md={12}>
                <CreateApplicationForm
                  classes={classes}
                  onSubmit={doSubmit}
                  clusters={clusters}
                  namespaces={namespaces}
                  initialValues={fromJS({ name: chartID })}
                  chart={chart}
                  formValues={values}
                />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={submitForm}
                  >
                    <FormattedMessage
                      {...messages.createApplicationButton}
                    />
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.cancleBtn}
                    to="/applicationStore"
                    component={Link}
                  >
                    <FormattedMessage
                      {...messages.cancleApplicationButton}
                    />
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
  clusters: makeSelectClusters(),
  namespaces: makeSelectNamespacesWithoutClusterID(),
  chart: makeSelectCurrentChart(),
  chartID: makeSelectChartID(),
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
)(CreateApplicationPage);

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
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';

// import { makeSelectURL } from 'ducks/nodes/selectors';
import { makeSelectURL } from 'ducks/nodes/selectors';
import * as actions from 'ducks/nodes/actions';
import { makeSelectClusterID } from 'ducks/app/selectors';

import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import messages from './messages';
import styles from './styles';
import NodesPageHelmet from './helmet';
import NodeForm from './NodeForm';

export const formName = 'createNodeForm';

const validate = (values) => {
  const errors = {};
  const requiredFields = [
    'name',
    'clusterDomain',
    'singlecloudAddress',
    'sshUser',
  ];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const CreateNodeForm = reduxForm({
  form: formName,
  validate,
})(NodeForm);

/* eslint-disable react/prefer-stateless-function */
export class CreateNodePage extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const {
      classes,
      submitForm,
      createNode,
      url,
      values,
      clusterID,
    } = this.props;
    async function doSubmit(formValues) {
      try {
        const { ...formData } = formValues.toJS();
        const data = {
          ...formData,
        };
        await new Promise((resolve, reject) => {
          createNode(data, {
            resolve,
            reject,
            url,
          });
        });
      } catch (error) {
        throw new SubmissionError({ _error: error });
      }
    }

    return (
      <div className={classes.root}>
        <NodesPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
            <Breadcrumbs
              data={[
                {
                  path: `/clusters/${clusterID}/manage`,
                  name: <FormattedMessage {...messages.clusterManage} />,
                },
                {
                  name: <FormattedMessage {...messages.createNode} />,
                },
              ]}
            />
          <Typography component="div" className="">
            <GridContainer className={classes.grid}>
              <GridItem xs={12} sm={12} md={12}>
                <CreateNodeForm
                  classes={classes}
                  onSubmit={doSubmit}
                  // initialValues={fromJS({ name: '' })}
                  formValues={values}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={submitForm}
                >
                  <FormattedMessage {...messages.createNodeButton} />
                </Button>
                <Button
                  variant="contained"
                  className={classes.cancleBtn}
                  color="primary"
                  to={`/clusters/${clusterID}/manage`}
                  component={Link}
                >
                  <FormattedMessage {...messages.cancleNodesButton} />
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
  clusterID: makeSelectClusterID(),
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
)(CreateNodePage);

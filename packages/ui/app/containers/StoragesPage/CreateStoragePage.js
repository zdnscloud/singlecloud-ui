/**
 *
 * Create Storage Page
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
import AddIcon from 'components/Icons/Add';
import Button from '@material-ui/core/Button';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';

import { makeSelectClusterID } from 'ducks/app/selectors';
import { makeSelectCurrentCluster } from 'ducks/clusters/selectors';
import * as actions from 'ducks/storages/actions';

import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import messages from './messages';
import styles from './styles';
import StoragesPageHelmet from './helmet';
import StorageForm from './StorageForm';

export const formName = 'createStorageForm';

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

const CreateStorageForm = reduxForm({
  form: formName,
  validate,
})(StorageForm);

/* eslint-disable react/prefer-stateless-function */
export class CreateStoragePage extends React.PureComponent {
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
      createStorage,
    } = this.props;
    const url = cluster.getIn(['links', 'storages']);
    async function doSubmit(formValues) {
      try {
        const name = formValues.get('name');
        await new Promise((resolve, reject) => {
          createStorage({ name }, { resolve, reject, clusterID, url });
        });
      } catch (error) {
        throw new SubmissionError({ _error: error });
      }
    }

    return (
      <div className={classes.root}>
        <StoragesPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Breadcrumbs
            data={[
              {
                path: `/clusters/${clusterID}/storages`,
                name: <FormattedMessage {...messages.pageTitle} />,
              },
              {
                path: `/clusters/${clusterID}/storages/create`,
                name: <FormattedMessage {...messages.createStorage} />,
              },
            ]}
          />
          <Typography component="div" className="">
            <GridContainer className={classes.grid}>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>
                      <FormattedMessage {...messages.createStorage} />
                    </h4>
                  </CardHeader>
                  <CardBody>
                    <CreateStorageForm
                      classes={classes}
                      onSubmit={doSubmit}
                      initialValues={fromJS({ name: '' })}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={submitForm}
                    >
                      <FormattedMessage {...messages.createStorageButton} />
                    </Button>
                  </CardFooter>
                </Card>
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
)(CreateStoragePage);

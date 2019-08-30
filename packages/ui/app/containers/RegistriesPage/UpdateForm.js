import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS } from 'immutable';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import {
  Field,
  Fields,
  FieldArray,
  FormSection,
  reduxForm,
} from 'redux-form/immutable';
import getByKey from '@gsmlg/utils/getByKey';

import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import SelectField from 'components/Field/SelectField';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';
import Button from '@material-ui/core/Button';

import useStyles from './styles';
import messages from './messages';

export const formName = 'updateRegistryForm';

const validate = (values) => {
  const errors = {};
  const requiredFields = [];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const Form = ({
  formValues,
  handleSubmit,
  error,
  clusters,
  role,
  check,
  registry,
}) => {
  const classes = useStyles();
  const clustersOptions = clusters.toList().map((sc) => ({
    label: sc.get('name'),
    value: sc.get('name'),
  }));
  const redirectUrl = registry && registry.getIn(['redirectUrl']);

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <GridContainer>
        {error ? (
          <GridItem xs={12} sm={12} md={12}>
            <Danger>{getByKey(error, ['response', 'message'])}</Danger>
          </GridItem>
        ) : null}
        <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
          <ReadOnlyInput
            label={<FormattedMessage {...messages.formUser} />}
            value={role.get('user')}
            fullWidth
          />
        </GridItem>
        {check && registry ? (
          <Fragment>
            <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
              <ReadOnlyInput
                label={<FormattedMessage {...messages.formIngressDomain} />}
                value={registry.get('ingressDomain')}
                fullWidth
              />
            </GridItem>
            <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
              <ReadOnlyInput
                label={<FormattedMessage {...messages.formCluster} />}
                value={registry.get('cluster')}
                fullWidth
              />
            </GridItem>
            <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => window.open(redirectUrl)}
                disabled={!redirectUrl}
              >
                <FormattedMessage {...messages.openRegistry} />
              </Button>
            </GridItem>
          </Fragment>
        ) : (
          <Fragment>
            <GridItem xs={3} sm={3} md={3}>
              <InputField
                label={<FormattedMessage {...messages.formIngressDomain} />}
                name="ingressDomain"
                fullWidth
                inputProps={{ type: 'text', autoComplete: 'off' }}
              />
            </GridItem>
            <GridItem xs={3} sm={3} md={3}>
              <SelectField
                label={<FormattedMessage {...messages.formCluster} />}
                name="cluster"
                formControlProps={{
                  style: {
                    width: '100%',
                  },
                }}
                classes={classes}
                options={clustersOptions}
              />
            </GridItem>
          </Fragment>
        )}
      </GridContainer>
    </form>
  );
};

const UpdateRegistryForm = reduxForm({
  form: formName,
  validate,
})(Form);

export default UpdateRegistryForm;

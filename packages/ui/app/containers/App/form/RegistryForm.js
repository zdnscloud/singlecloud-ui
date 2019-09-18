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
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';

import useStyles from '../LeftMenuStyle';
import messages from '../messages';

export const formName = 'RegistryForm';

const validate = (values) => {
  const errors = {};
  return errors;
};

const Form = ({ formValues, handleSubmit, error, role }) => {
  const classes = useStyles();

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
            label={<FormattedMessage {...messages.leftMenusDialogFormUser} />}
            value={role.get('user')}
            fullWidth
          />
        </GridItem>
        <GridItem xs={3} sm={3} md={3}>
          <InputField
            label={
              <FormattedMessage
                {...messages.leftMenusDialogFormIngressDomain}
              />
            }
            name="ingressDomain"
            fullWidth
            inputProps={{ type: 'text', autoComplete: 'off' }}
          />
        </GridItem>
        <GridItem xs={3} sm={3} md={3}>
          <InputField
            label={
              <FormattedMessage {...messages.leftMenusDialogFormStorageSize} />
            }
            normalize={(val) => Number(val)}
            name="storageSize"
            fullWidth
            inputProps={{
              type: 'number',
              autoComplete: 'off',
              endAdornment: 'Gi',
            }}
          />
        </GridItem>
      </GridContainer>
    </form>
  );
};

const RegistryForm = reduxForm({
  form: formName,
  validate,
})(Form);

export default RegistryForm;

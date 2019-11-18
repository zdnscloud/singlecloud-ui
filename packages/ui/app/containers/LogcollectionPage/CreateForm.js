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
import TextareaField from 'components/Field/TextareaField';

import useStyles from './styles';
import messages from './messages';

export const formName = 'createFluentbitconfigForm';

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

const Form = ({ formValues, handleSubmit, error }) => {
  const classes = useStyles();

  return (
    <form
      onSubmit={handleSubmit}
      className={getByKey(classes, 'form')}
      style={{ width: '100%' }}
    >
      <GridContainer>
        {error ? (
          <GridItem xs={12} sm={12} md={12}>
            <Danger>{getByKey(error, ['response', 'message'])}</Danger>
          </GridItem>
        ) : null}
        <GridItem xs={12} sm={12} md={12}>
          <GridContainer>
            <GridItem>
              <GridItem xs={9} sm={9} md={9} className={classes.formLine}>
                <TextareaField
                  name="regexp"
                  label={<FormattedMessage {...messages.formRegExp} />}
                  formControlProps={{
                    className: classes.textareaControl,
                  }}
                  fullWidth
                  inputProps={{
                    type: 'text',
                    autoComplete: 'off',
                    rows: '4',
                  }}
                />
              </GridItem>
            </GridItem>
          </GridContainer>
          <GridContainer style={{ margin: 0 }}>
            <GridItem xs={4} sm={4} md={4} className={classes.formLine}>
              <InputField
                label={<FormattedMessage {...messages.formTimeKey} />}
                name="timeKey"
                fullWidth
                inputProps={{ type: 'text', autoComplete: 'off' }}
              />
            </GridItem>
          </GridContainer>
          <GridContainer style={{ margin: 0 }}>
            <GridItem xs={4} sm={4} md={4} className={classes.formLine}>
              <InputField
                label={<FormattedMessage {...messages.formTimeFormat} />}
                name="timeFormat"
                fullWidth
                inputProps={{ type: 'text', autoComplete: 'off' }}
              />
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </form>
  );
};

const CreateFluentbitconfigForm = reduxForm({
  form: formName,
  validate,
})(Form);

export default CreateFluentbitconfigForm;

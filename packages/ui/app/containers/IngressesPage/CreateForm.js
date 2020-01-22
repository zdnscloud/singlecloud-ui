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

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import SwitchField from 'components/Field/SwitchField';
import RadioField from 'components/Field/RadioField';
import SelectField from 'components/Field/SelectField';

import useStyles from './styles';
import messages from './messages';
import RuleTemplate from './form/RuleTemplate';

export const formName = 'createIngressForm';

const validate = (values) => {
  const errors = {};
  const requiredFields = ['name'];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Required';
    }
  });
  const rules = values.get('rules');
  if (!rules || rules.size === 0) {
    errors.rules = [];
    errors.rules._error = 'At least one rule must be add'; // eslint-disable-line
  } else {
    errors.rules = [];
    if (rules.size > 1) {
      const isSame = rules.every(
        (item) => item.get('host') === rules.getIn([0, 'host'])
      );
      if (!isSame) {
        errors.rules._error = 'Host must be the same'; // eslint-disable-line
      }
    }
    rules.forEach((c, i) => {
      if (c) {
        const host = c.get('host');
        const path = c.get('path');
        const err = {};
        if (!host) err.host = 'Required';
        if (!path) err.path = 'Required';
        errors.rules.push(err);
      } else {
        errors.rules.push({ host: 'Required', path: 'Required' });
      }
    });
  }

  return errors;
};

const Form = ({ formValues, handleSubmit, error, services }) => {
  const classes = useStyles();
  const servicesOptions = services.toList().map((sc) => ({
    label: sc.get('name'),
    value: sc.get('name'),
  }));

  return (
    <form onSubmit={handleSubmit} className={getByKey(classes, 'form')}>
      <GridContainer className={classes.contentGrid}>
        {error ? (
          <GridItem xs={12} sm={12} md={12}>
            <Danger>{getByKey(error, ['response', 'message'])}</Danger>
          </GridItem>
        ) : null}
        <Card>
          <CardHeader>
            <h4>
              <FormattedMessage {...messages.createIngress} />
            </h4>
          </CardHeader>
          <CardBody>
            <GridContainer style={{ margin: 0 }}>
              <GridItem xs={3} sm={3} md={3}>
                <InputField
                  label={<FormattedMessage {...messages.formName} />}
                  name="name"
                  fullWidth
                  inputProps={{ type: 'text', autoComplete: 'off' }}
                />
              </GridItem>
              <GridItem xs={3} sm={3} md={3}>
                <InputField
                  label={<FormattedMessage {...messages.formMaxBodySize} />}
                  name="maxBodySize"
                  fullWidth
                  normalize={(val) => (val ? Number(val) : val)}
                  inputProps={{
                    type: 'number',
                    autoComplete: 'off',
                    endAdornment: 'M',
                  }}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h4>
              <FormattedMessage {...messages.configurationDetails} />
            </h4>
          </CardHeader>
          <CardBody>
            <GridContainer style={{ margin: 0 }}>
              <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                <SelectField
                  label={<FormattedMessage {...messages.formServiceName} />}
                  name="serviceName"
                  formControlProps={{
                    style: {
                      width: '100%',
                    },
                  }}
                  options={servicesOptions}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <FieldArray
                  name="rules"
                  classes={classes}
                  component={RuleTemplate}
                  formValues={formValues}
                  services={services}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </GridContainer>
    </form>
  );
};

const CreateIngressForm = reduxForm({
  form: formName,
  validate,
})(Form);

export default CreateIngressForm;

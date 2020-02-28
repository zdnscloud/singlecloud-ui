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
import SelectField from 'components/Field/SelectField';
import SwitchField from 'components/Field/SwitchField';
import RadioField from 'components/Field/RadioField';

import RuleTemplate from './form/RuleTemplate';
import useStyles from './styles';
import messages from './messages';

export const formName = 'createUdpIngressForm';

const validate = (values) => {
  const errors = {};
  const requiredFields = ['serviceName'];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Required';
    }
  });

  return errors;
};

const Form = ({ formValues, handleSubmit, error, services }) => {
  const classes = useStyles();
  const servicesOptions = services.toList().map((sc) => ({
    label: sc.get('name'),
    value: sc.get('name'),
  }));

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <GridContainer className={classes.contentGrid}>
        {error ? (
          <GridItem xs={12} sm={12} md={12}>
            <Danger>{getByKey(error, ['response', 'message'])}</Danger>
          </GridItem>
        ) : null}
        <Card>
          <CardHeader>
            <h4>
              <FormattedMessage {...messages.createUdpIngress} />
            </h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
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

const CreateUdpIngressForm = reduxForm({
  form: formName,
  validate,
})(Form);

export default CreateUdpIngressForm;

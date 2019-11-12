import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS } from 'immutable';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { Form, Field } from 'react-final-form';
import { render } from 'react-dom';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
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

const validate = (values) => {
  const errors = {};
  const requiredFields = ['name'];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const CreateIngressForm = ({ onSubmit, services, formRef, initialValues }) => {
  const classes = useStyles();
  const servicesOptions = services.toList().map((sc) => ({
    label: sc.get('name'),
    value: sc.get('name'),
  }));
  return (
    <Form
      onSubmit={(values) => onSubmit(values)}
      validate={validate}
      initialValues={initialValues}
      mutators={{
        ...arrayMutators,
      }}
    >
      {({ handleSubmit, pristine, reset, submitting, values, submitError }) => (
        <form
          onSubmit={handleSubmit}
          className={getByKey(classes, 'form')}
          ref={formRef}
        >
          <GridContainer className={classes.contentGrid}>
            {submitError ? (
              <GridItem xs={12} sm={12} md={12}>
                <Danger>
                  {getByKey(submitError, ['response', 'message'])}
                </Danger>
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
                </GridContainer>
              </CardBody>
            </Card>
            <Card style={{ margin: 0, marginTop: 20 }}>
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
                      formValues={fromJS(values)}
                      services={services}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridContainer>
        </form>
      )}
    </Form>
  );
};

export default CreateIngressForm;

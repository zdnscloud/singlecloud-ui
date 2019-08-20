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

const Form = ({ formValues, handleSubmit, error, clusters,initialValues}) => {
  const classes = useStyles();
  const clustersOptions = clusters.toList().map((sc) => ({
    label: sc.get('name'),
    value: sc.get('name'),
  }));

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <GridContainer>
        {error ? (
          <GridItem xs={12} sm={12} md={12}>
            <Danger>{getByKey(error, ['response', 'message'])}</Danger>
          </GridItem>
        ) : null}
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                <FormattedMessage {...messages.updateRegistry} />
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer style={{ margin: 0 }}>
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
                    label={
                      <FormattedMessage
                        {...messages.formCluster}
                      />
                    }
                    name='cluster'
                    formControlProps={{
                      style: {
                        width: '100%',
                      },
                    }}
                    classes={classes}
                    options={clustersOptions}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </form>
  );
};

const UpdateRegistryForm = reduxForm({
  form: formName,
  validate,
})(Form);

export default UpdateRegistryForm;

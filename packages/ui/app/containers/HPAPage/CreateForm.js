import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS, Map, List } from 'immutable';
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
import Metrics from './form/Metrics';

export const formName = 'createHPAForm';

const inflection = require('inflection');

const validate = (values) => {
  const errors = {};
  const requiredFields = [
    'name',
    'scaleTargetKind',
    'scaleTargetName',
    'minReplicas',
    'maxReplicas',
  ];
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
  deployments,
  statefulsets,
  type,
}) => {
  const classes = useStyles();
  const scaleTargetKind =
    (formValues && formValues.get('scaleTargetKind')) || '';
  let scaleTargetNameOptions = [];
  let resources = Map({});
  switch (scaleTargetKind) {
    case 'deployment':
      resources = deployments;
      break;
    case 'statefulset':
      resources = statefulsets;
      break;
    default:
      break;
  }

  if (resources.size > 0) {
    scaleTargetNameOptions = resources.toList().map((st) => ({
      label: st.get('name'),
      value: st.get('name'),
    }));
  }

  return (
    <form className={getByKey(classes, 'form')} onSubmit={handleSubmit}>
      <GridContainer>
        {error ? (
          <GridItem xs={12} sm={12} md={12}>
            <Danger>{getByKey(error, ['response', 'message'])}</Danger>
          </GridItem>
        ) : null}
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader>
              {type === 'update' ? (
                <h4>
                  <FormattedMessage {...messages.updateHPA} />
                </h4>
              ) : (
                <h4>
                  <FormattedMessage {...messages.createHPA} />
                </h4>
              )}
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3}>
                  <InputField
                    label={<FormattedMessage {...messages.formName} />}
                    name="name"
                    fullWidth
                    inputProps={{ type: 'text', autoComplete: 'off' }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3}>
                  <SelectField
                    label={
                      <FormattedMessage {...messages.formScaleTargetKind} />
                    }
                    name="scaleTargetKind"
                    formControlProps={{
                      style: {
                        width: '100%',
                      },
                    }}
                    options={[
                      {
                        label: (
                          <FormattedMessage {...messages.formDeployment} />
                        ),
                        value: 'deployment',
                      },
                      {
                        label: (
                          <FormattedMessage {...messages.formStatefulset} />
                        ),
                        value: 'statefulset',
                      },
                    ]}
                  />
                </GridItem>
                <GridItem xs={3} sm={3} md={3}>
                  <SelectField
                    label={
                      <FormattedMessage {...messages.formScaleTargetName} />
                    }
                    name="scaleTargetName"
                    formControlProps={{
                      style: {
                        width: '100%',
                      },
                    }}
                    options={scaleTargetNameOptions}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3}>
                  <InputField
                    label={<FormattedMessage {...messages.formMinReplicas} />}
                    name="minReplicas"
                    normalize={(val) => (val ? Number(val) : val)}
                    fullWidth
                    inputProps={{
                      type: 'number',
                      autoComplete: 'off',
                      min: 1,
                      max: 255,
                    }}
                  />
                </GridItem>
                <GridItem xs={3} sm={3} md={3}>
                  <InputField
                    label={<FormattedMessage {...messages.formMaxReplicas} />}
                    name="maxReplicas"
                    normalize={(val) => (val ? Number(val) : val)}
                    fullWidth
                    inputProps={{
                      type: 'number',
                      autoComplete: 'off',
                      min: 1,
                      max: 255,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer style={{ marginTop: 30 }}>
                <GridItem xs={3} sm={3} md={3}>
                  <SelectField
                    label={<FormattedMessage {...messages.formMetricsType} />}
                    name="metricsType"
                    formControlProps={{
                      style: {
                        width: '100%',
                      },
                    }}
                    options={[
                      {
                        label: (
                          <FormattedMessage {...messages.formResourceMetrics} />
                        ),
                        value: 'resourceMetrics',
                      },
                      {
                        label: (
                          <FormattedMessage {...messages.formCustomMetrics} />
                        ),
                        value: 'customMetrics',
                      },
                    ]}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <FieldArray
                    name="metrics"
                    classes={classes}
                    component={Metrics}
                    formValues={formValues}
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

const CreateHPAForm = reduxForm({
  form: formName,
  validate,
})(Form);

export default CreateHPAForm;

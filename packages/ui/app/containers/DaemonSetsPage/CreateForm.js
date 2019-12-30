import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS, is } from 'immutable';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import {
  Field,
  Fields,
  FieldArray,
  reduxForm,
  FormSection,
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
import CheckboxField from 'components/Field/CheckboxField';

import Containers from './form/Containers';
import VolumeClaimTemplate from './form/VolumeClaimTemplate';
import messages from './messages';
import useStyles from './styles';
export const formName = 'createDaemonSetForm';

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

export const Form = ({
  handleSubmit,
  error,
  configMaps,
  secrets,
  storageClasses,
  formValues,
  role,
}) => {
  const classes = useStyles();

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
              <h4>
                {role === 'update' ? (
                  <FormattedMessage {...messages.updateDaemonSet} />
                ) : (
                  <FormattedMessage {...messages.createDaemonSet} />
                )}
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer style={{ margin: 0 }}>
                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                  <InputField
                    label={<FormattedMessage {...messages.formName} />}
                    name="name"
                    fullWidth
                    disabled={role === 'update'}
                    inputProps={{ type: 'text', autoComplete: 'off' }}
                  />
                </GridItem>
                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                  <CheckboxField
                    name="injectServiceMesh"
                    label={
                      <FormattedMessage {...messages.formInjectServiceMesh} />
                    }
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <FieldArray
            name="containers"
            classes={classes}
            component={Containers}
            configMaps={configMaps}
            secrets={secrets}
            formValues={formValues}
            role={role}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader>
              <h4>
                <FormattedMessage {...messages.formServiceConfig} />
              </h4>
            </CardHeader>
            <CardBody>
              <FormSection name="advancedOptions">
                <GridContainer>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={12}
                    className={classes.formLine}
                  >
                    <SwitchField
                      name="reloadWhenConfigChange"
                      label={
                        <FormattedMessage
                          {...messages.formReloadWhenConfigChange}
                        />
                      }
                      disabled={role === 'update'}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <InputField
                      label={
                        <FormattedMessage {...messages.formExposedMetricPath} />
                      }
                      fullWidth
                      inputProps={{ type: 'text', autoComplete: 'off' }}
                      name="exposedMetric.path"
                      disabled={role === 'update'}
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <InputField
                      label={
                        <FormattedMessage {...messages.formExposedMeticPort} />
                      }
                      normalize={(val) => (val ? Number(val) : val)}
                      fullWidth
                      inputProps={{
                        type: 'number',
                        autoComplete: 'off',
                        min: 1,
                        max: 65535,
                      }}
                      name="exposedMetric.port"
                      disabled={role === 'update'}
                    />
                  </GridItem>
                </GridContainer>
              </FormSection>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader>
              <h4>
                <FormattedMessage {...messages.formVolumeClaimTemplate} />
              </h4>
            </CardHeader>
            <CardBody>
              <FieldArray
                name="persistentVolumes"
                classes={classes}
                component={VolumeClaimTemplate}
                formValues={formValues}
                storageClasses={storageClasses}
                role={role}
              />
            </CardBody>
          </Card>
        </GridItem>
        {role === 'update' ? (
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.formUpdateMemo} />
                </h4>
              </CardHeader>
              <CardBody>
                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                  <InputField
                    label={<FormattedMessage {...messages.formMemo} />}
                    fullWidth
                    inputProps={{ type: 'text', autoComplete: 'off' }}
                    name="memo"
                  />
                </GridItem>
              </CardBody>
            </Card>
          </GridItem>
        ) : null}
      </GridContainer>
    </form>
  );
};

const DaemonSetForm = reduxForm({
  form: formName,
  validate,
})(Form);

export default DaemonSetForm;

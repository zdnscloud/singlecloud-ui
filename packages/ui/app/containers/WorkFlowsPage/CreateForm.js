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
import CheckboxField from 'components/Field/CheckboxField';
import InputField from 'components/Field/InputField';
import SelectField from 'components/Field/SelectField';
import SwitchField from 'components/Field/SwitchField';
import RadioField from 'components/Field/RadioField';

import useStyles from './styles';
import messages from './messages';
import Containers from './form/Containers';
import VolumeClaimTemplate from './form/VolumeClaimTemplate';

export const formName = 'createWorkFlowForm';

const validate = (values) => {
  const errors = { git:{} ,image:{}};
  const requiredFields = ['name'];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Required';
    }
  });
  const gitFields = ['repositoryUrl','revision','user','password'];
  gitFields.forEach((field) => {
    if (!values.getIn(['git',field])) {
      errors.git[field] = 'Required';
    }
  });
  const imageFields = ['name','registryUser','registryPassword'];
  imageFields.forEach((field) => {
    if (!values.getIn(['image',field])) {
      errors.image[field] = 'Required';
    }
  });
  return errors;
};

const Form = ({
  formValues,
  handleSubmit,
  error,
  configMaps,
  secrets,
  storageClasses,
  role,
  pvc,
}) => {
  const classes = useStyles();
  const options =[];

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
            <CardBody>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3}>
                  <InputField
                    label={<FormattedMessage {...messages.formName} />}
                    name="name"
                    fullWidth
                    disabled={role === 'update'}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader>
              <h4>
                <FormattedMessage {...messages.formBuildConfiguration } />
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3}>
                  <InputField
                    label={<FormattedMessage {...messages.formGitRepositoryUrl} />}
                    name="git.repositoryUrl"
                    fullWidth
                  />
                </GridItem>
                <GridItem xs={3} sm={3} md={3}>
                  <InputField
                    label={<FormattedMessage {...messages.formGitRevision} />}
                    name="git.revision"
                    fullWidth
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3}>
                  <InputField
                    label={<FormattedMessage {...messages.formGitUser} />}
                    name="git.user"
                    fullWidth
                  />
                </GridItem>
                <GridItem xs={3} sm={3} md={3}>
                  <InputField
                    label={<FormattedMessage {...messages.formGitPassword} />}
                    name="git.password"
                    fullWidth
                    inputProps={ { type: 'password', autoComplete: 'off' } }
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardBody>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3}>
                  <InputField
                    label={<FormattedMessage {...messages.formImageName} />}
                    name="image.name"
                    fullWidth
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3}>
                  <InputField
                    label={<FormattedMessage {...messages.formImageRegistryUser} />}
                    name="image.registryUser"
                    fullWidth
                  />
                </GridItem>
                <GridItem xs={3} sm={3} md={3}>
                  <InputField
                    label={<FormattedMessage {...messages.formImageRegistryPassword} />}
                    name="image.registryPassword"
                    fullWidth
                    inputProps={ { type: 'password', autoComplete: 'off' } }
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardBody>
              <GridContainer>
                <GridItem xs={2} sm={2} md={2}>
                  <span className={classes.serviceConfig}>
                    <FormattedMessage {...messages.formServiceConfiguration} />:
                  </span>
                </GridItem>
                <GridItem xs={3} sm={3} md={3}>
                  <SwitchField
                    name="autoDeploy"
                    label={<FormattedMessage {...messages.formAutoDeploy} />}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
        
        {formValues && formValues.get('autoDeploy') ? (
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.formDeploymentConfiguration } />
                </h4>
              </CardHeader>
              <CardBody>
                <FormSection name="deploy">
                  <GridContainer>
                    <GridItem xs={3} sm={3} md={3}>
                      <InputField
                        label={<FormattedMessage {...messages.formReplicas} />}
                        name="replicas"
                        fullWidth
                        disabled={role === 'update'}
                        normalize={(val) => (val ? Number(val) : val)}
                        inputProps={ { 
                          type: 'number',
                          autoComplete: 'off',
                          min: 1,
                          max: 255,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                      <CheckboxField
                        name="advancedOptions.injectServiceMesh"
                        label={
                          <FormattedMessage {...messages.formInjectServiceMesh} />
                        }
                        disabled={role === 'update'}
                      />
                    </GridItem>
                  </GridContainer>
              
                  <FieldArray 
                    name="containers" 
                    component={Containers} 
                    classes={classes} 
                    formValues={formValues}
                    configMaps={configMaps}
                    secrets={secrets}
                    role={role}
                  />
            
                  <GridContainer>
                    <GridItem xs={3} sm={3} md={3}>
                      <InputField
                        label={<FormattedMessage {...messages.formExposedMetricPath} />}
                        name="advancedOptions.exposedMetric.path"
                        fullWidth
                        disabled={role === 'update'}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                      <InputField
                        label={<FormattedMessage {...messages.formExposedMetricPort} />}
                        name="advancedOptions.exposedMetric.port"
                        fullWidth
                        normalize={(val) => (val ? Number(val) : val)}
                        inputProps={{
                          type: 'number',
                          autoComplete: 'off',
                          min: 1,
                          max: 65535,
                        }}
                        disabled={role === 'update'}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <FieldArray 
                        name="persistentVolumes" 
                        classes={classes} 
                        formValues={formValues}
                        component={VolumeClaimTemplate}
                        storageClasses={storageClasses}
                        role={role}
                        pvc={pvc}
                      />
                    </GridItem>
                  </GridContainer>
                </FormSection>
              </CardBody>
            </Card>
          </GridItem> 
        ):null}      
      </GridContainer>
    </form>
  );
}

const CreateWorkFlowForm = reduxForm({
  form: formName,
  validate,
})(Form);

export default CreateWorkFlowForm;

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
import EnvTemplate from './form/EnvTemplate';
import VolumeTemplate from './form/VolumeTemplate';
import ExposedPortTemplate from './form/ExposedPortTemplate';
import PersistentVolumeTemplate from './form/PersistentVolumeTemplate';

export const formName = 'createCicdForm';

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

const Form = ({
  formValues,
  handleSubmit,
  error,
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
                    inputProps={ { type: 'text', autoComplete: 'off' } }
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
                    inputProps={ { type: 'text', autoComplete: 'off' } }
                  />
                </GridItem>
                <GridItem xs={3} sm={3} md={3}>
                  <InputField
                    label={<FormattedMessage {...messages.formGitRevision} />}
                    name="git.revision"
                    fullWidth
                    inputProps={ { type: 'text', autoComplete: 'off' } }
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3}>
                  <InputField
                    label={<FormattedMessage {...messages.formGitUser} />}
                    name="git.user"
                    fullWidth
                    inputProps={ { type: 'text', autoComplete: 'off' } }
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
                    inputProps={ { type: 'text', autoComplete: 'off' } }
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3}>
                  <InputField
                    label={<FormattedMessage {...messages.formImageRegistryUser} />}
                    name="image.registryUser"
                    fullWidth
                    inputProps={ { type: 'text', autoComplete: 'off' } }
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
            <CardHeader>
              <h4>
                <FormattedMessage {...messages.formDeploymentConfiguration } />
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3}>
                  <SelectField
                    label={
                      <FormattedMessage {...messages.formName} />
                    }
                    name="name"
                    formControlProps={{
                      style: {
                        width: '100%',
                      },
                    }}
                    options={options}
                  />
                </GridItem>
                <GridItem xs={3} sm={3} md={3}>
                  <InputField
                    label={<FormattedMessage {...messages.formReplicas} />}
                    name="deploy.replicas"
                    fullWidth
                    inputProps={ { type: 'text', autoComplete: 'off' } }
                  />
                </GridItem>
                <GridItem xs={3} sm={3} md={3}>
                  <CheckboxField
                    name="deploy.advancedOptions.injectServiceMesh"
                    label={
                      <FormattedMessage {...messages.formInjectServiceMesh} />
                    }
                    // disabled={role === 'update'}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3}>
                  <InputField
                    label={<FormattedMessage {...messages.formContainerName} />}
                    name="deploy.container.name"
                    fullWidth
                    inputProps={ { type: 'text', autoComplete: 'off' } }
                  />
                </GridItem>
                <GridItem xs={3} sm={3} md={3}>
                  <InputField
                    label={<FormattedMessage {...messages.formContainerCommand} />}
                    name="deploy.container.command"
                    fullWidth
                    inputProps={ { type: 'text', autoComplete: 'off' } }
                  />
                </GridItem>
                <GridItem xs={3} sm={3} md={3}>
                  <InputField
                    label={<FormattedMessage {...messages.formContainerArgs} />}
                    name="deploy.container.args"
                    fullWidth
                    inputProps={ { type: 'text', autoComplete: 'off' } }
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <FieldArray 
                    name="deploy.container.env" 
                    component={EnvTemplate} 
                    classes={classes} 
                    formValues={formValues}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <FieldArray 
                    name="deploy.container.volumes" 
                    component={VolumeTemplate} 
                    classes={classes} 
                    formValues={formValues}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <FieldArray 
                    name="deploy.container.exposedPorts" 
                    component={ExposedPortTemplate} 
                    classes={classes} 
                    formValues={formValues}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3}>
                  <span className={classes.serviceConfig}>
                    <FormattedMessage {...messages.formServiceConfiguration} />:
                  </span>
                  <CheckboxField
                    name="autoDeploy"
                    label={
                      <FormattedMessage {...messages.formAutoDeploy} />
                    }
                    // disabled={role === 'update'}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3}>
                  <InputField
                    label={<FormattedMessage {...messages.formExposedMetricPath} />}
                    name="deploy.advancedOptions.exposedMetric.path"
                    fullWidth
                    inputProps={ { type: 'text', autoComplete: 'off' } }
                  />
                </GridItem>
                <GridItem xs={3} sm={3} md={3}>
                  <InputField
                    label={<FormattedMessage {...messages.formExposedMetricPort} />}
                    name="deploy.advancedOptions.exposedMetric.port"
                    fullWidth
                    inputProps={ { type: 'text', autoComplete: 'off' } }
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <FieldArray 
                    name="deploy.persistentVolumeTemplate" 
                    component={PersistentVolumeTemplate} 
                    classes={classes} 
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
}

const CreateCicdForm = reduxForm({
  form: formName,
  validate,
})(Form);

export default CreateCicdForm;

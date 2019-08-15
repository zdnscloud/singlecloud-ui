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

import Containers from './form/Containers';
import VolumeClaimTemplate from './form/VolumeClaimTemplate';
import messages from './messages';

class StatefulSetForm extends PureComponent {
  state = {};

  render() {
    const {
      clusters,
      handleSubmit,
      pristine,
      reset,
      submitting,
      error,
      classes,
      edit,
      initialValues,
      configMaps,
      secrets,
      storageClasses,
      formValues,
      theme,
    } = this.props;
    const getPorts = (formData) => {
      if (formData && formData.get) {
        const containers = formData.get('containers');
        if (containers && containers.map) {
          return containers
            .map((ctn) => {
              const exposedPorts = ctn && ctn.get && ctn.get('exposedPorts');
              if (exposedPorts) {
                return ctn.get('exposedPorts').filter((p) => {
                  const port = p && ((p.get && p.get('port')) || p.port);
                  return typeof port === 'number';
                });
              }
              return fromJS([]);
            })
            .flatten(true);
        }
        return fromJS([]);
      }
      return fromJS([]);
    };
    const ports = getPorts(formValues);

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
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  <FormattedMessage {...messages.createStatefulSet} />
                </h4>
              </CardHeader>
              <CardBody>
                <GridContainer style={{ margin: 0 }}>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <InputField
                      label={<FormattedMessage {...messages.formName} />}
                      name="name"
                      fullWidth
                      inputProps={{ type: 'text', autoComplete: 'off' }}
                      classes={classes}
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <InputField
                      label={<FormattedMessage {...messages.formReplicas} />}
                      name="replicas"
                      normalize={(val) => Number(val)}
                      fullWidth
                      inputProps={{
                        type: 'number',
                        autoComplete: 'off',
                        min: 1,
                        max: 255,
                      }}
                      classes={classes}
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
              theme={theme}
              formValues={formValues}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
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
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem
                      xs={3}
                      sm={3}
                      md={3}
                      className={classes.formLine}
                    >
                      <InputField
                        label={
                          <FormattedMessage
                            {...messages.formExposedMetricPath}
                          />
                        }
                        fullWidth
                        inputProps={{ type: 'text', autoComplete: 'off' }}
                        name="exposedMetric.path"
                      />
                    </GridItem>
                    <GridItem
                      xs={3}
                      sm={3}
                      md={3}
                      className={classes.formLine}
                    >
                      <InputField
                        label={
                          <FormattedMessage
                            {...messages.formExposedMeticPort}
                          />
                        }
                        normalize={(val) => Number(val)}
                        fullWidth
                        inputProps={{
                          type: 'number',
                          autoComplete: 'off',
                          min: 1,
                          max: 65535,
                        }}
                        name="exposedMetric.port"
                      />
                    </GridItem>
                  </GridContainer>
                </FormSection>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  <FormattedMessage {...messages.formVolumeClaimTemplate} />
                </h4>
              </CardHeader>
              <CardBody>
                <FieldArray
                  name="persistentVolumes"
                  classes={classes}
                  component={VolumeClaimTemplate}
                  theme={theme}
                  formValues={formValues}
                  storageClasses={storageClasses}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </form>
    );
  }
}

export default StatefulSetForm;

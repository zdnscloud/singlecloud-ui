import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS, is } from 'immutable';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'redux-form/immutable';
import getByKey from '@gsmlg/utils/getByKey';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import SelectField from 'components/Field/SelectField';

import Containers from './form/Containers';
import messages from './messages';

class CronJobForm extends PureComponent {
  state = {};

  render() {
    const {
      handleSubmit,
      error,
      classes,
      configMaps,
      formValues,
      theme,
      secrets,
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
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.createCronJob} />
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
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <InputField
                      label={<FormattedMessage {...messages.formSchedule} />}
                      name="schedule"
                      fullWidth
                      inputProps={{ type: 'text', autoComplete: 'off' }}
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <SelectField
                      label={
                        <FormattedMessage {...messages.formRestartPolicy} />
                      }
                      name="restartPolicy"
                      options={[
                        {
                          label: 'OnFailure',
                          value: 'OnFailure',
                        },
                        {
                          label: 'Never',
                          value: 'Never',
                        },
                      ]}
                      formControlProps={{
                        style: {
                          width: '100%',
                        },
                      }}
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
              secrets={secrets}
              component={Containers}
              configMaps={configMaps}
              theme={theme}
              formValues={formValues}
            />
          </GridItem>
        </GridContainer>
      </form>
    );
  }
}

export default CronJobForm;

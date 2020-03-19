import React, { Fragment, useState } from 'react';
import { fromJS, is } from 'immutable';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import MinusIcon from 'components/Icons/Minus';
import SelectField from 'components/Field/SelectField';

import messages from '../messages';

export const Volumes = ({
  fields,
  classes,
  meta: { error, submitFailed },
  configMapsOptions,
  secretsOptions,
  containerIndex,
  formValues,
  role,
}) => (
  <Fragment>
    <GridContainer>
      <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
        {role === 'update' ? (<p><FormattedMessage {...messages.formVolumeBtn} /></p>):(
          <Button
            className={classes.addNodeBtn}
            style={{ marginBottom: fields && fields.length > 0 ? 25 : 0 }}
            variant="contained" color="primary"
            onClick={(evt) =>
              fields.push(fromJS({}))
            }
          >
            <AddIcon className={classes.plusIcon} />
            <FormattedMessage {...messages.formVolumeBtn} />
          </Button>
        )}
      </GridItem>
    </GridContainer>
    <Card  className={classes.addList} border={fields&&fields.length>0 ? 'border':null } >
      <CardBody>
        {fields.map((f, i) => {
          let names = [];
          const type =
             formValues &&
             formValues.getIn(['deploy','containers', containerIndex, 'volumes', i, 'type']);
          const pvs = formValues && formValues.getIn(['deploy','persistentVolumes']);
          switch (type) {
            case 'configmap':
              names = configMapsOptions;
              break;
            case 'secret':
              names = secretsOptions;
              break;
            case 'persistentVolume':
              if (pvs && pvs.size > 0) {
                names = pvs.toList().map((pv) => ({
                  label: pv.get('name'),
                  value: pv.get('name'),
                }));
              }
              break;
            default:
              break;
          }
          return (
            <GridContainer key={i}>
              <GridItem xs={3} sm={3} md={3}>
                <SelectField
                  name={`${f}.type`}
                  label={<FormattedMessage {...messages.formVolumeType} />}
                  options={[
                    {
                      label: (
                        <FormattedMessage {...messages.formVolumeTypeConfigMap} />
                      ),
                      value: 'configmap',
                    },
                    {
                      label: (
                        <FormattedMessage {...messages.formVolumeTypeSecret} />
                      ),
                      value: 'secret',
                    },
                    {
                      label: (
                        <FormattedMessage
                          {...messages.formVolumeTypePersistentVolume}
                        />
                      ),
                      value: 'persistentVolume',
                    },
                  ]}
                  formControlProps={{
                    style: {
                      width: '100%',
                    },
                  }}
                  disabled={role === 'update'}
                />
              </GridItem>
              <GridItem xs={3} sm={3} md={3}>
                <SelectField
                  name={`${f}.name`}
                  label={<FormattedMessage {...messages.formVolumeName} />}
                  formControlProps={{
                    style: {
                      width: '100%',
                    },
                  }}
                  disabled={role === 'update'}
                  options={names}
                />
              </GridItem>
              <GridItem xs={3} sm={3} md={3}>
                <InputField
                  name={`${f}.mountPath`}
                  fullWidth
                  label={<FormattedMessage {...messages.formVolumeMountPath} />}
                />
              </GridItem>
              <GridItem xs={3} sm={3} md={3}>
                <IconButton
                  variant="contained"
                  onClick={(evt) => fields.remove(i)}
                  className={classes.minusIcon}
                >
                  <MinusIcon />
                </IconButton>
              </GridItem>
            </GridContainer>
          )
        })}
      </CardBody>
    </Card>
  </Fragment>
);

export default Volumes;

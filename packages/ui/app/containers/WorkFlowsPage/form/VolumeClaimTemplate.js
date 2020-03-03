import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS, is } from 'immutable';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import MinusIcon from 'components/Icons/Minus';
import SelectField from 'components/Field/SelectField';
import RadioField from 'components/Field/RadioField';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';

import messages from '../messages';

export const VolumeClaimTemplate = ({
  fields,
  classes,
  formValues,
  meta: { error, submitFailed },
  storageClasses,
  role,
  pvc,
}) => {
  const storageClassesOptions = storageClasses.toList().map((sc) => ({
    label: sc.get('name'),
    value: sc.get('name'),
  }));
  const pvcList = pvc.filter((s) => s.get('used') === false);
  const pvcOptions = pvcList.toList().map((sc) => ({
    label: sc.get('name'),
    value: sc.get('name'),
  }));
  const renderTemplateName = (f, i, pvcStatus) => {
    if (pvcStatus && pvcStatus === 'exist') {
      return (
        <SelectField
          label={<FormattedMessage {...messages.formPvName} />}
          name={`${f}.name`}
          formControlProps={{
            style: {
              width: '100%',
            },
          }}
          classes={classes}
          options={pvcOptions}
        />
      );
    }
    return (
      <InputField
        label={<FormattedMessage {...messages.formPvName} />}
        name={`${f}.name`}
        fullWidth
        disabled={role === 'update'}
      />
    );
  };
  const renderTemplateSize = (f, i, pvcStatus) => {
    const name =
      formValues && formValues.getIn(['deploy','persistentVolumes', i, 'name']);
    if (pvcStatus && pvcStatus === 'exist' && name) {
      return (
        <ReadOnlyInput
          label={<FormattedMessage {...messages.formPvSize} />}
          value={pvc.getIn([name, 'actualStorageSize'])}
          fullWidth
          inputProps={{
            type: 'text',
            autoComplete: 'off',
          }}
        />
      );
    }
    return (
      <InputField
        label={<FormattedMessage {...messages.formPvSize} />}
        name={`${f}.size`}
        fullWidth
        inputProps={{
          type: 'text',
          autoComplete: 'off',
          endAdornment: role === 'update' ? null : 'Gi',
        }}
        disabled={role === 'update'}
      />
    );
  };
  return (
    <Fragment>
      <GridContainer>
        <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
          {role === 'update' ?  <p><FormattedMessage {...messages.formPersistentVolumeBtn} /></p> : (
            <Button
              className={classes.addNodeBtn}
              variant="contained" color="primary"
              onClick={(evt) =>
                fields.push(fromJS({}))
              }
            >
              <span className={classes.plusIcon}>+</span>
              <FormattedMessage {...messages.formPersistentVolumeBtn} />
            </Button>
          )}
         
        </GridItem>
      </GridContainer>
      {submitFailed && error && (
        <ListItem>
          <Danger>{error}</Danger>
        </ListItem>
      )}
      <Card  className={classes.addList} border={fields&&fields.length>0 ? 'border':null } >
        <CardBody>
          {fields.map((f, i) => {
            let storageOptions = storageClassesOptions;
            const pvStatus =
            formValues && formValues.getIn(['deploy','persistentVolumes', i, 'pvStatus']);
            if (pvStatus && pvStatus === 'exist') {
              storageOptions = storageClassesOptions.filter(
                (s) => s.value === 'cephfs'
              );
            }
            return(
              <GridContainer key={i}>
                {role === 'update' ? null : (
                  <GridItem xs={4} sm={4} md={4} className={classes.radioWrap}>
                    <RadioField
                      name={`${f}.pvStatus`}
                      label={
                        <FormattedMessage
                          {...messages.formPvStatus}
                        />
                      }
                      classes={{
                        formControl: classes.radioControl,
                        formLabel: classes.radioLabel,
                        group: classes.radioGroup,
                      }}
                      options={[
                        {
                          label: (
                            <FormattedMessage
                              {...messages.formPvCreate}
                            />
                          ),
                          value: 'create',
                        },
                        {
                          label: (
                            <FormattedMessage
                              {...messages.formPvExist}
                            />
                          ),
                          value: 'exist',
                        },
                      ]}
                      formControlComponent="div"
                      formLabelComponent="div"
                    />
                  </GridItem>
                )}
                <GridItem xs={3} sm={3} md={3}>
                  {renderTemplateName(f, i, pvStatus)}
                </GridItem>
                <GridItem xs={1} sm={1} md={1}>
                  {renderTemplateSize(f, i, pvStatus)}
                </GridItem>
                <GridItem xs={3} sm={3} md={3}>
                  <SelectField
                    label={
                      <FormattedMessage {...messages.formPvStorageClassName} />
                    }
                    name={`${f}.storageClassName`}
                    formControlProps={{
                      style: {
                        width: '100%',
                      },
                    }}
                    options={storageOptions}
                    disabled={role === 'update'}
                  />
                </GridItem>
                {role === 'update' ? null : (
                  <GridItem xs={1} sm={1} md={1}>
                    <IconButton
                      variant="contained"
                      onClick={(evt) => fields.remove(i)}
                      className={classes.minusIcon}
                    >
                      <MinusIcon />
                    </IconButton>
                  </GridItem>
                )}
              </GridContainer>
            )
          }
          )}
        </CardBody>
      </Card>
    </Fragment>
  )
};

export default VolumeClaimTemplate;

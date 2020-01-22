import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS, is } from 'immutable';
import { FormattedMessage } from 'react-intl';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import SelectField from 'components/Field/SelectField';
import PlusIcon from 'components/Icons/Plus';
import MinusIcon from 'components/Icons/Minus';
import RadioField from 'components/Field/RadioField';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';

import useStyles from '../styles';
import messages from '../messages';

const VolumeClaimTemplate = ({
  fields,
  storageClasses,
  meta: { error, submitFailed },
  role,
  // pvc,
  formValues,
}) => {
  const classes = useStyles();
  const storageClassesOptions = storageClasses.toList().map((sc) => ({
    label: sc.get('name'),
    value: sc.get('name'),
  }));
  // const pvcList = pvc.filter((s) => s.get('used') === false);
  // const pvcOptions = pvcList.toList().map((sc) => ({
  //   label: sc.get('name'),
  //   value: sc.get('name'),
  // }));

  const renderTemplateName = (f, i, pvcStatus) => {
    if (pvcStatus && pvcStatus === 'exist') {
      return (
        <SelectField
          label={<FormattedMessage {...messages.formVolumeClaimTemplateName} />}
          name={`${f}.name`}
          formControlProps={{
            style: {
              width: '100%',
            },
          }}
          classes={classes}
          // options={pvcOptions}
        />
      );
    }
    return (
      <InputField
        label={<FormattedMessage {...messages.formVolumeClaimTemplateName} />}
        name={`${f}.name`}
        fullWidth
        inputProps={{ type: 'text', autoComplete: 'off' }}
        disabled={role === 'update'}
      />
    );
  };

  const renderTemplateSize = (f, i, pvcStatus) => {
    const name =
      formValues && formValues.getIn(['persistentVolumes', i, 'name']);
    if (pvcStatus && pvcStatus === 'exist' && name) {
      return (
        <ReadOnlyInput
          label={<FormattedMessage {...messages.formVolumeClaimTemplateSize} />}
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
        label={<FormattedMessage {...messages.formVolumeClaimTemplateSize} />}
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
          {role === 'update' ? null : (
            <Button
              color="secondary"
              onClick={(evt) => fields.push(fromJS({}))}
            >
              <FormattedMessage {...messages.formAddVolumeClaimTemplate} />
              <PlusIcon />
            </Button>
          )}
        </GridItem>
      </GridContainer>
      {submitFailed && error && (
        <ListItem>
          <Danger>{error}</Danger>
        </ListItem>
      )}
      {fields.map((f, i) => {
        const pvcStatus = 'create';
        // const pvcStatus =
        //   formValues && formValues.getIn(['persistentVolumes', i, 'pvcStatus']);
        // if (pvcStatus && pvcStatus === 'exist') {
        //   storageClassesOptions = storageClassesOptions.filter(
        //     (s) => s.value === 'cephfs'
        //   );
        // }
        return (
          <GridContainer key={i}>
            {/* {role === 'update' ? null : (
              <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                <RadioField
                  name={`${f}.pvcStatus`}
                  label={
                    <FormattedMessage
                      {...messages.formVolumeClaimTemplateStatus}
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
                          {...messages.formVolumeClaimTemplateCreate}
                        />
                      ),
                      value: 'create',
                    },
                    {
                      label: (
                        <FormattedMessage
                          {...messages.formVolumeClaimTemplateExist}
                        />
                      ),
                      value: 'exist',
                    },
                  ]}
                  formControlComponent="div"
                  formLabelComponent="div"
                />
              </GridItem>
            )} */}

            <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
              {renderTemplateName(f, i, pvcStatus)}
            </GridItem>
            {/* <GridItem xs={2} sm={2} md={2} className={classes.formLine}> */}
            <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
              {renderTemplateSize(f, i, pvcStatus)}
            </GridItem>
            {/* <GridItem xs={2} sm={2} md={2} className={classes.formLine}>
             */}
            <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
              <SelectField
                label={
                  <FormattedMessage
                    {...messages.formVolumeClaimTemplateStorageClassName}
                  />
                }
                name={`${f}.storageClassName`}
                formControlProps={{
                  style: {
                    width: '100%',
                  },
                }}
                classes={classes}
                options={storageClassesOptions}
                disabled={role === 'update'}
              />
            </GridItem>
            {role === 'update' ? null : (
              <GridItem
                xs={1}
                sm={1}
                md={1}
                className={classes.formLine}
                style={{ paddingTop: 10 }}
              >
                <IconButton
                  variant="contained"
                  onClick={(evt) => fields.remove(i)}
                >
                  <MinusIcon />
                </IconButton>
              </GridItem>
            )}
          </GridContainer>
        );
      })}
    </Fragment>
  );
};

export default VolumeClaimTemplate;

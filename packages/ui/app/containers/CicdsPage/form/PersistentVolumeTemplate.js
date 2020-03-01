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

import messages from '../messages';

export const PersistentVolumeTemplate = ({
  fields,
  classes,
  meta: { error, submitFailed },
}) => {
  const options =[];
  return (
    <Fragment>
      <GridContainer>
        <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
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
        </GridItem>
      </GridContainer>
      {submitFailed && error && (
        <ListItem>
          <Danger>{error}</Danger>
        </ListItem>
      )}
      <Card  className={classes.addList} border={fields&&fields.length>0 ? 'border':null } >
        <CardBody>
          {fields.map((f, i) => (
            <GridContainer key={i}>
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
              <GridItem xs={3} sm={3} md={3}>
                <SelectField
                  label={
                    <FormattedMessage {...messages.formPvName} />
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
              <GridItem xs={1} sm={1} md={1}>
                <InputField
                  name={`${f}.size`}
                  fullWidth
                  inputProps={{
                    autoComplete: 'off',
                    endAdornment: 'Gi',
                  }}
                  label={<FormattedMessage {...messages.formPvSize} />}
                />
              </GridItem>
              <GridItem xs={3} sm={3} md={3}>
                <SelectField
                  label={
                    <FormattedMessage {...messages.formPvStorageClassName} />
                  }
                  name="storageClassName"
                  formControlProps={{
                    style: {
                      width: '100%',
                    },
                  }}
                  options={options}
                />
              </GridItem>
              <GridItem xs={1} sm={1} md={1}>
                <IconButton
                  variant="contained"
                  onClick={(evt) => fields.remove(i)}
                  className={classes.minusIcon}
                >
                  <MinusIcon />
                </IconButton>
              </GridItem>
            </GridContainer>
          ))}
        </CardBody>
      </Card>
     
    </Fragment>
  )
};

export default PersistentVolumeTemplate;

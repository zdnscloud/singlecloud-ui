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

import useStyles from '../styles';
import messages from '../messages';

const VolumeClaimTemplate = ({
  fields,
  storageClasses,
  meta: { error, submitFailed },
}) => {
  const classes = useStyles();
  const storageClassesOptions = storageClasses.toList().map((sc) => ({
  label: sc.get('name'),
    value: sc.get('name'),
  }));

  return (
    <Fragment>
      <GridContainer>
        <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
          <Button color="secondary" onClick={(evt) => fields.push(fromJS({}))}>
            <FormattedMessage {...messages.formAddVolumeClaimTemplate} />
            <PlusIcon />
          </Button>
        </GridItem>
      </GridContainer>
      {submitFailed && error && (
        <ListItem>
          <Danger>{error}</Danger>
        </ListItem>
      )}
      {fields.map((f, i) => (
        <GridContainer key={i}>
          <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
            <InputField
              label={
                <FormattedMessage {...messages.formVolumeClaimTemplateName} />
              }
              name={`${f}.name`}
              fullWidth
              inputProps={{ type: 'text', autoComplete: 'off' }}
            />
          </GridItem>
          <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
            <InputField
              label={
                <FormattedMessage {...messages.formVolumeClaimTemplateSize} />
              }
              name={`${f}.size`}
              fullWidth
              inputProps={{
                type: 'text',
                autoComplete: 'off',
                endAdornment: 'Gi',
              }}
            />
          </GridItem>
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
            />
          </GridItem>
          <GridItem
            xs={3}
            sm={3}
            md={3}
            className={classes.formLine}
            style={{ paddingTop: 10 }}
          >
            <IconButton variant="contained" onClick={(evt) => fields.remove(i)}>
              <MinusIcon />
            </IconButton>
          </GridItem>
        </GridContainer>
      ))}
    </Fragment>
  );
};

export default VolumeClaimTemplate;

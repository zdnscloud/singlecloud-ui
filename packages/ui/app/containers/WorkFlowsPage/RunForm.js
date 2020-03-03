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
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';
import SelectField from 'components/Field/SelectField';

import messages from './messages';
import useStyles from './styles';

export const RunForm = ({
  handleSubmit,
  error,
  configMaps,
  formValues,
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
          <GridContainer>
            <GridItem xs={5} sm={5} md={5}>
              <InputField
                label={<FormattedMessage {...messages.dialogFormImageTag} />}
                name="imageTag"
                fullWidth
                inputProps={ { type: 'text', autoComplete: 'off' } }
              />
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </form>
  );
};

export default RunForm;

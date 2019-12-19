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
import SelectField from 'components/Field/SelectField';

import Containers from './form/Containers';
import VolumeClaimTemplate from './form/VolumeClaimTemplate';
import messages from './messages';
import useStyles from './styles';

export const formName = 'TapSearchForm';

const validate = (values) => {
  const errors = {};
  return errors;
};

export const Form = ({
  handleSubmit,
  error,
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
          <GridContainer className={classes.grid}>
            <GridItem xs={4} sm={4} md={4}>
            </GridItem>
            <GridItem xs={4} sm={4} md={4}>
            </GridItem>
          </GridContainer>
          <GridContainer className={classes.grid}>
            <GridItem xs={4} sm={4} md={4}>
            </GridItem>
            <GridItem xs={4} sm={4} md={4}>
            </GridItem>
            <GridItem xs={4} sm={4} md={4}>
              submit / cancel
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </form>
  );
};

const SearchForm = reduxForm({
  form: formName,
  validate,
})(Form);

export default SearchForm;

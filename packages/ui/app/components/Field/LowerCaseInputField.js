import React , { useState }from 'react';
import { Field } from 'redux-form/immutable';
import CustomInput from 'components/CustomInput/CustomInput';

const Input = ({ label, input, meta, inputProps, ...custom }) => (
  <CustomInput
    labelText={label}
    meta={meta}
    formControlProps={{ ...custom }}
    lowercase
    inputProps={{
      ...input,
      ...inputProps,
      value:input.value.toLocaleLowerCase(),
    }}
    {...custom}
  />
);

const LowerCaseInputField = (props) => {
  const { component, ...rest } = props;

  return <Field {...rest} component={Input} />;
};

export default LowerCaseInputField;

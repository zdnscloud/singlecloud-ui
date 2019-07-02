import React from 'react';
import { Field } from 'redux-form/immutable';
import CustomInput from 'components/CustomInput/CustomInput';

const Input = ({ label, input, classes, meta, inputProps, ...custom }) => (
  <CustomInput
    labelText={label}
    meta={meta}
    formControlProps={{ ...custom }}
    inputProps={{
      ...input,
      ...inputProps,
    }}
    {...custom}
  />
);

const InputField = (props) => {
  const { component, ...rest } = props;

  return <Field {...rest} component={Input} />;
};

export default InputField;

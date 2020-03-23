import React from 'react';
import { Field } from 'react-final-form';
// import CustomInput from '../../../../ui/app/components/CustomInput/CustomInput';

const Input = ({ label, input, meta, inputProps, ...custom }) => (
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

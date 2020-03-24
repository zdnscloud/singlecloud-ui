import React from 'react';
import { Field } from 'react-final-form';
import CustomTextarea from '../CustomTextarea/CustomTextarea';

const Input = ({ label, input, meta, inputProps, ...custom }) => (
  <CustomTextarea
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

const TextareaField = (props) => {
  const { component, ...rest } = props;

  return <Field {...rest} component={Input} />;
};

export default TextareaField;

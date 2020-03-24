import React from 'react';
import { Field } from 'react-final-form';
import Checkbox from 'components/CustomCheckbox/CustomCheckbox';

const CheckboxComponent = ({
  label,
  input,
  classes,
  meta,
  inputProps,
  ...custom
}) => (
  <Checkbox
    label={label}
    input={input}
    inputProps={{
      ...input,
      ...inputProps,
    }}
    {...custom}
    meta={meta}
  />
);

const CheckboxField = (props) => {
  const { component, ...rest } = props;

  return <Field {...rest} component={CheckboxComponent} />;
};

export default CheckboxField;

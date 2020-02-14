import React from 'react';
import { Field } from 'redux-form/immutable';
import IOSSwitch from 'components/CustomSwitch/IOSSwitch';

const SwitchComponent = ({
  label,
  input,
  classes,
  meta,
  inputProps,
  ...custom
}) => (
  <IOSSwitch
    label={label}
    meta={meta}
    inputProps={{
      ...input,
      ...inputProps,
    }}
    checked={input.value === true}
    {...input}
    {...custom}
  />
);

const SwitchField = (props) => {
  const { component, ...rest } = props;

  return <Field {...rest} component={SwitchComponent} />;
};

export default SwitchField;

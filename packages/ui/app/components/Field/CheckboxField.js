import React, { Fragment, useState } from 'react';
import { Field } from 'redux-form/immutable';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const CheckboxComponent = ({
  label,
  input,
  classes,
  meta,
  inputProps,
  ...custom
}) => {
  const [checked, setChecked] = useState(input.value);
  const onChange = (event, ...args) => {
    setChecked(!checked);
    input.onChange(checked);
  };

  return (
    <FormControlLabel
      control={<Checkbox onChange={onChange} />}
      value={checked}
      label={label}
      checked={checked}
      {...input}
      {...custom}
    />
  );
};

const CheckboxField = (props) => {
  const { component, ...rest } = props;

  return <Field {...rest} component={CheckboxComponent} />;
};

export default CheckboxField;

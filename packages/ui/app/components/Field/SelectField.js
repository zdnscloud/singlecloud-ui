import _ from 'lodash';
import React from 'react';
import { Field } from 'react-final-form';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const SelectComponent = ({
  label,
  input,
  classes,
  disabled,
  meta: { touched, invalid, error },
  inputProps,
  labelProps,
  formControlProps,
  options,
  fullWidth,
  ...custom
}) => (
  <FormControl
    {...formControlProps}
    error={touched && error}
    disabled={disabled}
    fullWidth={fullWidth}
  >
    <InputLabel htmlFor="" {...labelProps} error={touched && error}>
      {label}
    </InputLabel>
    <Select {...input} {...inputProps} error={touched && error}>
      {options.map((opt, i) => (
        <MenuItem key={i} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
    </Select>
    {touched && error ? <FormHelperText>{error}</FormHelperText> : null}
  </FormControl>
);

SelectComponent.defaultProps = {
  options: [],
};

const SelectField = (props) => {
  const { component, ...rest } = props;
  let { options } = rest;
  if (options && Array.isArray(options)) {
    options = options.map((opt) => ({
      label: _.isString(opt) ? opt : opt.label,
      value: _.isString(opt) ? opt : opt.value,
    }));
  }

  return <Field {...rest} component={SelectComponent} options={options} />;
};

export default SelectField;

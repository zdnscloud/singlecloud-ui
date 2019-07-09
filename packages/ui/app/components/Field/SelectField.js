import _ from 'lodash';
import React from 'react';
import { Field } from 'redux-form/immutable';
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
  meta,
  inputProps,
  labelProps,
  formControlProps,
  options,
  ...custom
}) => (
  <FormControl {...formControlProps} disabled={disabled}>
    <InputLabel htmlFor="" {...labelProps}>
      {label}
    </InputLabel>
    <Select {...input} {...inputProps}>
      {options.map((opt, i) => (
        <MenuItem key={i} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
    </Select>
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

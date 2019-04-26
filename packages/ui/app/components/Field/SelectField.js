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
  meta,
  inputProps,
  labelProps,
  formControlProps,
  options,
  ...custom
}) => {
  return (
    <FormControl {...formControlProps}>
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
};

SelectComponent.defaultProps = {
  options: [],
};

const SelectField = (props) => {
  const { component, ...rest } = props;

  return (
    <Field
      {...rest}
      component={SelectComponent}
    />
  );
};

export default SelectField;

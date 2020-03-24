import React, { Fragment, useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Danger from 'components/Typography/Danger';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';

const CustomCheckbox = ({
  label,
  disabled,
  classes,
  inputProps,
  meta,
  input,
  fullWidth,
  ...custom
}) => {
  const { touched, invalid, error } = meta || {};
  const [checked, setChecked] = useState(input.value);
  const onChange = (event, ...args) => {
    setChecked(!checked);
    input.onChange(checked);
  };
  return (
    <FormControl fullWidth={fullWidth}>
      <FormControlLabel
        control={<Checkbox onChange={onChange} />}
        value={checked}
        label={label}
        checked={checked}
        disabled={disabled}
        {...input}
        {...custom}
        {...inputProps}
      />
      {touched && error && <Danger>{error}</Danger>}
    </FormControl>
  );
};
CustomCheckbox.defaultProps = {
  meta: {},
  inputProps: {},
};

CustomCheckbox.propTypes = {
  classes: PropTypes.object,
  labelText: PropTypes.node,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  meta: PropTypes.object,
};

export default CustomCheckbox;

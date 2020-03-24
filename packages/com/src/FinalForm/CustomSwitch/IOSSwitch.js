import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Switch from '@material-ui/core/Switch';
import Danger from '../Typography/Danger';

const IOSSwitch = ({ ...props }) => {
  const {
    label,
    disabled,
    checked,
    onChange,
    value,
    classes,
    inputProps,
    meta,
    ...custom
  } = props;
  const { touched, invalid, error } = meta || {};

  return (
    <>
      <FormControlLabel
        {...custom}
        disabled={disabled}
        control={
          <Switch
            {...inputProps}
            disabled={disabled}
            disableRipple
            checked={checked}
            onChange={onChange}
            value={value}
          />
        }
        label={label}
      />
      {touched && error && <Danger>{error}</Danger>}
    </>
  );
};

export default IOSSwitch;

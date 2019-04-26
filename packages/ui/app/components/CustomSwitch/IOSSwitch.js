import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Switch from '@material-ui/core/Switch';

import styles from './styles';

const IOSSwitch = ({ ...props }) => {
  const {
    label,
    checked,
    onChange,
    value,
    classes,
    inputProps,
    ...custom
  } = props;

  return (
    <FormControlLabel
      {...custom}
      control={
        <Switch
          {...inputProps}
          classes={{
            switchBase: classes.iOSSwitchBase,
            bar: classes.iOSBar,
            icon: classes.iOSIcon,
            iconChecked: classes.iOSIconChecked,
            checked: classes.iOSChecked,
          }}
          disableRipple
          checked={checked}
          onChange={onChange}
          value={value}
        />
      }
      label={label}
    />
  );
};

export default withStyles(styles)(IOSSwitch);

import React from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';

import customInputStyle from './styles';

function ReadOnlyTextarea({ ...props }) {
  const {
    classes,
    formControlProps,
    id,
    label,
    labelProps,
    inputProps,
    white,
    inputRootCustomClasses,
    value,
    fullWidth,
  } = props;
  const labelClasses = classNames({});
  let formControlClasses;
  if (formControlProps !== undefined) {
    formControlClasses = classNames(
      formControlProps.className,
      classes.formControl
    );
  } else {
    formControlClasses = classes.formControl;
  }
  return (
    <FormControl {...formControlProps} className={formControlClasses} fullWidth>
      <TextField
        label={label}
        id={id}
        margin="normal"
        variant="outlined"
        multiline
        disabled
        value={`${value == null ? '' : value}`}
        {...inputProps}
      />
    </FormControl>
  );
}

ReadOnlyTextarea.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  meta: PropTypes.object,
  inputRootCustomClasses: PropTypes.string,
  success: PropTypes.bool,
  white: PropTypes.bool,
};

export default withStyles(customInputStyle)(ReadOnlyTextarea);

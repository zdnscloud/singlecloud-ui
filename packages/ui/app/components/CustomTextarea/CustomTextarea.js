import React from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';

import customInputStyle from './styles';

function CustomTextarea({ ...props }) {
  const {
    classes,
    formControlProps,
    id,
    labelText,
    labelProps,
    inputProps,
    white,
    inputRootCustomClasses,
    success,
    meta: { touched, invalid, error },
  } = props;

  const touchedError = !!(touched && error);

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
    <FormControl
      {...formControlProps}
      className={formControlClasses}
      error={touchedError}
    >
      <TextField
        label={labelText}
        error={touchedError}
        id={id}
        margin="normal"
        variant="outlined"
        multiline
        {...inputProps}
      />
      {touchedError ? <FormHelperText>{error}</FormHelperText> : null}
    </FormControl>
  );
}

CustomTextarea.defaultProps = {
  meta: {},
  inputProps: {},
};

CustomTextarea.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  meta: PropTypes.object,
  inputRootCustomClasses: PropTypes.string,
  success: PropTypes.bool,
  white: PropTypes.bool,
};

export default withStyles(customInputStyle)(CustomTextarea);

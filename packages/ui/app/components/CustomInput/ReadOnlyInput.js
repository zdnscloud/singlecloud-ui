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

import customInputStyle from './styles';

function ReadOnlyInput({ ...props }) {
  const {
    classes,
    formControlProps,
    id,
    labelText,
    labelProps,
    inputProps,
    white,
    inputRootCustomClasses,
    value,
  } = props;

  const touchedError = false;
  const labelClasses = classNames({});
  const underlineClasses = classNames({
    [classes.underline]: true,
    [classes.whiteUnderline]: white,
  });
  const marginTop = classNames({
    [inputRootCustomClasses]: inputRootCustomClasses !== undefined,
  });
  const inputClasses = classNames({
    [classes.input]: true,
    [classes.whiteInput]: white,
  });
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
    >
      {labelText !== undefined ? (
        <InputLabel
          className={`${classes.labelRoot} ${labelClasses}`}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Input
        classes={{
          input: inputClasses,
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses,
        }}
        id={id}
        value={value}
        disabled
        {...inputProps}
      />
    </FormControl>
  );
}

ReadOnlyInput.propTypes = {
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

export default withStyles(customInputStyle)(ReadOnlyInput);

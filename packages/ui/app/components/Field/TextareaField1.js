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
import { Field } from 'redux-form/immutable';
// import customInputStyle from './styles';

function TextareaField({ ...props }) {
  const {
    classes,
    formControlProps,
    inputProps,
    label,
    input,
    meta: { touched, invalid, error },
  } = props;
  const touchedError = !!(touched && error);

  return (
    <FormControl {...formControlProps} style={{ width: '100%' }}>
      <TextField
        id="outlined-name"
        label={label}
        className={classes.textField}
        value={input.value}
        onChange={input.onChange}
        margin="normal"
        variant="outlined"
        multiline
        {...inputProps}
      />
      {touchedError ? <FormHelperText>{error}</FormHelperText> : null}
    </FormControl>
  );
}

TextareaField.defaultProps = {
  meta: {},
  inputProps: {},
  label: 'label',
};

const InputField = (props) => {
  const { component, ...rest } = props;

  return <Field {...rest} component={TextareaField} />;
};

export default InputField;

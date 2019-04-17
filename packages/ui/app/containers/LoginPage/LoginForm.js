import React from 'react';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form/immutable';
import getByKey from '@gsmlg/utils/getByKey';

import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import People from '@material-ui/icons/People';

import Button from 'components/CustomButtons/Button';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
import CustomInput from 'components/CustomInput/CustomInput';
import Danger from 'components/Typography/Danger';
import UserIcon from 'components/Icons/User';
import PasswordIcon from 'components/Icons/Password';

import loginLogo from 'images/login-logo.png';

const validate = (values) => {
  const errors = {};
  const requiredFields = ['username', 'password'];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const UsernameField = ({
  label,
  input,
  classes,
  meta,
  inputProps,
  ...custom
}) => (
  <CustomInput
    id="login-username"
    labelText={label}
    meta={meta}
    formControlProps={{
      fullWidth: true,
    }}
    inputProps={{
      ...input,
      type: 'text',
      autoComplete: 'username',
      endAdornment: (
        <InputAdornment position="end">
          <UserIcon />
        </InputAdornment>
      ),
      ...inputProps,
    }}
    {...custom}
  />
);

const PasswordField = ({
  label,
  input,
  classes,
  meta,
  inputProps,
  ...custom
}) => (
  <CustomInput
    id="login-password"
    labelText={label}
    meta={meta}
    formControlProps={{
      fullWidth: true,
    }}
    inputProps={{
      ...input,
      type: 'password',
      autoComplete: 'current-password',
      endAdornment: (
        <InputAdornment position="end">
          <PasswordIcon />
        </InputAdornment>
      ),
      ...inputProps,
    }}
    {...custom}
  />
);

const LoginForm = (props) => {
  const { handleSubmit, pristine, reset, submitting, error, classes } = props;

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <CardHeader
        className={classes.cardHeader}
          style={{
            margin: 0,
            padding: 0,
          }}
      >
        <h4
          style={{
            backgroundImage: `url(${loginLogo})`,
            backgroundPosition: 'top center',
            backgroundRepeat: 'no-repeat',
            height: 85,
          }}
        />
      </CardHeader>
      <CardBody>
        <Field
          name="username"
          component={UsernameField}
          label="Username"
          classes={classes}
        />
        <Field
          name="password"
          component={PasswordField}
          label="Password"
          classes={classes}
        />
      </CardBody>
      {error ? (
        <CardBody className={classes.cardHeader}>
          <Danger error={error}>
            {getByKey(error, ['response', 'message'])}
          </Danger>
        </CardBody>
      ) : null}
      <CardFooter className={classes.cardFooter}>
        <Button simple color="primary" size="lg" type="submit">
          Sign In
        </Button>
      </CardFooter>
    </form>
  );
};

const withForm = reduxForm({
  form: 'loginForm', // a unique identifier for this form
  validate,
});

export default compose(withForm)(LoginForm);

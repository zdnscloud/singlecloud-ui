import React from 'react';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';
import getByKey from '@gsmlg/utils/getByKey';
import classNames from 'classnames';

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

import messages from './messages';

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

const UsernameField = ({ label, input, meta, inputProps, cns, ...custom }) => (
  <CustomInput
    id="login-username"
    classes={{ input: cns.input }}
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
          <UserIcon
            className={classNames({
              [cns.inputIconsColor]: true,
              [cns.inputIconsError]: !!(meta.touched && meta.error),
              [cns.inputIconsSuccess]:
                custom.success && !(meta.touched && meta.error),
            })}
          />
        </InputAdornment>
      ),
      ...inputProps,
    }}
    {...custom}
  />
);

const PasswordField = ({ label, input, meta, inputProps, cns, ...custom }) => (
  <CustomInput
    id="login-password"
    classes={{ input: cns.input }}
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
          <PasswordIcon
            className={classNames({
              [cns.inputIconsColor]: true,
              [cns.inputIconsError]: !!(meta.touched && meta.error),
              [cns.inputIconsSuccess]:
                custom.success && !(meta.touched && meta.error),
            })}
          />
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
      <CardHeader className={classes.cardHeader}>
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
          label={<FormattedMessage {...messages.username} />}
          cns={classes}
        />
        <Field
          name="password"
          component={PasswordField}
          label={<FormattedMessage {...messages.password} />}
          cns={classes}
        />
      </CardBody>
      {error ? (
        <CardBody className={classes.cardFooter}>
          <Danger error={error}>
            {getByKey(error, ['response', 'message'])}
          </Danger>
        </CardBody>
      ) : null}
      <CardFooter className={classes.cardFooter}>
        <Button
          simple
          fullWidth
          type="submit"
          size="lg"
          className={classes.submitButton}
        >
          <FormattedMessage {...messages.signIn} />
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

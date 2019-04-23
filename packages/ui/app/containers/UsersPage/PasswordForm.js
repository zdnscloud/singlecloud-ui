import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form/immutable';
import getByKey from '@gsmlg/utils/getByKey';

import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';

import People from '@material-ui/icons/People';

import Button from 'components/CustomButtons/Button';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
import CustomInput from 'components/CustomInput/CustomInput';
import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import AuthField from 'components/Field/AuthField';

class PasswordForm extends PureComponent {
  state = {};

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      error,
      classes,
      isAdmin,
    } = this.props;

    return (
      <form className={getByKey(classes, 'form')} onSubmit={handleSubmit}>
        <GridContainer>
          {!isAdmin || true ? (
            <GridItem xs={12} sm={12} md={12} className={classes.formLine}>
              <InputField
                label="Old Password"
                name="oldPassword"
                formControlProps={{
                  className: classes.passwordControl,
                }}
                inputProps={{ type: 'password', autoComplete: 'off' }}
                classes={classes}
              />
            </GridItem>
          ) : null}
          <GridItem xs={12} sm={12} md={12} className={classes.formLine}>
            <InputField
              label="New Password"
              name="newPassword"
              formControlProps={{
                className: classes.passwordControl,
              }}
              inputProps={{ type: 'password', autoComplete: 'off' }}
              classes={classes}
            />
          </GridItem>
        </GridContainer>
      </form>
    );
  }
}

export default PasswordForm;

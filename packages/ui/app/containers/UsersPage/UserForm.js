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

class UserForm extends PureComponent {
  state = {};

  render() {
    const {
      clusters,
      handleSubmit,
      pristine,
      reset,
      submitting,
      error,
      classes,
      edit,
      profile,
      initialValues,
    } = this.props;
    const isAdmin = initialValues.get('id') === 'admin';

    return (
      <form className={getByKey(classes, 'form')} onSubmit={handleSubmit}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} className={classes.formLine}>
            <InputField
              label="Username"
              name="name"
              formControlProps={{
                className: classes.nameControl,
              }}
              inputProps={{
                type: 'text',
                autoComplete: 'off',
                disabled: edit || profile,
              }}
              classes={classes}
            />
          </GridItem>
          {!(edit || profile) ? (
            <GridItem xs={12} sm={12} md={12} className={classes.formLine}>
              <InputField
                label="Password"
                name="password"
                formControlProps={{
                  className: classes.passwordControl,
                }}
                inputProps={{ type: 'password', autoComplete: 'off' }}
                classes={classes}
              />
            </GridItem>
          ) : null}
          {isAdmin ? null : (
            <GridItem xs={12} sm={12} md={12} className={classes.formAuthLine}>
              <AuthField
                name="projects"
                clusters={clusters}
                readOnly={profile}
              />
            </GridItem>
          )}
        </GridContainer>
      </form>
    );
  }
}

export default UserForm;

import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
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
import TextareaField from 'components/Field/TextareaField';

import messages from './messages';

class UserQuotaForm extends PureComponent {
  state = {};

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      error,
      classes,
      profile,
      initialValues,
    } = this.props;

    return (
      <form className={getByKey(classes, 'form')} onSubmit={handleSubmit}>
        <GridContainer>
          {error ? (
            <GridItem xs={12} sm={12} md={12}>
              <Danger>{getByKey(error, ['response', 'message'])}</Danger>
            </GridItem>
          ) : null}
          <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
            <InputField
              label={<FormattedMessage {...messages.formNamespace} />}
              name="namespace"
              formControlProps={{
                className: classes.nameControl,
              }}
              inputProps={{
                type: 'text',
                autoComplete: 'off',
              }}
              classes={classes}
            />
          </GridItem>
          <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
            <p>username</p>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
            <InputField
              label={<FormattedMessage {...messages.formCPU} />}
              name="cpu"
              formControlProps={{
                className: classes.nameControl,
              }}
              inputProps={{
                type: 'text',
                autoComplete: 'off',
                endAdornment: (
                  <FormattedMessage {...messages.formCPUEndAdornment} />
                ),
              }}
              classes={classes}
            />
          </GridItem>
          <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
            <InputField
              label={<FormattedMessage {...messages.formMemory} />}
              name="memory"
              formControlProps={{
                className: classes.nameControl,
              }}
              inputProps={{
                type: 'text',
                autoComplete: 'off',
                endAdornment: 'Gi',
              }}
              classes={classes}
            />
          </GridItem>
          <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
            <InputField
              label={<FormattedMessage {...messages.formStorage} />}
              name="storage"
              formControlProps={{
                className: classes.nameControl,
              }}
              inputProps={{
                type: 'text',
                autoComplete: 'off',
                endAdornment: 'Gi',
              }}
              classes={classes}
            />
          </GridItem>
        </GridContainer>
        <GridContainer style={{ marginTop: '20px' }}>
          <GridItem xs={9} sm={9} md={9} className={classes.formLine}>
            <TextareaField
              name="purpose"
              label={<FormattedMessage {...messages.formPurpose} />}
              formControlProps={{
                className: classes.nameControl,
              }}
              inputProps={{
                type: 'text',
                autoComplete: 'off',
                rows: '4',
              }}
              classes={classes}
            />
          </GridItem>
        </GridContainer>
      </form>
    );
  }
}

export default UserQuotaForm;

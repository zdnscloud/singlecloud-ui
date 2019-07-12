import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { Field, FieldArray, reduxForm } from 'redux-form/immutable';
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
import SelectField from 'components/Field/SelectField';

import messages from './messages';
import Hosts from './form/Hosts';

class StorageForm extends PureComponent {
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
      blockDevices,
      initialValues,
      formValues,
    } = this.props;

    return (
      <form className={getByKey(classes, 'form')} onSubmit={handleSubmit}>
        <GridContainer>
          {error ? (
            <GridItem xs={12} sm={12} md={12}>
              <Danger>{getByKey(error, ['response', 'message'])}</Danger>
            </GridItem>
          ) : null}
          <GridItem xs={12} sm={12} md={12} className={classes.formLine}>
            <GridContainer>
              <GridItem xs={3} sm={3} md={3}>
                <InputField
                  label={<FormattedMessage {...messages.formName} />}
                  name="name"
                  fullWidth
                  inputProps={{
                    type: 'text',
                    autoComplete: 'off',
                  }}
                />
              </GridItem>
              <GridItem xs={3} sm={3} md={3}>
                <SelectField
                  label={<FormattedMessage {...messages.formStoragetype} />}
                  name="storagetype"
                  fullWidth
                  options={['lvm', 'ceph']}
                />
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} className={classes.formLine}>
            <FieldArray
              name="hosts"
              classes={classes}
              component={Hosts}
              blockDevices={blockDevices}
              values={formValues.get('hosts')}
            />
          </GridItem>
        </GridContainer>
      </form>
    );
  }
}

export default StorageForm;

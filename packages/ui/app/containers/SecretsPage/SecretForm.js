import React, { PureComponent, Fragment, useState } from 'react';
import { compose } from 'redux';
import { fromJS } from 'immutable';
import { Field, FieldArray, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import getByKey from '@gsmlg/utils/getByKey';
import AceEditor from 'react-ace';
import 'brace/theme/tomorrow_night';

import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import AttachmentIcon from '@material-ui/icons/Attachment';
import People from '@material-ui/icons/People';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
import CustomInput from 'components/CustomInput/CustomInput';
import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';

import messages from './messages';

const renderConfigs = ({ fields, meta: { error, submitFailed }, classes }) => (
  <List component="ul" className={classes.dataList}>
    <ListItem>
      <ListItemText primary={<FormattedMessage {...messages.formData} />} />
      <IconButton onClick={(evt) => fields.push(fromJS({}))}>
        <AddIcon />
      </IconButton>
    </ListItem>
    {submitFailed && error && (
      <ListItem>
        <Danger>{error}</Danger>
      </ListItem>
    )}
    {fields.map((f, i) => (
      <ListItem key={i}>
        <ListItemText>
          <InputField
            name={`${f}.key`}
            label={<FormattedMessage {...messages.formDataKey} />}
            className={classes.dataListKey}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <InputField
            name={`${f}.value`}
            label={<FormattedMessage {...messages.formDataValue} />}
            className={classes.dataListValue}
          />
        </ListItemText>
        <IconButton
          variant="contained"
          color="secondary"
          onClick={(evt) => fields.remove(i)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItem>
    ))}
  </List>
);

class SecretForm extends PureComponent {
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
      initialValues,
    } = this.props;

    return (
      <form className={getByKey(classes, 'form')} onSubmit={handleSubmit}>
        <GridContainer>
          <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
            <InputField
              label={<FormattedMessage {...messages.formName} />}
              name="name"
              formControlProps={{
                className: classes.nameControl,
              }}
              inputProps={{ type: 'text', autoComplete: 'off', disabled: edit }}
              fullWidth
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <FieldArray
              name="data"
              component={renderConfigs}
              classes={classes}
            />
          </GridItem>
        </GridContainer>
      </form>
    );
  }
}

export default SecretForm;

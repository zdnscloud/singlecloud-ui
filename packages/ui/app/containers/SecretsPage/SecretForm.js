import React, { PureComponent, Fragment, useState } from 'react';
import { compose } from 'redux';
import { fromJS } from 'immutable';
import { Field, FieldArray, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import getByKey from '@gsmlg/utils/getByKey';
import 'brace/theme/tomorrow_night';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';

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
      secret,
      type,
    } = this.props;

    return (
      <form className={getByKey(classes, 'form')} onSubmit={handleSubmit}>
        <GridContainer>
          <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
            {type === 'create' ? (
              <InputField
                label={<FormattedMessage {...messages.formName} />}
                name="name"
                formControlProps={{
                  className: classes.nameControl,
                }}
                inputProps={{
                  type: 'text',
                  autoComplete: 'off',
                  disabled: edit,
                }}
                fullWidth
              />
            ) : (
              <ReadOnlyInput
                labelText={<FormattedMessage {...messages.formName} />}
                value={secret ? secret.get('name') : ''}
                formControlProps={{
                  className: classes.nameControl,
                }}
                fullWidth
              />
            )}
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

import React, { PureComponent, Fragment, useState } from 'react';
import { compose } from 'redux';
import { Field, FieldArray, reduxForm } from 'redux-form/immutable';
import getByKey from '@gsmlg/utils/getByKey';
import AceEditor from 'react-ace';

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
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import AttachmentIcon from '@material-ui/icons/Attachment';
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

const renderData = ({ meta, input }) => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Button variant="contained" size="sm" onClick={() => setOpen(true)}>
        <AttachmentIcon />
        File Content
      </Button>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <AceEditor
          focus
          mode="yaml"
          theme="github"
          value={input.value}
          onChange={(val, evt) => {
            input.onChange(val);
          }}
        />
      </Dialog>
    </Fragment>
  );
};

const renderConfigs = ({ fields, meta: { error, submitFailed } }) => (
  <List component="ul">
    <ListItem>
      <ListItemText primary="Files" />
      <IconButton onClick={(evt) => fields.push({})}>
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
          <InputField name={`${f}.name`} label="File Name" />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Field name={`${f}.data`} component={renderData} />
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

class ConfigMapForm extends PureComponent {
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
          <GridItem xs={12} sm={12} md={12} className={classes.formLine}>
            <InputField
              label="Name"
              name="name"
              formControlProps={{
                className: classes.nameControl,
              }}
              inputProps={{ type: 'text', autoComplete: 'off', disabled: edit }}
              classes={classes}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <FieldArray name="configs" component={renderConfigs} />
          </GridItem>
        </GridContainer>
      </form>
    );
  }
}

export default ConfigMapForm;

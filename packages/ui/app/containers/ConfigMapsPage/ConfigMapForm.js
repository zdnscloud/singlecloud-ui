import React, { PureComponent, Fragment, useState } from 'react';
import { compose } from 'redux';
import { fromJS } from 'immutable';
import { Field, FieldArray, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import getByKey from '@gsmlg/utils/getByKey';
import AceEditor from 'react-ace';
import 'brace/theme/tomorrow_night';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
import CustomInput from 'components/CustomInput/CustomInput';
import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';

import messages from './messages';

const renderData = ({ meta, input, classes }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.fileContentButton}>
      <Button color="secondary" onClick={() => setOpen(true)}>
        <FormattedMessage {...messages.formFileContent} />
      </Button>
      <Dialog
        maxWidth="lg"
        fullWidth
        disableBackdropClick
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        PaperProps={{ style: { overflow: 'hidden' } }}
      >
        <Card className={classes.dialogCard}>
          <CardHeader color="secondary" className={classes.dialogHeader}>
            <h4 className={classes.cardTitleWhite}>
              <FormattedMessage {...messages.formEditFile} />
            </h4>
          </CardHeader>
          <CardBody>
            <AceEditor
              focus
              mode="yaml"
              theme="tomorrow_night"
              value={input.value}
              height="calc(100vh - 225px)"
              width="calc(100vw - 200px)"
              onChange={(val, evt) => {
                input.onChange(val);
              }}
            />
          </CardBody>
          <CardFooter>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setOpen(false);
              }}
            >
              <FormattedMessage {...messages.formSetFile} />
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </div>
  );
};

const renderConfigs = ({ fields, meta: { error, submitFailed }, classes }) => (
  <List component="ul" className={classes.filesList}>
    <ListItem>
      <ListItemText primary={<FormattedMessage {...messages.formFiles} />} />
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
            name={`${f}.name`}
            label={<FormattedMessage {...messages.formFileName} />}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Field name={`${f}.data`} component={renderData} classes={classes} />
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
      type,
      configMap,
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
                value={configMap ? initialValues.get('name') : ''}
                formControlProps={{
                  className: classes.nameControl,
                }}
                fullWidth
              />
            )}
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <FieldArray
              name="configs"
              component={renderConfigs}
              classes={classes}
            />
          </GridItem>
        </GridContainer>
      </form>
    );
  }
}

export default ConfigMapForm;

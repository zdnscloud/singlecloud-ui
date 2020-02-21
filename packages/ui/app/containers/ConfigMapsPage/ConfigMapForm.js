import React, { PureComponent, Fragment, useState } from 'react';
import { compose } from 'redux';
import { fromJS } from 'immutable';
import { Field, FieldArray, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import getByKey from '@gsmlg/utils/getByKey';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/theme-tomorrow_night';

import ListItem from '@material-ui/core/ListItem';
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
import MinusIcon from 'components/Icons/Minus';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';

import messages from './messages';

const DataComponent = ({ meta, input, classes }) => {
  const [open, setOpen] = useState(false);
  const { touched, invalid, error } = meta;

  return (
    <div className={classes.fileContentButton}>
      <Button color="secondary"  onClick={() => setOpen(true)} className={classes.fileNameLink}>
        <FormattedMessage {...messages.formFileContent} />
      </Button>
      {touched && error && <Danger>{error}</Danger>}
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
          <CardHeader color="light" className={classes.dialogHeader}>
            <h4>
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
              color="primary"
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
  <Fragment>
    <GridContainer>
      <GridItem xs={3} sm={3} md={3} className={classes.addNodeBtnWrap}>
        <Button
          className={classes.addNodeBtn}
          variant="contained" color="primary"
          onClick={(evt) => fields.push(fromJS({}))}
        >
          <span className={classes.plusIcon}>+</span>
          <FormattedMessage {...messages.formFiles} />
        </Button>
      </GridItem>
    </GridContainer>
    {submitFailed && error && (
      <ListItem>
        <Danger>{error}</Danger>
      </ListItem>
    )}
    <Card className={classes.nodeList} border={fields&&fields.length>0 ? 'border':null } >
      <CardBody>
        {fields.map((f, i) => (
          <GridContainer key={i}>
            <GridItem xs={4} sm={4} md={4}>
              <InputField
                name={`${f}.name`}
                label={<FormattedMessage {...messages.formFileName} />}
                fullWidth
              />
            </GridItem>
            <GridItem xs={2} sm={2} md={2}>
              <Field
                name={`${f}.data`}
                component={DataComponent}
                classes={classes}
              />
            </GridItem>
            <GridItem xs={3} sm={3} md={3}>
              <IconButton
                variant="contained"
                onClick={(evt) => fields.remove(i)}
                className={classes.minusIcon}
              >
                <MinusIcon />
              </IconButton>
            </GridItem>
          </GridContainer>
        ))}
      </CardBody>
    </Card>
  </Fragment>
);

const ConfigMapForm = ({
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
}) => (
  <form className={getByKey(classes, 'form')} onSubmit={handleSubmit}>
    <GridContainer>
      {error ? (
        <GridItem xs={12} sm={12} md={12}>
          <Danger>{getByKey(error, ['response', 'message'])}</Danger>
        </GridItem>
      ) : null}
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

export default ConfigMapForm;

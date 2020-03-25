import React from 'react';
import { Form, Field } from 'react-final-form';

import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import InputField from './Field/InputField';
import TextareaField from './Field/TextareaField';
import SwitchField from './Field/SwitchField';
import CheckboxesField from './Field/CheckboxesField';
import RadioField from './Field/RadioField';
import SelectField from './Field/SelectField';

import ReadOnlyInput from './CustomInput/ReadOnlyInput';
import ReadOnlyTextarea from './CustomTextarea/ReadOnlyTextarea';


const useStyles = makeStyles((theme) => ({
  root: {
    height: 'calc(100vh - 100px)',
    backgroundColor:'#fafafa',
    padding:20,
  },
  paper:{
    padding:20,
    marginBottom:20,
  },
  chexboxesControl: {
    flexDirection: 'row',
  },
  chexboxesLabel: {
    flexDirection: 'row',
    lineHeight: 3,
  },
  chexboxesGroup: {
    flexDirection: 'row!important',
    marginLeft: '0.5rem',
    marginTop: 10,
  },
  radioControl: {
    flexDirection: 'row',
    marginTop: '10px',
  },
  radioLabel: {
    flexDirection: 'row',
    lineHeight: 3.5,
  },
  radioGroup: {
    flexDirection: 'inherit !important',
    marginLeft: '1.5rem',
  },
}));

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

const validate = (values) => {
  const errors = {};
  const requiredFields = [
    'inputText',
    'textarea',
  ];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const FiledCollection =(props, ref) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Paper  className={classes.paper}>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <h3>type: text</h3>
                  <InputField
                    label="formInputText"
                    name="inputText"
                    fullWidth
                    inputProps={{ type: 'text', autoComplete: 'off' }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <h3>type: number</h3>
                  <InputField
                    label="formInputNumber"
                    name="inputNumber"
                    normalize={(val) => (val ? Number(val) : val)}
                    fullWidth
                    inputProps={{
                      type: 'number',
                      autoComplete: 'off',
                      min: 1,
                      max: 255,
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <h3>inputProps: endAdornment</h3>
                  <InputField
                    label="formInputEndAdornment"
                    name="inputEndAdornment"
                    fullWidth
                    inputProps={{
                      type: 'text',
                      autoComplete: 'off',
                      endAdornment: 'Gi',
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <h3>ReadOnlyInput</h3>
                  <ReadOnlyInput
                    label="formReadOnlyInput"
                    fullWidth
                    value="readOnlyInput"
                  />
                </Grid>
              </Grid>
            </Paper>
          
            <Paper  className={classes.paper}>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <h3>Textarea</h3>
                    <TextareaField
                    name="textarea"
                    label="formTextarea"
                    formControlProps={{
                      className: classes.textareaControl,
                    }}
                    inputProps={{
                      type: 'text',
                      autoComplete: 'off',
                      rows: '4',
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <h3>ReadOnlyInput</h3>
                  <ReadOnlyTextarea
                      name="textarea"
                      label="formTextarea"
                      formControlProps={{
                        className: classes.textareaControl,
                      }}
                      inputProps={{
                        type: 'text',
                        autoComplete: 'off',
                        rows: '4',
                      }}
                      value="textarea"
                    />
                </Grid>
              </Grid>
            </Paper>

            <Paper  className={classes.paper}>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <h3>SwitchField</h3>
                  <SwitchField
                    name="switch"
                    label="formSwitch"
                    type="checkbox"
                  />
                </Grid>
              </Grid>
            </Paper>

            <Paper  className={classes.paper}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <h3>CheckboxesField</h3>
                  <CheckboxesField
                  name='checkboxes'
                  label=""
                  classes={{
                    formControl: classes.chexboxesControl,
                    formLabel: classes.chexboxesLabel,
                    group: classes.chexboxesGroup,
                  }}
                  options={[
                    {
                      label: "controlplane",
                      value: 'controlplane',
                    },
                    {
                      label: 'etcd',
                      value: 'etcd',
                    },
                    {
                      label: 'worker',
                      value: 'worker',
                    },
                  ]}
                  formControlComponent="div"
                  formLabelComponent="div"
                />
                </Grid>
              </Grid>
            </Paper>

            <Paper  className={classes.paper}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <h3>RadioField</h3>
                  <RadioField
                    name="radio"
                    label='formRadio'
                    type="radio"
                    classes={{
                      formControl: classes.radioControl,
                      formLabel: classes.radioLabel,
                      group: classes.radioGroup,
                    }}
                    options={[
                      { label: 'flannel', value: 'flannel' },
                      { label: 'calico', value: 'calico' },
                    ]}
                    formControlComponent="div"
                    formLabelComponent="div"
                  />
                </Grid>
              </Grid>
            </Paper>

            <Paper  className={classes.paper}>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <h3>SelectField</h3>
                  <SelectField
                    label="formSelect"
                    name="Select"
                    options={[
                      {
                        label: 'OnFailure',
                        value: 'OnFailure',
                      },
                      {
                        label: 'Never',
                        value: 'Never',
                      },
                    ]}
                    formControlProps={{
                      style: {
                        width: '100%',
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </form>
        )}
      />
    </div>
  );
};

export default FiledCollection;

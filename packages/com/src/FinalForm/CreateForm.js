import React from 'react';
import { Form, Field, FormSpy } from 'react-final-form';

import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'


import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import InputField from './Field/InputField';
import TextareaField from './Field/TextareaField';
import FileReaderField from './Field/FileReaderField';
import SwitchField from './Field/SwitchField';
import CheckboxesField from './Field/CheckboxesField';
import RadioField from './Field/RadioField';
import SelectField from './Field/SelectField';

import ReadOnlyInput from './CustomInput/ReadOnlyInput';
import ReadOnlyTextarea from './CustomTextarea/ReadOnlyTextarea';

const useStyles = makeStyles((theme) => ({
  root: {
    padding:20,
  },
  paper:{
    padding:20,
    marginBottom:20,
  },
  errors:{
    color:'red',
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
}));

const validate = (values) => {
  const errors = {};
  const requiredFields = [
    'clusterName',
  ];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

export const CreateForm = ({formRef ,onSubmit}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Form
        onSubmit={(values) => onSubmit(values)}
        validate={validate}
        initialValues={{ sshUser: "admin" }}  
        mutators={{
          ...arrayMutators
        }}
      >
        {({ handleSubmit, values, submitError , form: {
          mutators: { push, pop }
        },}) => {
          console.log('values',values);
          return (
            <form 
              onSubmit={handleSubmit}
              ref={formRef}
            >
            <Paper  className={classes.paper}>
              {submitError ? (
                  <Grid container spacing={3}>
                      <h4 className={classes.errors}>{submitError}</h4>
                  </Grid>
              ) : null}  
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <InputField
                    label="formClusterName"
                    name="clusterName"
                    fullWidth
                    inputProps={{ type: 'text', autoComplete: 'off' }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <InputField
                    label="sshUser"
                    name="sshUser"
                    fullWidth
                    inputProps={{ type: 'text', autoComplete: 'off' }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FileReaderField
                    label="sshKey"
                    name="sshKey"
                    classes={classes}
                    buttonProps={{
                      color: 'info',
                      simple: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SwitchField
                    name="enableAdvancedOptions"
                    label='formAdvancedOptions'
                    type="checkbox"
                  />
                </Grid>
              </Grid>
              {values && values.enableAdvancedOptions ? ( 
              <FormSpy 
                subscription={{ values: true }}
              >
                  {({ values }) => (
                  <Grid container spacing={3}>
                      <Grid item xs={3}>
                        <InputField
                          label="formPort"
                          name="port"
                          fullWidth
                          normalize={(val) => (val ? Number(val) : val)}
                          inputProps={{  
                            type: 'number',
                            autoComplete: 'off',
                            min: 1,
                            max: 255,
                          }}
                        />
                      </Grid>
                      <Grid item xs={9}>
                        <RadioField
                          name="radio"
                          label='type'
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
                  )}
                </FormSpy>): null}
                <Grid container spacing={3}>
                   <Grid item xs={12}>
                    <button
                      type="button"
                      onClick={() => push('node', undefined)}
                    >
                      Add Node
                    </button>
                   </Grid>
                   <Grid item xs={12}>
                      <FieldArray name="node">
                        {({ fields }) =>
                          fields.map((name, index) => (
                            <Grid container spacing={3} key={index}>
                              <Grid item xs={2}>
                                <CheckboxesField
                                  name={`${name}.roles`}
                                  label=""
                                  classes={{
                                    formControl: classes.chexboxesControl,
                                    formLabel: classes.chexboxesLabel,
                                    group: classes.chexboxesGroup,
                                  }}
                                  options={[
                                    {
                                      label: 'worker',
                                      value: 'worker',
                                    },
                                  ]}
                                  formControlComponent="div"
                                  formLabelComponent="div"
                                />
                              </Grid>
                              <Grid item xs={3}>
                                <InputField
                                  label="formIP"
                                  name={`${name}.ip`}
                                  fullWidth
                                  inputProps={{ type: 'text', autoComplete: 'off' }}
                                />
                              </Grid>
                              <Grid item xs={3}>
                                <div
                                  onClick={() => fields.remove(index)}
                                  style={{ cursor: 'pointer',paddingTop: 20 }}
                                >
                                  ❌
                                </div>
                              </Grid>
                             
                            </Grid>
                          ))
                        }
                      </FieldArray>
                   </Grid>
               </Grid>
            </Paper>
            <button type="submit">Submit</button>
          </form>
          )
        }}
      </Form>
    </div>
  );
};

export default CreateForm;

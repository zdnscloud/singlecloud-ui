import React from 'react';
import { Form, Field } from 'react-final-form';

import { makeStyles } from '@material-ui/styles';

// import InputField from './Field/InputField';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'calc(100vh - 100px)',
    padding:20,
  },
}));

const onSubmit = async values => {
  console.log('q1');
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

const validate = (values) => {
  const errors = {};
  const requiredFields = [
    'name',
  ];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const CreateForm =(props, ref) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
  <Form
    onSubmit={onSubmit}
    validate={validate}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <h2>Simple Default Input</h2>
        <div>
          <label>First Name</label>
          <Field name="firstName" component="input" placeholder="First Name" />
        </div>

        <h2>Render Function</h2>
        <Field
          name="name"
          render={({ input, meta }) => (
            <div>
              <label>name</label>
              <textarea {...input} />
              {meta.touched && meta.error && <span>{meta.error}</span>}
            </div>
          )}
        />

        <h2>Render Function as Children</h2>
        <Field name="phone">
          {({ input, meta }) => (
            <div>
              <label>Phone</label>
              <input type="text" {...input} placeholder="Phone" />
              {meta.touched && meta.error && <span>{meta.error}</span>}
            </div>
          )}
        </Field>

        <button type="submit">Submit</button>
      </form>
    )}
  />
    </div>
  );
};

export default CreateForm;

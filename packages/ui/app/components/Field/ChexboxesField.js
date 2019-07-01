import _ from 'lodash';
import React, { Fragment } from 'react';
import { Field } from 'redux-form/immutable';
import { Map, List } from 'immutable';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';

const renderChexboxesGroup = ({
  label,
  input,
  meta,
  classes,
  options,
  formControlProps,
  formControlComponent,
  formLabelProps,
  formLabelComponent,
  ...custom
}) => {
  const onChange = (...args) => {
    input.onChange(...args);
  };
  return (
    <FormControl
      component={formControlComponent}
      className={classes.formControl}
      {...formControlProps}
    >
      <FormLabel
        component={formLabelComponent}
        className={classes.formLabel}
        {...formLabelProps}
      >
        {label}
      </FormLabel>
      <FormGroup
        aria-label={label}
        className={classes.group}
        value={input.value}
        onChange={onChange}
      >
        {options.map((opt, i) => (
          <FormControlLabel
            key={i}
            control={<Checkbox color="primary" />}
            label={opt.label}
            value={opt.value}
            style ={{ marginRight:"40px"}}
            {...opt}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

renderChexboxesGroup.defaultProps = {
  classes: {},
  options: [],
  formControlProps: {},
  formControlComponent: 'fieldset',
  formLabelProps: {},
  formLabelComponent: 'legend',
};

const ChexboxesField = (props) => {
  const { component, ...rest } = props;

  return <Field {...rest} component={renderChexboxesGroup} />;
};

export default ChexboxesField;

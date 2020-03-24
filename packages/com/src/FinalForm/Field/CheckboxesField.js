import _ from 'lodash';
import React, { Fragment } from 'react';
import { Field } from 'react-final-form';
import { Map, List } from 'immutable';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';

const renderCheckboxesGroup = ({
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
  const onChange = (event, ...args) => {
    let val = input.value || [];
    const { checked, value } = event.target;
    if (checked) {
       val.push(value);
    } else {
      val = val.filter((v) => v !== value);
    }
    input.onChange(val);
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
      <FormGroup aria-label={label} className={classes.group}>
        {options.map((opt, i) => (
          <FormControlLabel
            key={i}
            control={<Checkbox onChange={onChange} />}
            label={opt.label}
            value={opt.value}
            style={{ marginRight: '40px' }}
            {...opt}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

renderCheckboxesGroup.defaultProps = {
  classes: {},
  options: [],
  formControlProps: {},
  formControlComponent: 'fieldset',
  formLabelProps: {},
  formLabelComponent: 'legend',
};

const CheckboxesField = (props) => {
  const { component, ...rest } = props;
  let { options } = rest;
  if (options && Array.isArray(options)) {
    options = options.map((opt) => ({
      label: _.isString(opt) ? opt : opt.label,
      value: _.isString(opt) ? opt : opt.value,
    }));
  }

  return (
    <Field {...rest} component={renderCheckboxesGroup} options={options} />
  );
};

export default CheckboxesField;

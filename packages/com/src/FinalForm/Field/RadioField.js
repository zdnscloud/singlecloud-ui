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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

const renderRadioGroup = ({
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
      <RadioGroup
        aria-label={label}
        className={classes.group}
        value={input.value}
        onChange={onChange}
      >
        {options.map((opt, i) => (
          <FormControlLabel
            key={i}
            control={<Radio />}
            label={opt.label}
            value={opt.value}
            {...opt}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

renderRadioGroup.defaultProps = {
  classes: {},
  options: [],
  formControlProps: {},
  formControlComponent: 'fieldset',
  formLabelProps: {},
  formLabelComponent: 'legend',
};

const RadioField = (props) => {
  const { component, ...rest } = props;

  return <Field {...rest} component={renderRadioGroup} />;
};

export default RadioField;

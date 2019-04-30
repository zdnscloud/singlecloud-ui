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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

const renderRadioGroup = ({
  label,
  input,
  meta,
  classes,
  options,
  ...custom
}) => {
  const onChange = (...args) => {
    input.onChange(...args);
  };
  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel component="legend" className={classes.formLabel}>
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
};

const RadioField = (props) => {
  const { component, ...rest } = props;

  return <Field {...rest} component={renderRadioGroup} />;
};

export default RadioField;

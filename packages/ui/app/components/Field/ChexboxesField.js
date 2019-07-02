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
  let rolesArr = [];
  const onChange = (event, ...args) => {
    if (input.value) {
      const arr = input.value.filter((n) => n !== undefined);
      rolesArr = rolesArr.concat(arr);
    }
    event.persist();
    if (event.target.checked) {
      rolesArr.push(event.target.value);
    } else {
      rolesArr = rolesArr.filter((n) => n !== event.target.value);
    }
    input.onChange(rolesArr);
    // console.log("onChange",rolesArr)
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
          // <FormControlLabel
          //   key={i}
          //   control={<Checkbox onChange={(evt) => {
          //     input.onChange(evt.target.value);
          //   }} color="primary" />}
          //   label={opt.label}
          //   value={opt.value}
          //   style ={{ marginRight:"40px"}}
          //   {...opt}
          // />
          <FormControlLabel
            key={i}
            control={<Checkbox onChange={onChange} color="primary" />}
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

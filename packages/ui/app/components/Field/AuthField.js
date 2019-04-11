import React, { Fragment } from 'react';
import { Field, FieldArray } from 'redux-form/immutable';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Button from 'components/CustomButtons/Button';

const renderClusters = ({
  label,
  input,
  classes,
  meta,
  inputProps,
  fields,
  clusters,
  ...custom
}) => (
  <Fragment>
    {clusters.toList().map((c) => {
      const name = c.get('name');
      return (
        <Fragment>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={false}
                  onChange={(e) => {}}
                  value={`${name}._all`}
                />
              }
              label={`${name} all`}
            />
            <Button>show namespaces</Button>
          </FormGroup>
        </Fragment>
      );
    })}
  </Fragment>
);

const AuthField = (props) => {
  const { component, clusters, ...rest } = props;

  return (
    <FieldArray
      {...rest}
      clusters={clusters}
      component={renderClusters}
    />
  );
};

export default InputField;

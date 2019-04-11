import _ from 'lodash';
import React, { Fragment } from 'react';
import { Field } from 'redux-form/immutable';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Button from 'components/CustomButtons/Button';

const CustomCheckbox = ({
  label,
  cluster,
  namespace,
  onChange,
  onBlur,
  ...rest
}) => {
  const value = rest.value || [];
  const iv = { cluster, namespace };
  const idx = _.findIndex(value, (v) => _.isEqual(v, iv));

  return (
    <FormControlLabel
      control={
        <Checkbox
          {...rest}
          checked={idx >= 0}
          onChange={(evt) => {
            const { checked } = evt.target;
            const newValue = value.slice();
            const i = _.findIndex(newValue, (v) => _.isEqual(v, iv));
            if (checked && i < 0) {
              newValue.push(iv);
            }
            if (!checked && i >= 0) {
              newValue.splice(i, 1);
            }

            onBlur(newValue);
            onChange(newValue);
          }}
        />
      }
      label={label}
    />      
  );
}

const renderClusters = ({
  label,
  input,
  meta,
  clusters,
  ...custom
}) => {
  let j = 0;
  return (
    <Fragment>
      {clusters.toList().map((c) => {
        const name = c.get('name');
        const ns = c.get('namespaces');
        const i = j;
        const { value, ...ipt } = input;
        j += 1;
        return (
          <Fragment key={i}>
            <FormGroup row>
              <CustomCheckbox
                {...ipt}
                label={`${name} all`}
                value={value}
                cluster={name}
                namespace="_all"
              />
            </FormGroup>
            {ns.size > 0 ? (
              <FormGroup row>
                {ns.toList().map((n) => {
                  const nname = n.get('name');
                  const ii = j;
                  j += 1;
                  return (
                    <CustomCheckbox
                      key={ii}
                      {...ipt}
                      label={`${name} ${n.get('name')}`}
                      value={value}
                      cluster={name}
                      namespace={nname}
                    />
                  );
                })}
              </FormGroup>
            ) : null}
          </Fragment>
        );
      })}
    </Fragment>
  )
};

const AuthField = (props) => {
  const { component, ...rest } = props;

  return <Field {...rest} component={renderClusters} />;
};

export default AuthField;
